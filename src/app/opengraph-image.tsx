import { ImageResponse } from "next/og";

export const alt = "Claude Directory – Prompts, MCP, Skills & Plugins for Claude Code";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #14110f 0%, #1c1916 60%, #2a221c 100%)",
          color: "#fafaf9",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "28px",
            color: "#a8a29e",
          }}
        >
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "8px",
              background: "#f97316",
            }}
          />
          claudedirectory.org
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: "96px",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            Claude Directory
          </div>
          <div
            style={{
              fontSize: "40px",
              color: "#d6d3d1",
              lineHeight: 1.2,
              maxWidth: "900px",
            }}
          >
            Prompts, MCP servers, hooks, skills, plugins, and agents for Claude
            Code.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "12px",
            fontSize: "24px",
            color: "#a8a29e",
          }}
        >
          <span>Community-curated</span>
          <span>•</span>
          <span>Copy-paste setup</span>
          <span>•</span>
          <span>Updated weekly</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
