"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { RelatedItem, ContentType } from "@/lib/types";
import { resolveRelatedItems, getTypeLabel, ResolvedRelatedItem } from "@/lib/related-items";
import {
  FileText,
  Server,
  Webhook,
  Zap,
  Puzzle,
  BookOpen,
  Bot,
  ArrowRight,
} from "lucide-react";

const typeIcons: Record<ContentType, React.ElementType> = {
  "prompt": FileText,
  "mcp-server": Server,
  "hook": Webhook,
  "skill": Zap,
  "plugin": Puzzle,
  "agent": Bot,
  "how-to": BookOpen,
};

interface RelatedItemsProps {
  items?: RelatedItem[];
  title?: string;
}

function RelatedItemCard({ item }: { item: ResolvedRelatedItem }) {
  const Icon = typeIcons[item.type];

  return (
    <Link
      href={item.href}
      className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
    >
      <div className="p-2 rounded-md bg-muted">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm truncate">{item.title}</div>
        <Badge variant="outline" className="text-xs mt-1">
          {getTypeLabel(item.type)}
        </Badge>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
    </Link>
  );
}

export function RelatedItems({ items, title = "Related" }: RelatedItemsProps) {
  const resolved = resolveRelatedItems(items);

  if (resolved.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {resolved.map((item) => (
          <RelatedItemCard key={`${item.type}-${item.slug}`} item={item} />
        ))}
      </div>
    </div>
  );
}
