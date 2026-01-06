"use client";

import { useState } from "react";
import { AgentCard } from "@/components/cards/agent-card";
import { Search } from "@/components/search";
import { Badge } from "@/components/ui/badge";
import { agents, getAllAgentTags, getAllAgentCategories } from "@/data/agents";
import { Agent } from "@/lib/types";
import { cn } from "@/lib/utils";

const categoryLabels: Record<Agent["category"], string> = {
  development: "Development",
  "data-ai": "Data & AI",
  infrastructure: "Infrastructure",
  "quality-testing": "Quality & Testing",
  security: "Security",
  business: "Business",
  specialization: "Specialization",
};

export default function AgentsPage() {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Agent["category"] | null>(null);
  const allTags = getAllAgentTags();
  const allCategories = getAllAgentCategories();

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      search === "" ||
      agent.title.toLowerCase().includes(search.toLowerCase()) ||
      agent.description.toLowerCase().includes(search.toLowerCase()) ||
      agent.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));

    const matchesTag = selectedTag === null || agent.tags.includes(selectedTag);
    const matchesCategory = selectedCategory === null || agent.category === selectedCategory;

    return matchesSearch && matchesTag && matchesCategory;
  });

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Agents</h1>
        <p className="text-muted-foreground">
          Specialized Claude Code subagents for development, testing, DevOps, and more
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:max-w-xs">
            <Search
              placeholder="Search agents..."
              value={search}
              onChange={setSearch}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Categories</p>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedCategory === null ? "default" : "secondary"}
                className={cn(
                  "cursor-pointer hover:bg-primary/80",
                  selectedCategory === null && "bg-primary"
                )}
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Badge>
              {allCategories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  className={cn(
                    "cursor-pointer",
                    selectedCategory === category
                      ? "bg-primary hover:bg-primary/80"
                      : "hover:bg-accent"
                  )}
                  onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                >
                  {categoryLabels[category]}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Tags</p>
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
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAgents.map((agent) => (
            <AgentCard key={agent.slug} agent={agent} />
          ))}
        </div>

        {filteredAgents.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No agents found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
}
