"use client";

import { useState } from "react";
import { HookCard } from "@/components/cards/hook-card";
import { Search } from "@/components/search";
import { Badge } from "@/components/ui/badge";
import { hooks, getAllHookTags } from "@/data/hooks";
import { cn } from "@/lib/utils";

export default function HooksPage() {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const allTags = getAllHookTags();

  const filteredHooks = hooks.filter((hook) => {
    const matchesSearch =
      search === "" ||
      hook.title.toLowerCase().includes(search.toLowerCase()) ||
      hook.description.toLowerCase().includes(search.toLowerCase()) ||
      hook.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));

    const matchesTag = selectedTag === null || hook.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Hooks</h1>
        <p className="text-muted-foreground">
          Automate workflows with pre and post tool-use hooks
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:max-w-xs">
            <Search
              placeholder="Search hooks..."
              value={search}
              onChange={setSearch}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedTag === null ? "default" : "secondary"}
            className={cn(
              "cursor-pointer hover:bg-primary/80",
              selectedTag === null && "bg-primary"
            )}
            onClick={() => setSelectedTag(null)}
          >
            All
          </Badge>
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTag === tag ? "default" : "secondary"}
              className={cn(
                "cursor-pointer",
                selectedTag === tag
                  ? "bg-primary hover:bg-primary/80"
                  : "hover:bg-accent"
              )}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredHooks.map((hook) => (
            <HookCard key={hook.slug} hook={hook} />
          ))}
        </div>

        {filteredHooks.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No hooks found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
}
