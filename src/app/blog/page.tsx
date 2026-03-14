import type { Metadata } from "next";
import { BlogListing } from "./_components/blog-listing";

const BASE_URL = "https://claudedirectory.org";

export const metadata: Metadata = {
  title: "Claude Code Blog - Tips, Guides & Insights",
  description:
    "Read the latest news, guides, and insights about Claude Code and AI-assisted development. Practical tips, productivity workflows, deep dives into hooks and MCP servers, and more.",
  keywords: [
    "claude code blog",
    "claude code tips",
    "claude code guides",
    "ai development blog",
    "claude code tutorials",
  ],
  openGraph: {
    title: "Claude Code Blog - Tips, Guides & Insights",
    description:
      "Read the latest news, guides, and insights about Claude Code and AI-assisted development.",
    url: `${BASE_URL}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Claude Code Blog - Tips, Guides & Insights",
    description:
      "Read the latest news, guides, and insights about Claude Code and AI-assisted development.",
  },
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
};

export default function BlogPage() {
  return (
    <div className="container py-8">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Blog</h1>
        <p className="text-muted-foreground leading-relaxed">
          Practical tips, deep dives into hooks and MCP servers, productivity workflows,
          and analysis of the AI coding landscape. Written for developers who want to
          ship better code faster with Claude Code. Browse by topic to find posts on
          tutorials, best practices, developer tools, and more.
        </p>
      </div>

      <BlogListing />
    </div>
  );
}
