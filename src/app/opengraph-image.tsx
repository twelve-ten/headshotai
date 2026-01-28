import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "HeadshotAI - Professional Headshots in 2 Minutes";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#08080a",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(251, 146, 60, 0.15), transparent 50%)",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          <span
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "white",
              letterSpacing: "-0.02em",
            }}
          >
            Headshot
          </span>
          <span
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#fb923c",
              letterSpacing: "-0.02em",
            }}
          >
            AI
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 36,
            color: "rgba(255, 255, 255, 0.7)",
            textAlign: "center",
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          Professional Headshots in 2 Minutes
        </div>

        {/* Features */}
        <div
          style={{
            display: "flex",
            gap: 40,
            marginTop: 50,
          }}
        >
          {["No Photographer", "Studio Quality", "From Any Selfie"].map(
            (feature) => (
              <div
                key={feature}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: "rgba(255, 255, 255, 0.5)",
                  fontSize: 24,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "#fb923c",
                  }}
                />
                {feature}
              </div>
            )
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
