import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CodeBlock } from "@/components/code-block";
import { CopyButton } from "@/components/copy-button";
import { ItemJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { RelatedItems, SuggestedItems } from "@/components/related-items";
import { RepoMeta } from "@/components/repo-meta";
import { GitHubReadme } from "@/components/github-readme";
import { prompts, getPromptBySlug } from "@/data/prompts";
import { ArrowLeft, FileText, User, ExternalLink } from "lucide-react";
import { BASE_URL } from "@/lib/constants";
import { getRepoMetadata } from "@/lib/github";
import { getCurrentMonthYear } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return prompts.map((prompt) => ({
    slug: prompt.slug,
  }));
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const prompt = getPromptBySlug(params.slug);
  if (!prompt) return { title: "Prompt Not Found" };

  const url = `${BASE_URL}/prompts/${prompt.slug}`;
  const month = getCurrentMonthYear();
  const title = `Best ${prompt.title} CLAUDE.md Prompt for Claude Code (${month})`;
  const description = `${prompt.description} Copy this CLAUDE.md prompt into your project root and Claude Code picks it up automatically.`;

  return {
    title,
    description,
    keywords: [...prompt.tags, "claude code", "prompt", "CLAUDE.md"],
    openGraph: {
      title,
      description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function PromptDetailPage(props: Props) {
  const params = await props.params;
  const prompt = getPromptBySlug(params.slug);

  if (!prompt) {
    notFound();
  }

  const pageUrl = `${BASE_URL}/prompts/${prompt.slug}`;
  const repoMeta = await getRepoMetadata(prompt.repoUrl);

  return (
    <div className="container py-8 max-w-4xl">
      <ItemJsonLd
        type="SoftwareApplication"
        name={prompt.title}
        description={prompt.description}
        url={pageUrl}
        author={prompt.author}
        tags={prompt.tags}
        repoUrl={prompt.repoUrl}
        stars={repoMeta?.stars}
        dateModified={repoMeta?.lastUpdated}
        programmingLanguage={repoMeta?.language}
        license={repoMeta?.license}
        applicationSubCategory="CLAUDE.md Prompt"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BASE_URL },
          { name: "Prompts", url: `${BASE_URL}/prompts` },
          { name: prompt.title, url: pageUrl },
        ]}
      />
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/prompts">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Prompts
        </Link>
      </Button>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-accent">
            <FileText className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{prompt.title}</h1>
            <p className="text-muted-foreground">{prompt.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {prompt.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            By{" "}
            {prompt.author.url ? (
              <a
                href={prompt.author.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline"
              >
                {prompt.author.name}
              </a>
            ) : (
              prompt.author.name
            )}
          </span>
          <RepoMeta meta={repoMeta} />
        </div>

        <Separator />

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">CLAUDE.md Content</h2>
            <CopyButton text={prompt.content} />
          </div>
          <CodeBlock code={prompt.content} language="markdown" />
        </div>

        <div className="bg-accent/50 rounded-lg p-4">
          <h3 className="font-semibold mb-2">How to use</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
            <li>Copy the content above</li>
            <li>Create a CLAUDE.md file in your project root</li>
            <li>Paste the content and customize as needed</li>
            <li>Claude Code will automatically use this context</li>
          </ol>
        </div>

        <GitHubReadme repoUrl={prompt.repoUrl} meta={repoMeta} />

        {prompt.repoUrl && (
          <div>
            <a
              href={prompt.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              View source on GitHub
            </a>
          </div>
        )}

        {prompt.relatedItems && prompt.relatedItems.length > 0 && (
          <>
            <Separator />
            <RelatedItems items={prompt.relatedItems} />
          </>
        )}

        <Separator />
        <SuggestedItems
          currentSlug={prompt.slug}
          currentType="prompt"
          currentTags={prompt.tags}
        />
      </div>
    </div>
  );
}
