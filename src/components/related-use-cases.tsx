import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getUseCasesForTag } from "@/lib/use-cases";

export function RelatedUseCases({ tag }: { tag: string }) {
  const matches = getUseCasesForTag(tag);
  if (matches.length === 0) return null;

  return (
    <div className="border-t pt-6 mb-6">
      <h2 className="text-sm font-medium text-muted-foreground mb-3">
        Use cases that include {tag}
      </h2>
      <div className="flex flex-wrap gap-2">
        {matches.map((u) => (
          <Link key={u.slug} href={`/for/${u.slug}`}>
            <Badge className="cursor-pointer hover:bg-accent" variant="default">
              {u.title} →
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
}
