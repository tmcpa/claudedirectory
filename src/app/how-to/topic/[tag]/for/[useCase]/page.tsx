import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { HowToCard } from "@/components/cards/how-to-card";
import { buildCrossPageMetadata, CrossPageShell } from "@/components/cross-page";
import { getUseCaseBySlug } from "@/data/use-cases";
import {
  getCrossPageParams,
  getHowTosForTagAndUseCase,
} from "@/lib/use-cases";
import { formatTagName } from "@/lib/utils";

interface Props {
  params: Promise<{ tag: string; useCase: string }>;
}

export function generateStaticParams() {
  return getCrossPageParams("how-to");
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { tag, useCase: useCaseSlug } = await props.params;
  const useCase = getUseCaseBySlug(useCaseSlug);
  if (!useCase) return { title: "Page Not Found" };
  const items = getHowTosForTagAndUseCase(tag, useCase);
  if (items.length === 0) return { title: "Page Not Found" };

  return buildCrossPageMetadata({
    type: "how-to",
    tag,
    displayTag: formatTagName(tag),
    useCase,
    count: items.length,
  });
}

export default async function HowToCrossPage(props: Props) {
  const { tag, useCase: useCaseSlug } = await props.params;
  const useCase = getUseCaseBySlug(useCaseSlug);
  if (!useCase) notFound();
  const items = getHowTosForTagAndUseCase(tag, useCase);
  if (items.length === 0) notFound();

  const displayTag = formatTagName(tag);

  return (
    <CrossPageShell
      type="how-to"
      tag={tag}
      displayTag={displayTag}
      useCase={useCase}
      count={items.length}
      topicHref={`/how-to/topic/${tag}`}
      topicLabel={`All ${displayTag} guides`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((howTo) => (
          <HowToCard key={howTo.slug} howTo={howTo} />
        ))}
      </div>
    </CrossPageShell>
  );
}
