"use client";

import { useState } from "react";
import Link from "next/link";
import { PluginCard } from "@/components/cards/plugin-card";
import { Search } from "@/components/search";
import { Badge } from "@/components/ui/badge";
import { plugins, getAllPluginTags } from "@/data/plugins";

export function PluginsListing() {
  const [search, setSearch] = useState("");
  const allTags = getAllPluginTags();

  const filteredPlugins = plugins.filter((plugin) => {
    return (
      search === "" ||
      plugin.title.toLowerCase().includes(search.toLowerCase()) ||
      plugin.description.toLowerCase().includes(search.toLowerCase()) ||
      plugin.tags.some((tag) =>
        tag.toLowerCase().includes(search.toLowerCase())
      )
    );
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:max-w-xs">
          <Search
            placeholder="Search plugins..."
            value={search}
            onChange={setSearch}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <Link key={tag} href={`/plugins/topic/${tag}`}>
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
        {filteredPlugins.map((plugin) => (
          <PluginCard key={plugin.slug} plugin={plugin} />
        ))}
      </div>

      {filteredPlugins.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No plugins found matching your criteria
        </div>
      )}
    </div>
  );
}
