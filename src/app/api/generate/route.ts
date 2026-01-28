import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { image, style } = await request.json();
    
    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    // Extract base64 data from data URL if present
    const base64Data = image.includes("base64,") 
      ? image.split("base64,")[1] 
      : image;

    const stylePrompts: Record<string, string> = {
      corporate: "Transform this photo into a high-quality professional corporate headshot. Requirements: Clean neutral gray or soft blue gradient background, professional studio lighting with soft shadows, sharp focus on the face, business-appropriate appearance. The result should look like it was taken by a professional photographer for a Fortune 500 company executive page. Maintain the person's likeness exactly.",
      creative: "Transform this photo into a creative professional headshot suitable for tech startups and creative agencies. Requirements: Subtle artistic background with modern colors, creative but professional lighting, approachable and innovative feel. Keep the person's face and features exactly the same while enhancing the overall professional quality.",
      linkedin: "Transform this photo into the perfect LinkedIn profile photo. Requirements: Clean professional background, friendly and approachable expression enhanced through lighting, well-lit face with soft professional lighting, business casual feel. The photo should look great as a circular profile picture and convey trustworthiness and competence. Maintain exact likeness.",
      executive: "Transform this photo into a premium executive headshot suitable for C-suite profiles and board presentations. Requirements: Sophisticated dark or elegant gradient background, powerful and confident presence through professional studio lighting, luxury magazine quality. The result should convey authority and success while maintaining the person's exact appearance.",
    };

    const prompt = stylePrompts[style] || stylePrompts.corporate;

    // Use Gemini 3 Pro Image for best quality
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [
              {
                inlineData: {
                  mimeType: "image/jpeg",
                  data: base64Data,
                },
              },
              {
                text: prompt,
              },
            ],
          }],
          generationConfig: {
            responseModalities: ["image", "text"],
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Gemini API error:", error);
      return NextResponse.json({ error: "Failed to generate image" }, { status: 500 });
    }

    const data = await response.json();
    
    // Extract the generated image
    const generatedImage = data.candidates?.[0]?.content?.parts?.find(
      (part: { inlineData?: { data: string } }) => part.inlineData
    )?.inlineData?.data;

    if (!generatedImage) {
      console.error("No image in response:", JSON.stringify(data, null, 2));
      return NextResponse.json({ error: "No image generated" }, { status: 500 });
    }

    return NextResponse.json({ 
      image: `data:image/png;base64,${generatedImage}`,
      success: true 
    });

  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
