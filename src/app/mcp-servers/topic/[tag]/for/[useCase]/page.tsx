import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MCPCard } from "@/components/cards/mcp-card";
import { buildCrossPageMetadata, CrossPageShell } from "@/components/cross-page";
import { getUseCaseBySlug } from "@/data/use-cases";
import {
  getCrossPageParams,
  getMcpServersForTagAndUseCase,
} from "@/lib/use-cases";
import { formatTagName } from "@/lib/utils";

interface Props {
  params: Promise<{ tag: string; useCase: string }>;
}

export function generateStaticParams() {
  return getCrossPageParams("mcp-servers");
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { tag, useCase: useCaseSlug } = await props.params;
  const useCase = getUseCaseBySlug(useCaseSlug);
  if (!useCase) return { title: "Page Not Found" };
  const items = getMcpServersForTagAndUseCase(tag, useCase);
  if (items.length === 0) return { title: "Page Not Found" };

  return buildCrossPageMetadata({
    type: "mcp-server",
    tag,
    displayTag: formatTagName(tag),
    useCase,
    count: items.length,
  });
}

export default async function MCPServerCrossPage(props: Props) {
  const { tag, useCase: useCaseSlug } = await props.params;
  const useCase = getUseCaseBySlug(useCaseSlug);
  if (!useCase) notFound();
  const items = getMcpServersForTagAndUseCase(tag, useCase);
  if (items.length === 0) notFound();

  const displayTag = formatTagName(tag);

  return (
    <CrossPageShell
      type="mcp-server"
      tag={tag}
      displayTag={displayTag}
      useCase={useCase}
      count={items.length}
      topicHref={`/mcp-servers/topic/${tag}`}
      topicLabel={`All ${displayTag} MCP servers`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((server) => (
          <MCPCard key={server.slug} server={server} />
        ))}
      </div>
    </CrossPageShell>
  );
}
