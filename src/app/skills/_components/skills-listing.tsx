"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SkillCard } from "@/components/cards/skill-card";
import { Search } from "@/components/search";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { skills, getAllSkillTags } from "@/data/skills";
import {
  INITIAL_DISPLAY_COUNT,
  SHOW_MORE_INCREMENT,
  MAX_SEARCH_RESULTS,
  sortListingItems,
} from "@/lib/listing";

export function SkillsListing() {
  const [search, setSearch] = useState("");
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);
  const allTags = getAllSkillTags();

  const sortedSkills = useMemo(() => sortListingItems(skills), []);

  const filteredSkills = useMemo(() => {
    if (search === "") return sortedSkills;
    const q = search.toLowerCase();
    return sortedSkills.filter(
      (skill) =>
        skill.title.toLowerCase().includes(q) ||
        skill.description.toLowerCase().includes(q) ||
        skill.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [search, sortedSkills]);

  const isSearching = search !== "";
  const cap = isSearching ? MAX_SEARCH_RESULTS : displayCount;
  const visibleSkills = filteredSkills.slice(0, cap);
  const hiddenCount = filteredSkills.length - visibleSkills.length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:max-w-xs">
          <Search
            placeholder="Search skills..."
            value={search}
            onChange={(v) => {
              setSearch(v);
              setDisplayCount(INITIAL_DISPLAY_COUNT);
            }}
          />
        </div>
        <div className="text-sm text-muted-foreground self-center">
          {isSearching
            ? `${filteredSkills.length} match${filteredSkills.length === 1 ? "" : "es"}`
            : `${skills.length} skills total`}
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
        {visibleSkills.map((skill) => (
          <SkillCard key={skill.slug} skill={skill} />
        ))}
      </div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No skills found matching your criteria
        </div>
      )}

      {hiddenCount > 0 && !isSearching && (
        <div className="flex flex-col items-center gap-2 py-4">
          <Button
            variant="outline"
            onClick={() => setDisplayCount((n) => n + SHOW_MORE_INCREMENT)}
          >
            Show more ({hiddenCount} more)
          </Button>
          <p className="text-xs text-muted-foreground">
            Or browse by topic above for focused results
          </p>
        </div>
      )}

      {isSearching && hiddenCount > 0 && (
        <div className="text-center py-4 text-sm text-muted-foreground">
          Showing first {visibleSkills.length} of {filteredSkills.length} matches.
          Refine your search or browse by topic.
        </div>
      )}
    </div>
  );
}
