"use client";

import { useState } from "react";
import { HookCard } from "@/components/cards/hook-card";
import { Search } from "@/components/search";
import { TopicTags } from "@/components/topic-tags";
import { hooks } from "@/data/hooks";

export function HooksListing() {
  const [search, setSearch] = useState("");

  const filteredHooks = hooks.filter((hook) => {
    return (
      search === "" ||
      hook.title.toLowerCase().includes(search.toLowerCase()) ||
      hook.description.toLowerCase().includes(search.toLowerCase()) ||
      hook.tags.some((tag) =>
        tag.toLowerCase().includes(search.toLowerCase())
      )
    );
  });

  return (
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

      <TopicTags items={hooks} hrefPrefix="/hooks/topic" />

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
  );
}
