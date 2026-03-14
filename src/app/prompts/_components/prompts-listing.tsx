"use client";

import { useState } from "react";
import Link from "next/link";
import { PromptCard } from "@/components/cards/prompt-card";
import { Search } from "@/components/search";
import { Badge } from "@/components/ui/badge";
import { prompts, getAllPromptTags } from "@/data/prompts";

export function PromptsListing() {
  const [search, setSearch] = useState("");
  const allTags = getAllPromptTags();

  const filteredPrompts = prompts.filter((prompt) => {
    return (
      search === "" ||
      prompt.title.toLowerCase().includes(search.toLowerCase()) ||
      prompt.description.toLowerCase().includes(search.toLowerCase()) ||
      prompt.tags.some((tag) =>
        tag.toLowerCase().includes(search.toLowerCase())
      )
    );
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:max-w-xs">
          <Search
            placeholder="Search prompts..."
            value={search}
            onChange={setSearch}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <Link key={tag} href={`/prompts/topic/${tag}`}>
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
        {filteredPrompts.map((prompt) => (
          <PromptCard key={prompt.slug} prompt={prompt} />
        ))}
      </div>

      {filteredPrompts.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No prompts found matching your criteria
        </div>
      )}
    </div>
  );
}
