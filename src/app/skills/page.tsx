"use client";

import { useState } from "react";
import { SkillCard } from "@/components/cards/skill-card";
import { Search } from "@/components/search";
import { Badge } from "@/components/ui/badge";
import { skills, getAllSkillTags } from "@/data/skills";
import { cn } from "@/lib/utils";

export default function SkillsPage() {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const allTags = getAllSkillTags();

  const filteredSkills = skills.filter((skill) => {
    const matchesSearch =
      search === "" ||
      skill.title.toLowerCase().includes(search.toLowerCase()) ||
      skill.description.toLowerCase().includes(search.toLowerCase()) ||
      skill.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));

    const matchesTag = selectedTag === null || skill.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Skills</h1>
        <p className="text-muted-foreground">
          Custom slash commands and workflows for Claude Code
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:max-w-xs">
            <Search
              placeholder="Search skills..."
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
          {filteredSkills.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No skills found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
}
