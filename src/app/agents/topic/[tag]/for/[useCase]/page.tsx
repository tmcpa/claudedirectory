import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AgentCard } from "@/components/cards/agent-card";
import { buildCrossPageMetadata, CrossPageShell } from "@/components/cross-page";
import { getUseCaseBySlug } from "@/data/use-cases";
import {
  getCrossPageParams,
  getAgentsForTagAndUseCase,
} from "@/lib/use-cases";
import { formatTagName } from "@/lib/utils";

interface Props {
  params: Promise<{ tag: string; useCase: string }>;
}

export function generateStaticParams() {
  return getCrossPageParams("agents");
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { tag, useCase: useCaseSlug } = await props.params;
  const useCase = getUseCaseBySlug(useCaseSlug);
  if (!useCase) return { title: "Page Not Found" };
  const items = getAgentsForTagAndUseCase(tag, useCase);
  if (items.length === 0) return { title: "Page Not Found" };

  return buildCrossPageMetadata({
    type: "agent",
    tag,
    displayTag: formatTagName(tag),
    useCase,
    count: items.length,
  });
}

export default async function AgentCrossPage(props: Props) {
  const { tag, useCase: useCaseSlug } = await props.params;
  const useCase = getUseCaseBySlug(useCaseSlug);
  if (!useCase) notFound();
  const items = getAgentsForTagAndUseCase(tag, useCase);
  if (items.length === 0) notFound();

  const displayTag = formatTagName(tag);

  return (
    <CrossPageShell
      type="agent"
      tag={tag}
      displayTag={displayTag}
      useCase={useCase}
      count={items.length}
      topicHref={`/agents/topic/${tag}`}
      topicLabel={`All ${displayTag} agents`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((agent) => (
          <AgentCard key={agent.slug} agent={agent} />
        ))}
      </div>
    </CrossPageShell>
  );
}
