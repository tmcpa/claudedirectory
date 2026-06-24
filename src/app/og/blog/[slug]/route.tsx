import { ImageResponse } from "next/og";
import { blogPosts, getBlogPostBySlug } from "@/data/blog";

// Pre-render an OG card for every known blog slug at build time so the
// images ship as static assets (matches the site's mostly-static model).
export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

// Warm Claude-brand palette, translated to hex/rgba — Satori (the engine
// behind ImageResponse) does not support the oklch() colors used in CSS.
const COLORS = {
  bgFrom: "#1c1714",
  bgTo: "#2a1f17",
  coral: "#d97757",
  title: "#f7f2ec",
  muted: "#b8a99d",
  border: "rgba(247,242,236,0.12)",
  pillBg: "rgba(217,119,87,0.14)",
  pillText: "#e8a583",
  pillBorder: "rgba(217,119,87,0.38)",
};

function titleFontSize(title: string): number {
  if (title.length > 70) return 50;
  if (title.length > 52) return 56;
  if (title.length > 36) return 62;
  return 70;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  const title = post?.title ?? "Claude Directory";
  const tags = (post?.tags ?? ["claude-code"]).slice(0, 3);

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: COLORS.bgFrom,
          backgroundImage: `linear-gradient(135deg, ${COLORS.bgFrom} 0%, ${COLORS.bgTo} 100%)`,
          fontFamily: "sans-serif",
        }}
      >
        {/* Header: brand wordmark + section eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "56px",
                height: "56px",
                borderRadius: "14px",
                backgroundColor: COLORS.coral,
                marginRight: "22px",
              }}
            >
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "6px",
                  backgroundColor: "rgba(28,23,20,0.85)",
                }}
              />
            </div>
            <div
              style={{ fontSize: "32px", fontWeight: 600, color: COLORS.title }}
            >
              Claude Directory
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "22px",
              fontWeight: 600,
              letterSpacing: "3px",
              color: COLORS.muted,
              border: `1px solid ${COLORS.border}`,
              borderRadius: "999px",
              padding: "10px 22px",
            }}
          >
            BLOG
          </div>
        </div>

        {/* Title block with a coral accent bar */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              width: "84px",
              height: "8px",
              borderRadius: "4px",
              backgroundColor: COLORS.coral,
              marginBottom: "30px",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: `${titleFontSize(title)}px`,
              fontWeight: 700,
              lineHeight: 1.15,
              color: COLORS.title,
              maxWidth: "1000px",
            }}
          >
            {title}
          </div>
        </div>

        {/* Footer: topic tags + domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid ${COLORS.border}`,
            paddingTop: "28px",
          }}
        >
          <div style={{ display: "flex" }}>
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  fontSize: "24px",
                  color: COLORS.pillText,
                  backgroundColor: COLORS.pillBg,
                  border: `1px solid ${COLORS.pillBorder}`,
                  borderRadius: "999px",
                  padding: "8px 20px",
                  marginRight: "14px",
                }}
              >
                #{tag}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: "26px", color: COLORS.muted }}>
            claudedirectory.org
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=86400, s-maxage=604800, immutable",
      },
    },
  );
}
