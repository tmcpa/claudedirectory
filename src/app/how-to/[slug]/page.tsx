import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ItemJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { RelatedItems } from "@/components/related-items";
import { howTos, getHowToBySlug } from "@/data/how-to";
import { ArrowLeft, BookOpen, User, Clock, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { CodeBlock } from "@/components/code-block";

const BASE_URL = "https://claudedirectory.org";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return howTos.map((howTo) => ({
    slug: howTo.slug,
  }));
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const howTo = getHowToBySlug(params.slug);
  if (!howTo) return { title: "Guide Not Found" };

  const url = `${BASE_URL}/how-to/${howTo.slug}`;

  return {
    title: `${howTo.title} - Claude Code Guide`,
    description: howTo.description,
    keywords: [...howTo.tags, "claude code", "guide", "tutorial", "how to"],
    openGraph: {
      title: `${howTo.title} - Claude Code Guide`,
      description: howTo.description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${howTo.title} - Claude Code Guide`,
      description: howTo.description,
    },
    alternates: {
      canonical: url,
    },
  };
}

const difficultyColors = {
  beginner: "bg-green-500/10 text-green-500 border-green-500/20",
  intermediate: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  advanced: "bg-red-500/10 text-red-500 border-red-500/20",
};

export default async function HowToDetailPage(props: Props) {
  const params = await props.params;
  const howTo = getHowToBySlug(params.slug);

  if (!howTo) {
    notFound();
  }

  const pageUrl = `${BASE_URL}/how-to/${howTo.slug}`;

  return (
    <div className="container py-8 max-w-4xl">
      <ItemJsonLd
        type="HowTo"
        name={howTo.title}
        description={howTo.description}
        url={pageUrl}
        author={howTo.author}
        tags={howTo.tags}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BASE_URL },
          { name: "How-To Guides", url: `${BASE_URL}/how-to` },
          { name: howTo.title, url: pageUrl },
        ]}
      />
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/how-to">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Guides
        </Link>
      </Button>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-accent">
            <BookOpen className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{howTo.title}</h1>
            <p className="text-muted-foreground">{howTo.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Badge
            variant="outline"
            className={cn("capitalize", difficultyColors[howTo.difficulty])}
          >
            {howTo.difficulty}
          </Badge>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{howTo.timeToComplete}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {howTo.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>
            By{" "}
            {howTo.author.url ? (
              <a
                href={howTo.author.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline"
              >
                {howTo.author.name}
              </a>
            ) : (
              howTo.author.name
            )}
          </span>
        </div>

        <Separator />

        <article className="prose prose-invert prose-sm max-w-none">
          <ReactMarkdown
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
            {howTo.content}
          </ReactMarkdown>
        </article>

        {howTo.repoUrl && (
          <div>
            <a
              href={howTo.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              View source on GitHub
            </a>
          </div>
        )}

        {howTo.relatedItems && howTo.relatedItems.length > 0 && (
          <>
            <Separator />
            <RelatedItems items={howTo.relatedItems} />
          </>
        )}
      </div>
    </div>
  );
}
