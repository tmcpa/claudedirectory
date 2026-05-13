import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd, CollectionPageJsonLd } from "@/components/json-ld";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BASE_URL } from "@/lib/constants";
import { useCases, type UseCase } from "@/data/use-cases";
import {
  crossPageTitle,
  crossPageDescription,
  TYPE_LABELS,
} from "@/lib/seo";

type CrossType = keyof typeof TYPE_LABELS;

const typeToPath: Record<CrossType, string> = {
  skill: "/skills",
  plugin: "/plugins",
  "mcp-server": "/mcp-servers",
  agent: "/agents",
  hook: "/hooks",
  prompt: "/prompts",
  "how-to": "/how-to",
  blog: "/blog",
};

export interface CrossPageMetadataInput {
  type: CrossType;
  tag: string;
  displayTag: string;
  useCase: UseCase;
  count: number;
}

export function buildCrossPageMetadata({
  type,
  tag,
  displayTag,
  useCase,
  count,
}: CrossPageMetadataInput) {
  const path = typeToPath[type];
  const url = `${BASE_URL}${path}/topic/${tag}/for/${useCase.slug}`;
  const title = crossPageTitle(type, displayTag, useCase.title);
  const description = crossPageDescription(type, displayTag, useCase.title, count);
  return {
    title,
    description,
    keywords: [
      ...useCase.keywords,
      `${displayTag.toLowerCase()} ${useCase.title.toLowerCase()}`,
      `claude code ${useCase.title.toLowerCase()} ${displayTag.toLowerCase()}`,
      tag,
      "claude code",
    ],
    openGraph: { title, description, url, type: "website" as const },
    twitter: { card: "summary" as const, title, description },
    alternates: { canonical: url },
  };
}

interface CrossPageShellProps {
  type: CrossType;
  tag: string;
  displayTag: string;
  useCase: UseCase;
  count: number;
  topicHref: string;
  topicLabel: string;
  children: React.ReactNode;
}

export function CrossPageShell({
  type,
  tag,
  displayTag,
  useCase,
  count,
  topicHref,
  topicLabel,
  children,
}: CrossPageShellProps) {
  const path = typeToPath[type];
  const url = `${BASE_URL}${path}/topic/${tag}/for/${useCase.slug}`;
  const title = crossPageTitle(type, displayTag, useCase.title);
  const description = crossPageDescription(type, displayTag, useCase.title, count);
  const otherUseCases = useCases.filter((u) => u.slug !== useCase.slug);
  const plural = TYPE_LABELS[type].plural.toLowerCase();

  return (
    <div className="container py-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BASE_URL },
          { name: TYPE_LABELS[type].plural, url: `${BASE_URL}${path}` },
          { name: displayTag, url: `${BASE_URL}${path}/topic/${tag}` },
          { name: useCase.title, url },
        ]}
      />
      <CollectionPageJsonLd
        name={title}
        description={description}
        url={url}
        itemCount={count}
      />

      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href={topicHref}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {topicLabel}
        </Link>
      </Button>

      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">{title}</h1>
        <p className="text-muted-foreground leading-relaxed mb-3">
          {description}
        </p>
        <p className="text-sm text-muted-foreground">
          {count} {count === 1 ? "item" : "items"} matching{" "}
          <span className="font-medium text-foreground">{displayTag}</span> &amp;{" "}
          <span className="font-medium text-foreground">{useCase.title}</span>.
        </p>
      </div>

      {children}

      <div className="border-t pt-6 mt-10 space-y-4">
        <div>
          <h2 className="text-sm font-medium text-muted-foreground mb-3">
            More {plural} for {useCase.title.toLowerCase()}
          </h2>
          <Link
            href={`/for/${useCase.slug}`}
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
          >
            Browse all {useCase.title.toLowerCase()} setups
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div>
          <h2 className="text-sm font-medium text-muted-foreground mb-3">
            Cross-reference with other workflows
          </h2>
          <div className="flex flex-wrap gap-2">
            {otherUseCases.map((u) => (
              <Link
                key={u.slug}
                href={`${path}/topic/${tag}/for/${u.slug}`}
              >
                <Badge
                  variant="secondary"
                  className="cursor-pointer hover:bg-accent"
                >
                  {displayTag} for {u.title}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
