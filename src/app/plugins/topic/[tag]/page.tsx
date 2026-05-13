import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PluginCard } from "@/components/cards/plugin-card";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { RelatedUseCases } from "@/components/related-use-cases";
import { getAllPluginTags, getPluginsByTag } from "@/data/plugins";
import { formatTagName } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { BASE_URL } from "@/lib/constants";
import { topicTitle, topicDescription } from "@/lib/seo";

interface Props {
  params: Promise<{ tag: string }>;
}

export function generateStaticParams() {
  return getAllPluginTags().map((tag) => ({ tag }));
}

export async function generateMetadata(props: Props) {
  const { tag } = await props.params;
  const tagItems = getPluginsByTag(tag);
  if (tagItems.length === 0) return { title: "Topic Not Found" };

  const displayName = formatTagName(tag);
  const url = `${BASE_URL}/plugins/topic/${tag}`;
  const title = topicTitle("plugin", displayName);
  const description = topicDescription("plugin", displayName, tagItems.length);

  return {
    title,
    description,
    keywords: [
      tag,
      `best ${tag} claude code plugins`,
      `${tag} extensions`,
      `claude code plugins ${tag}`,
      "claude code",
      "plugins",
    ],
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

export default async function PluginTopicPage(props: Props) {
  const { tag } = await props.params;
  const tagItems = getPluginsByTag(tag);

  if (tagItems.length === 0) {
    notFound();
  }

  const allTags = getAllPluginTags();
  const displayName = formatTagName(tag);

  return (
    <div className="container py-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BASE_URL },
          { name: "Plugins", url: `${BASE_URL}/plugins` },
          { name: displayName, url: `${BASE_URL}/plugins/topic/${tag}` },
        ]}
      />

      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/plugins">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Plugins
        </Link>
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Best Claude Code Plugins for {displayName}
        </h1>
        <p className="text-muted-foreground">
          {tagItems.length} {tagItems.length === 1 ? "plugin" : "plugins"} tagged
          with &ldquo;{tag}&rdquo;
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {tagItems.map((plugin) => (
          <PluginCard key={plugin.slug} plugin={plugin} />
        ))}
      </div>

      <RelatedUseCases tag={tag} crossPath="/plugins" />

      <div className="border-t pt-6">
        <h2 className="text-sm font-medium text-muted-foreground mb-3">
          Browse more topics
        </h2>
        <div className="flex flex-wrap gap-2">
          {allTags.map((t) => (
            <Link key={t} href={`/plugins/topic/${t}`}>
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
