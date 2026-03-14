"use client";

import { useState } from "react";
import Link from "next/link";
import { SkillCard } from "@/components/cards/skill-card";
import { Search } from "@/components/search";
import { Badge } from "@/components/ui/badge";
import { skills, getAllSkillTags } from "@/data/skills";

export function SkillsListing() {
  const [search, setSearch] = useState("");
  const allTags = getAllSkillTags();

  const filteredSkills = skills.filter((skill) => {
    return (
      search === "" ||
      skill.title.toLowerCase().includes(search.toLowerCase()) ||
      skill.description.toLowerCase().includes(search.toLowerCase()) ||
      skill.tags.some((tag) =>
        tag.toLowerCase().includes(search.toLowerCase())
      )
    );
  });

  return (
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
        {allTags.map((tag) => (
          <Link key={tag} href={`/skills/topic/${tag}`}>
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
  );
}
