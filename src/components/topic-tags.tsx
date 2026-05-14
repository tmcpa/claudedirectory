"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TaggedItem {
  tags: string[];
}

interface TopicTagsProps {
  items: TaggedItem[];
  hrefPrefix: string;
  label?: string;
  initialCount?: number;
  className?: string;
}

const DEFAULT_INITIAL_COUNT = 18;

export function TopicTags({
  items,
  hrefPrefix,
  label = "Browse by topic",
  initialCount = DEFAULT_INITIAL_COUNT,
  className,
}: TopicTagsProps) {
  const [expanded, setExpanded] = useState(false);

  const sortedTags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of items) {
      for (const tag of item.tags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }
    return Array.from(counts.entries()).sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1];
      return a[0].localeCompare(b[0]);
    });
  }, [items]);

  if (sortedTags.length === 0) return null;

  const visible = expanded ? sortedTags : sortedTags.slice(0, initialCount);
  const hidden = sortedTags.length - visible.length;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">
          {sortedTags.length} topic{sortedTags.length === 1 ? "" : "s"}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {visible.map(([tag, count]) => (
          <Link key={tag} href={`${hrefPrefix}/${tag}`}>
            <Badge
              variant="secondary"
              className="cursor-pointer hover:bg-accent gap-1.5"
            >
              <span>{tag}</span>
              <span className="text-muted-foreground text-[10px] font-normal tabular-nums">
                {count}
              </span>
            </Badge>
          </Link>
        ))}
        {hidden > 0 && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="text-xs font-medium text-muted-foreground hover:text-foreground underline underline-offset-4 px-1"
          >
            +{hidden} more
          </button>
        )}
        {expanded && sortedTags.length > initialCount && (
          <button
            type="button"
            onClick={() => setExpanded(false)}
            className="text-xs font-medium text-muted-foreground hover:text-foreground underline underline-offset-4 px-1"
          >
            Show less
          </button>
        )}
      </div>
    </div>
  );
}
