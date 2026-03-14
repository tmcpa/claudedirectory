"use client";

import { useState } from "react";
import Link from "next/link";
import { HookCard } from "@/components/cards/hook-card";
import { Search } from "@/components/search";
import { Badge } from "@/components/ui/badge";
import { hooks, getAllHookTags } from "@/data/hooks";

export function HooksListing() {
  const [search, setSearch] = useState("");
  const allTags = getAllHookTags();

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

      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <Link key={tag} href={`/hooks/topic/${tag}`}>
            <Badge
              variant="secondary"
              className="cursor-pointer hover:bg-accent"
            >
              {tag}
            </Badge>
          </Link>
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
  );
}
