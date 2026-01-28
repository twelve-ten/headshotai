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
      corporate: "Transform this photo into a professional corporate headshot. Clean neutral background (light gray or soft blue gradient), professional studio lighting, sharp focus on face, business-appropriate appearance. Make it look like it was taken by a professional photographer for a Fortune 500 company website.",
      creative: "Transform this photo into a creative professional headshot. Subtle artistic background with soft colors, creative but professional lighting, approachable and modern feel. Perfect for tech startups, creative agencies, or personal branding.",
      linkedin: "Transform this photo into the perfect LinkedIn profile photo. Clean professional background, friendly and approachable expression, well-lit face, business casual feel. Optimized to look great as a circular profile picture.",
      executive: "Transform this photo into an executive headshot. Premium studio quality, sophisticated dark or gradient background, powerful confident presence, luxury magazine style lighting. Suitable for C-suite profiles and board presentations.",
    };

    const prompt = stylePrompts[style] || stylePrompts.corporate;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=${apiKey}`,
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
