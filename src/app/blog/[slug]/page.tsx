import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ItemJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { RelatedItems } from "@/components/related-items";
import { blogPosts, getBlogPostBySlug } from "@/data/blog";
import { ArrowLeft, Newspaper, User, Calendar, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "@/components/code-block";

const BASE_URL = "https://claudedirectory.org";

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

  return {
    title: `${post.title} - Claude Directory Blog`,
    description: post.description,
    keywords: [...post.tags, "claude code", "blog", "ai development"],
    openGraph: {
      title: `${post.title} - Claude Directory Blog`,
      description: post.description,
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
      title: `${post.title} - Claude Directory Blog`,
      description: post.description,
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
              pre({ children }) {
                return <>{children}</>;
              },
              h1({ children }) {
                return <h1 className="text-2xl font-bold mt-8 mb-4">{children}</h1>;
              },
              h2({ children }) {
                return <h2 className="text-xl font-semibold mt-6 mb-3">{children}</h2>;
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
      </div>
    </div>
  );
}
