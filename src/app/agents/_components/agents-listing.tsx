"use client";

import { useState } from "react";
import Link from "next/link";
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

export function AgentsListing() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Agent["category"] | null>(null);
  const allTags = getAllAgentTags();
  const allCategories = getAllAgentCategories();

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      search === "" ||
      agent.title.toLowerCase().includes(search.toLowerCase()) ||
      agent.description.toLowerCase().includes(search.toLowerCase()) ||
      agent.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory = selectedCategory === null || agent.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
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
            {allTags.map((tag) => (
              <Link key={tag} href={`/agents/topic/${tag}`}>
                <Badge
                  variant="secondary"
                  className="cursor-pointer hover:bg-accent"
                >
                  {tag}
                </Badge>
              </Link>
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
  );
}
