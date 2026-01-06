"use client";

import { useState } from "react";
import { PromptCard } from "@/components/cards/prompt-card";
import { Search } from "@/components/search";
import { Badge } from "@/components/ui/badge";
import { prompts, getAllPromptTags } from "@/data/prompts";
import { cn } from "@/lib/utils";

export default function PromptsPage() {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const allTags = getAllPromptTags();

  const filteredPrompts = prompts.filter((prompt) => {
    const matchesSearch =
      search === "" ||
      prompt.title.toLowerCase().includes(search.toLowerCase()) ||
      prompt.description.toLowerCase().includes(search.toLowerCase()) ||
      prompt.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));

    const matchesTag = selectedTag === null || prompt.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Prompts</h1>
        <p className="text-muted-foreground">
          CLAUDE.md templates to customize Claude Code for your projects
        </p>
      </div>

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
    </div>
  );
}
