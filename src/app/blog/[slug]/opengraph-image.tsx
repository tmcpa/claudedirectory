import { ImageResponse } from "next/og";
import { blogPosts, getBlogPostBySlug } from "@/data/blog";

export const alt = "Claude Directory blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  const title = post?.title ?? "Claude Directory";
  const tags = post?.tags?.slice(0, 3) ?? [];

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
          claudedirectory.org / blog
        </div>
        <div
          style={{
            fontSize: title.length > 60 ? "64px" : "76px",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            maxWidth: "1040px",
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            fontSize: "22px",
            color: "#d6d3d1",
          }}
        >
          {tags.map((tag) => (
            <div
              key={tag}
              style={{
                padding: "8px 18px",
                border: "1px solid #44403c",
                borderRadius: "999px",
                background: "#1c1916",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
