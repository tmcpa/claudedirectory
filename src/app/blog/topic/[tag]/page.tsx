import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/cards/blog-card";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { getAllBlogPostTags, getBlogPostsByTag } from "@/data/blog";
import { formatTagName } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

const BASE_URL = "https://claudedirectory.org";

interface Props {
  params: Promise<{ tag: string }>;
}

export function generateStaticParams() {
  return getAllBlogPostTags().map((tag) => ({ tag }));
}

export async function generateMetadata(props: Props) {
  const { tag } = await props.params;
  const tagItems = getBlogPostsByTag(tag);
  if (tagItems.length === 0) return { title: "Topic Not Found" };

  const displayName = formatTagName(tag);
  const url = `${BASE_URL}/blog/topic/${tag}`;
  const title = `${displayName} - Claude Code Blog`;
  const description = `Read ${tagItems.length} blog ${tagItems.length === 1 ? "post" : "posts"} about ${displayName}. Guides, tips, and insights for Claude Code developers.`;

  return {
    title,
    description,
    keywords: [tag, `${tag} claude code`, `${tag} guide`, "claude code", "blog"],
    openGraph: {
      title,
      description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary" as const,
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BlogTopicPage(props: Props) {
  const { tag } = await props.params;
  const tagItems = getBlogPostsByTag(tag);

  if (tagItems.length === 0) {
    notFound();
  }

  const allTags = getAllBlogPostTags();
  const displayName = formatTagName(tag);

  return (
    <div className="container py-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BASE_URL },
          { name: "Blog", url: `${BASE_URL}/blog` },
          { name: displayName, url: `${BASE_URL}/blog/topic/${tag}` },
        ]}
      />

      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Posts
        </Link>
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {displayName} - Claude Code Blog
        </h1>
        <p className="text-muted-foreground">
          {tagItems.length} {tagItems.length === 1 ? "post" : "posts"} tagged
          with &ldquo;{tag}&rdquo;
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {tagItems.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      <div className="border-t pt-6">
        <h2 className="text-sm font-medium text-muted-foreground mb-3">
          Browse more topics
        </h2>
        <div className="flex flex-wrap gap-2">
          {allTags.map((t) => (
            <Link key={t} href={`/blog/topic/${t}`}>
              <Badge
                variant={t === tag ? "default" : "secondary"}
                className={t === tag ? "bg-primary" : "cursor-pointer hover:bg-accent"}
              >
                {t}
              </Badge>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
