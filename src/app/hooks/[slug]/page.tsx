import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CodeBlock } from "@/components/code-block";
import { CopyButton } from "@/components/copy-button";
import { ItemJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { RelatedItems } from "@/components/related-items";
import { hooks, getHookBySlug } from "@/data/hooks";
import { ArrowLeft, Webhook, User } from "lucide-react";

const BASE_URL = "https://claudedirectory.org";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return hooks.map((hook) => ({
    slug: hook.slug,
  }));
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const hook = getHookBySlug(params.slug);
  if (!hook) return { title: "Hook Not Found" };

  const url = `${BASE_URL}/hooks/${hook.slug}`;

  return {
    title: `${hook.title} Hook - Claude Code`,
    description: hook.description,
    keywords: [...hook.tags, "claude code", "hook", "automation", hook.event],
    openGraph: {
      title: `${hook.title} Hook - Claude Code`,
      description: hook.description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${hook.title} Hook - Claude Code`,
      description: hook.description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function HookDetailPage(props: Props) {
  const params = await props.params;
  const hook = getHookBySlug(params.slug);

  if (!hook) {
    notFound();
  }

  const pageUrl = `${BASE_URL}/hooks/${hook.slug}`;

  const hookConfig = JSON.stringify(
    {
      hooks: {
        [hook.event]: [
          {
            ...(hook.matcher && { matcher: hook.matcher }),
            command: `./hooks/${hook.slug}.sh`,
          },
        ],
      },
    },
    null,
    2
  );

  return (
    <div className="container py-8 max-w-4xl">
      <ItemJsonLd
        type="SoftwareApplication"
        name={hook.title}
        description={hook.description}
        url={pageUrl}
        author={hook.author}
        tags={hook.tags}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BASE_URL },
          { name: "Hooks", url: `${BASE_URL}/hooks` },
          { name: hook.title, url: pageUrl },
        ]}
      />
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/hooks">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Hooks
        </Link>
      </Button>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-accent">
            <Webhook className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold">{hook.title}</h1>
              <Badge variant="outline">{hook.event}</Badge>
            </div>
            <p className="text-muted-foreground">{hook.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {hook.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>
            By{" "}
            {hook.author.url ? (
              <a
                href={hook.author.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline"
              >
                {hook.author.name}
              </a>
            ) : (
              hook.author.name
            )}
          </span>
        </div>

        <Separator />

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Hook Script</h2>
            <CopyButton text={hook.script} />
          </div>
          <CodeBlock code={hook.script} language="bash" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Settings Configuration</h2>
            <CopyButton text={hookConfig} />
          </div>
          <CodeBlock code={hookConfig} language="json" />
        </div>

        <div className="bg-accent/50 rounded-lg p-4">
          <h3 className="font-semibold mb-2">How to use</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
            <li>Create a hooks directory in your project: mkdir hooks</li>
            <li>Save the hook script as hooks/{hook.slug}.sh</li>
            <li>Make it executable: chmod +x hooks/{hook.slug}.sh</li>
            <li>Add the configuration to your Claude Code settings</li>
            <li>Restart Claude Code to apply changes</li>
          </ol>
        </div>

        {hook.relatedItems && hook.relatedItems.length > 0 && (
          <>
            <Separator />
            <RelatedItems items={hook.relatedItems} />
          </>
        )}
      </div>
    </div>
  );
}
