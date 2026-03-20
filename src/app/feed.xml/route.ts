import { blogPosts } from "@/data/blog";
import { getRecentlyAdded } from "@/data/recently-added";
import { BASE_URL } from "@/lib/constants";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const recentContent = getRecentlyAdded(20);
  const sortedBlogPosts = [...blogPosts].sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );

  const typeToPath: Record<string, string> = {
    prompt: "prompts",
    "mcp-server": "mcp-servers",
    hook: "hooks",
    skill: "skills",
    plugin: "plugins",
    agent: "agents",
    "how-to": "how-to",
    blog: "blog",
  };

  const items: string[] = [];

  // Add blog posts
  for (const post of sortedBlogPosts) {
    items.push(`    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${BASE_URL}/blog/${post.slug}</link>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.publishedDate).toUTCString()}</pubDate>
      <guid>${BASE_URL}/blog/${post.slug}</guid>
      <category>Blog</category>
    </item>`);
  }

  // Add recently added content
  for (const recent of recentContent) {
    const path = typeToPath[recent.type];
    if (!path) continue;
    items.push(`    <item>
      <title>${escapeXml(recent.item.title)}</title>
      <link>${BASE_URL}/${path}/${recent.item.slug}</link>
      <description>${escapeXml(recent.item.description)}</description>
      <pubDate>${new Date(recent.dateAdded).toUTCString()}</pubDate>
      <guid>${BASE_URL}/${path}/${recent.item.slug}</guid>
      <category>${escapeXml(recent.type)}</category>
    </item>`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Claude Directory</title>
    <link>${BASE_URL}</link>
    <description>The #1 directory for Claude Code configurations. New prompts, MCP servers, hooks, skills, plugins, and agents.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items.join("\n")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
