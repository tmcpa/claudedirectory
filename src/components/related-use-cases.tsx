import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getUseCasesForTag } from "@/lib/use-cases";
import { formatTagName } from "@/lib/utils";

interface RelatedUseCasesProps {
  tag: string;
  /**
   * If set, links go to the cross page `{crossPath}/topic/{tag}/for/{useCase}`
   * with anchor text like "{Tag} for {UseCase}". When omitted, links go to
   * `/for/{useCase}` (the cross-type use-case directory).
   */
  crossPath?: string;
}

export function RelatedUseCases({ tag, crossPath }: RelatedUseCasesProps) {
  const matches = getUseCasesForTag(tag);
  if (matches.length === 0) return null;

  const displayTag = formatTagName(tag);

  return (
    <div className="border-t pt-6 mb-6">
      <h2 className="text-sm font-medium text-muted-foreground mb-3">
        {crossPath
          ? `Drill down: ${displayTag} setups by use case`
          : `Use cases that include ${tag}`}
      </h2>
      <div className="flex flex-wrap gap-2">
        {matches.map((u) => {
          const href = crossPath
            ? `${crossPath}/topic/${tag}/for/${u.slug}`
            : `/for/${u.slug}`;
          const label = crossPath ? `${displayTag} for ${u.title} →` : `${u.title} →`;
          return (
            <Link key={u.slug} href={href}>
              <Badge className="cursor-pointer hover:bg-accent" variant="default">
                {label}
              </Badge>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
