import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SkillCard } from "@/components/cards/skill-card";
import { buildCrossPageMetadata, CrossPageShell } from "@/components/cross-page";
import { getUseCaseBySlug } from "@/data/use-cases";
import {
  getCrossPageParams,
  getSkillsForTagAndUseCase,
} from "@/lib/use-cases";
import { formatTagName } from "@/lib/utils";

interface Props {
  params: Promise<{ tag: string; useCase: string }>;
}

export function generateStaticParams() {
  return getCrossPageParams("skills");
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { tag, useCase: useCaseSlug } = await props.params;
  const useCase = getUseCaseBySlug(useCaseSlug);
  if (!useCase) return { title: "Page Not Found" };
  const items = getSkillsForTagAndUseCase(tag, useCase);
  if (items.length === 0) return { title: "Page Not Found" };

  return buildCrossPageMetadata({
    type: "skill",
    tag,
    displayTag: formatTagName(tag),
    useCase,
    count: items.length,
  });
}

export default async function SkillCrossPage(props: Props) {
  const { tag, useCase: useCaseSlug } = await props.params;
  const useCase = getUseCaseBySlug(useCaseSlug);
  if (!useCase) notFound();
  const items = getSkillsForTagAndUseCase(tag, useCase);
  if (items.length === 0) notFound();

  const displayTag = formatTagName(tag);

  return (
    <CrossPageShell
      type="skill"
      tag={tag}
      displayTag={displayTag}
      useCase={useCase}
      count={items.length}
      topicHref={`/skills/topic/${tag}`}
      topicLabel={`All ${displayTag} skills`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((skill) => (
          <SkillCard key={skill.slug} skill={skill} />
        ))}
      </div>
    </CrossPageShell>
  );
}
