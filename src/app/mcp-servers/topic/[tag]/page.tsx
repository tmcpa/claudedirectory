import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MCPCard } from "@/components/cards/mcp-card";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { RelatedUseCases } from "@/components/related-use-cases";
import { getAllMCPServerTags, getMCPServersByTag } from "@/data/mcp-servers";
import { formatTagName } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { BASE_URL } from "@/lib/constants";
import { topicTitle, topicDescription } from "@/lib/seo";

interface Props {
  params: Promise<{ tag: string }>;
}

export function generateStaticParams() {
  return getAllMCPServerTags().map((tag) => ({ tag }));
}

export async function generateMetadata(props: Props) {
  const { tag } = await props.params;
  const tagItems = getMCPServersByTag(tag);
  if (tagItems.length === 0) return { title: "Topic Not Found" };

  const displayName = formatTagName(tag);
  const url = `${BASE_URL}/mcp-servers/topic/${tag}`;
  const title = topicTitle("mcp-server", displayName);
  const description = topicDescription("mcp-server", displayName, tagItems.length);

  return {
    title,
    description,
    keywords: [
      tag,
      `best ${tag} mcp server`,
      `${tag} claude code mcp`,
      `claude code mcp ${tag}`,
      "mcp",
      "model context protocol",
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

export default async function MCPServerTopicPage(props: Props) {
  const { tag } = await props.params;
  const tagItems = getMCPServersByTag(tag);

  if (tagItems.length === 0) {
    notFound();
  }

  const allTags = getAllMCPServerTags();
  const displayName = formatTagName(tag);

  return (
    <div className="container py-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BASE_URL },
          { name: "MCP Servers", url: `${BASE_URL}/mcp-servers` },
          { name: displayName, url: `${BASE_URL}/mcp-servers/topic/${tag}` },
        ]}
      />

      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/mcp-servers">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All MCP Servers
        </Link>
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Best Claude Code MCP Servers for {displayName}
        </h1>
        <p className="text-muted-foreground">
          {tagItems.length} MCP {tagItems.length === 1 ? "server" : "servers"} tagged
          with &ldquo;{tag}&rdquo;
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {tagItems.map((server) => (
          <MCPCard key={server.slug} server={server} />
        ))}
      </div>

      <RelatedUseCases tag={tag} crossPath="/mcp-servers" />

      <div className="border-t pt-6">
        <h2 className="text-sm font-medium text-muted-foreground mb-3">
          Browse more topics
        </h2>
        <div className="flex flex-wrap gap-2">
          {allTags.map((t) => (
            <Link key={t} href={`/mcp-servers/topic/${t}`}>
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
