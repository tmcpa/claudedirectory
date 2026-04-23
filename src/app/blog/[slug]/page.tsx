import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ItemJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { RelatedItems, SuggestedItems } from "@/components/related-items";
import { blogPosts, getBlogPostBySlug } from "@/data/blog";
import { ArrowLeft, Newspaper, User, Calendar, Clock, ExternalLink, List } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "@/components/code-block";
import React from "react";
import { BASE_URL } from "@/lib/constants";

function getReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / 250);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

function extractHeadings(content: string): { text: string; slug: string }[] {
  const headings: { text: string; slug: string }[] = [];
  const seen = new Set<string>();
  let inFence = false;
  let fenceMarker = "";
  for (const line of content.split("\n")) {
    const fenceMatch = /^(\s*)(`{3,}|~{3,})/.exec(line);
    if (fenceMatch) {
      const marker = fenceMatch[2];
      if (!inFence) {
        inFence = true;
        fenceMarker = marker[0];
      } else if (marker[0] === fenceMarker) {
        inFence = false;
        fenceMarker = "";
      }
      continue;
    }
    if (inFence) continue;
    const headingMatch = /^## (.+)$/.exec(line);
    if (!headingMatch) continue;
    const text = headingMatch[1];
    let slug = slugify(text);
    if (seen.has(slug)) {
      let n = 2;
      while (seen.has(`${slug}-${n}`)) n++;
      slug = `${slug}-${n}`;
    }
    seen.add(slug);
    headings.push({ text, slug });
  }
  return headings;
}

function getTextContent(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  if (Array.isArray(node)) return node.map(getTextContent).join("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const el = node as any;
  if (el?.props?.children) return getTextContent(el.props.children);
  return "";
}

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const post = getBlogPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };

  const url = `${BASE_URL}/blog/${post.slug}`;

  const title = post.seoTitle ?? `${post.title} - Claude Directory Blog`;
  const description = post.seoDescription ?? post.description;

  return {
    title,
    description,
    keywords: [...post.tags, "claude code", "blog", "ai development"],
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: new Date(post.publishedDate).toISOString(),
      images: [
        {
          url: `${BASE_URL}/og/blog/${post.slug}.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}/og/blog/${post.slug}.png`],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BlogPostPage(props: Props) {
  const params = await props.params;
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const pageUrl = `${BASE_URL}/blog/${post.slug}`;

  const formattedDate = new Date(post.publishedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const readingTime = getReadingTime(post.content);
  const headings = extractHeadings(post.content);

  return (
    <div className="container py-8 max-w-4xl">
      <ItemJsonLd
        type="Article"
        name={post.title}
        description={post.description}
        url={pageUrl}
        author={post.author}
        tags={post.tags}
        datePublished={post.publishedDate}
        image={`${BASE_URL}/og/blog/${post.slug}.png`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BASE_URL },
          { name: "Blog", url: `${BASE_URL}/blog` },
          { name: post.title, url: pageUrl },
        ]}
      />
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </Button>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-accent">
            <Newspaper className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
            <p className="text-muted-foreground">{post.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{readingTime} min read</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>
            By{" "}
            {post.author.url ? (
              <a
                href={post.author.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline"
              >
                {post.author.name}
              </a>
            ) : (
              post.author.name
            )}
          </span>
        </div>

        <Separator />

        {headings.length > 2 && (
          <nav className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-2 text-sm font-medium mb-3">
              <List className="h-4 w-4" />
              <span>Table of Contents</span>
            </div>
            <ol className="space-y-1.5 text-sm text-muted-foreground list-decimal list-inside">
              {headings.map((heading) => (
                <li key={heading.slug}>
                  <a
                    href={`#${heading.slug}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <article className="prose prose-invert prose-sm max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                const isInline = !match;

                if (isInline) {
                  return (
                    <code className="bg-muted px-1.5 py-0.5 rounded text-sm" {...props}>
                      {children}
                    </code>
                  );
                }

                return (
                  <CodeBlock
                    code={String(children).replace(/\n$/, "")}
                    language={match[1]}
                  />
                );
              },
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              pre({ children, node }: any) {
                const codeChild = node?.children?.find(
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (child: any) => child.type === "element" && child.tagName === "code"
                );
                if (codeChild) {
                  const cls = (codeChild.properties?.className as string[] | undefined)?.[0] || "";
                  const langMatch = /language-(\w+)/.exec(cls);
                  if (!langMatch) {
                    const text = codeChild.children
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      ?.filter((c: any) => c.type === "text")
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      .map((c: any) => c.value)
                      .join("") || "";
                    return <CodeBlock code={text.replace(/\n$/, "")} language="text" />;
                  }
                }
                return <>{children}</>;
              },
              h1({ children }) {
                return <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>;
              },
              h2({ children }) {
                const id = slugify(getTextContent(children));
                return <h2 id={id} className="text-xl font-semibold mt-6 mb-3">{children}</h2>;
              },
              h3({ children }) {
                return <h3 className="text-lg font-medium mt-4 mb-2">{children}</h3>;
              },
              p({ children }) {
                return <p className="my-3 leading-relaxed">{children}</p>;
              },
              ul({ children }) {
                return <ul className="my-3 ml-4 list-disc space-y-1">{children}</ul>;
              },
              ol({ children }) {
                return <ol className="my-3 ml-4 list-decimal space-y-1">{children}</ol>;
              },
              li({ children }) {
                return <li className="leading-relaxed">{children}</li>;
              },
              table({ children }) {
                return (
                  <div className="my-4 overflow-x-auto">
                    <table className="w-full border-collapse border border-border">
                      {children}
                    </table>
                  </div>
                );
              },
              thead({ children }) {
                return <thead className="bg-muted">{children}</thead>;
              },
              th({ children }) {
                return (
                  <th className="border border-border px-4 py-2 text-left font-semibold">
                    {children}
                  </th>
                );
              },
              td({ children }) {
                return <td className="border border-border px-4 py-2">{children}</td>;
              },
              a({ href, children }) {
                return (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {children}
                  </a>
                );
              },
              blockquote({ children }) {
                return (
                  <blockquote className="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground">
                    {children}
                  </blockquote>
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>

        {post.repoUrl && (
          <div>
            <a
              href={post.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              View on GitHub
            </a>
          </div>
        )}

        {post.relatedItems && post.relatedItems.length > 0 && (
          <>
            <Separator />
            <RelatedItems items={post.relatedItems} />
          </>
        )}

        <Separator />
        <SuggestedItems
          currentSlug={post.slug}
          currentType="blog"
          currentTags={post.tags}
        />
      </div>
    </div>
  );
}
