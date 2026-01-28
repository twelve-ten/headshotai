import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { deductCredit, recordGeneration } from "@/lib/credits";

// Style prompts for different headshot types
const stylePrompts: Record<string, string> = {
  corporate:
    "Transform this photo into a high-quality professional corporate headshot. Requirements: Clean neutral gray or soft blue gradient background, professional studio lighting with soft shadows, sharp focus on the face, business-appropriate appearance. The result should look like it was taken by a professional photographer for a Fortune 500 company executive page. Maintain the person's likeness exactly.",
  creative:
    "Transform this photo into a creative professional headshot suitable for tech startups and creative agencies. Requirements: Subtle artistic background with modern colors, creative but professional lighting, approachable and innovative feel. Keep the person's face and features exactly the same while enhancing the overall professional quality.",
  linkedin:
    "Transform this photo into the perfect LinkedIn profile photo. Requirements: Clean professional background, friendly and approachable expression enhanced through lighting, well-lit face with soft professional lighting, business casual feel. The photo should look great as a circular profile picture and convey trustworthiness and competence. Maintain exact likeness.",
  executive:
    "Transform this photo into a premium executive headshot suitable for C-suite profiles and board presentations. Requirements: Sophisticated dark or elegant gradient background, powerful and confident presence through professional studio lighting, luxury magazine quality. The result should convey authority and success while maintaining the person's exact appearance.",
};

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required", code: "UNAUTHORIZED" },
        { status: 401 }
      );
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { image, style } = body;

    // Validate required fields
    if (!image) {
      return NextResponse.json(
        { error: "No image provided" },
        { status: 400 }
      );
    }

    if (typeof image !== "string") {
      return NextResponse.json(
        { error: "Invalid image format" },
        { status: 400 }
      );
    }

    // Check image size (rough estimate from base64)
    const imageSizeEstimate = (image.length * 3) / 4;
    if (imageSizeEstimate > 15 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image too large. Please use an image under 10MB." },
        { status: 400 }
      );
    }

    // Check and deduct credits BEFORE calling the API
    const creditResult = await deductCredit(session.user.id);
    if (!creditResult.success) {
      return NextResponse.json(
        {
          error: "No credits remaining",
          code: "NO_CREDITS",
          remainingCredits: 0,
        },
        { status: 402 }
      );
    }

    // Validate API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY not configured");
      return NextResponse.json(
        { error: "Service temporarily unavailable" },
        { status: 503 }
      );
    }

    // Extract base64 data from data URL if present
    let base64Data: string;
    let mimeType = "image/jpeg";

    if (image.includes("base64,")) {
      const parts = image.split("base64,");
      base64Data = parts[1];

      // Extract mime type from data URL
      const mimeMatch = parts[0].match(/data:([^;]+)/);
      if (mimeMatch) {
        mimeType = mimeMatch[1];
      }
    } else {
      base64Data = image;
    }

    // Validate base64 data
    if (!base64Data || base64Data.length === 0) {
      return NextResponse.json(
        { error: "Invalid image data" },
        { status: 400 }
      );
    }

    // Get the appropriate prompt
    const prompt = stylePrompts[style] || stylePrompts.corporate;

    // Call Gemini API with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 55000); // 55s timeout

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    inlineData: {
                      mimeType,
                      data: base64Data,
                    },
                  },
                  {
                    text: prompt,
                  },
                ],
              },
            ],
            generationConfig: {
              responseModalities: ["image", "text"],
            },
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Gemini API error:", response.status, errorText);

        // Note: Credit already deducted - in production consider refunding on API failures

        // Handle specific error codes
        if (response.status === 429) {
          return NextResponse.json(
            { error: "Too many requests. Please wait a moment and try again." },
            { status: 429 }
          );
        }
        if (response.status === 400) {
          return NextResponse.json(
            { error: "Invalid image. Please try a different photo." },
            { status: 400 }
          );
        }

        return NextResponse.json(
          { error: "Failed to generate image. Please try again." },
          { status: 500 }
        );
      }

      const data = await response.json();

      // Extract the generated image from response
      const generatedImage = data.candidates?.[0]?.content?.parts?.find(
        (part: { inlineData?: { data: string } }) => part.inlineData
      )?.inlineData?.data;

      if (!generatedImage) {
        // Check if there's a text response explaining the issue
        const textResponse = data.candidates?.[0]?.content?.parts?.find(
          (part: { text?: string }) => part.text
        )?.text;

        console.error(
          "No image in response:",
          textResponse || JSON.stringify(data, null, 2)
        );

        // Check for safety blocks
        if (data.candidates?.[0]?.finishReason === "SAFETY") {
          return NextResponse.json(
            { error: "Unable to process this image. Please try a different photo." },
            { status: 400 }
          );
        }

        return NextResponse.json(
          { error: "No image generated. Please try again." },
          { status: 500 }
        );
      }

      // Record successful generation
      await recordGeneration(session.user.id, style || "corporate");

      return NextResponse.json({
        image: `data:image/png;base64,${generatedImage}`,
        success: true,
        remainingCredits: creditResult.remainingCredits,
      });
    } catch (fetchError) {
      clearTimeout(timeoutId);

      if (fetchError instanceof Error && fetchError.name === "AbortError") {
        return NextResponse.json(
          { error: "Request timed out. Please try again with a smaller image." },
          { status: 504 }
        );
      }

      throw fetchError;
    }
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}
