"use client";

import { useMemo, useState } from "react";
import { PluginCard } from "@/components/cards/plugin-card";
import { Search } from "@/components/search";
import { TopicTags } from "@/components/topic-tags";
import { Button } from "@/components/ui/button";
import { plugins } from "@/data/plugins";
import {
  INITIAL_DISPLAY_COUNT,
  SHOW_MORE_INCREMENT,
  MAX_SEARCH_RESULTS,
  sortListingItems,
} from "@/lib/listing";

export function PluginsListing() {
  const [search, setSearch] = useState("");
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);

  const sortedPlugins = useMemo(() => sortListingItems(plugins), []);

  const filteredPlugins = useMemo(() => {
    if (search === "") return sortedPlugins;
    const q = search.toLowerCase();
    return sortedPlugins.filter(
      (plugin) =>
        plugin.title.toLowerCase().includes(q) ||
        plugin.description.toLowerCase().includes(q) ||
        plugin.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [search, sortedPlugins]);

  const isSearching = search !== "";
  const cap = isSearching ? MAX_SEARCH_RESULTS : displayCount;
  const visiblePlugins = filteredPlugins.slice(0, cap);
  const hiddenCount = filteredPlugins.length - visiblePlugins.length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:max-w-xs">
          <Search
            placeholder="Search plugins..."
            value={search}
            onChange={(v) => {
              setSearch(v);
              setDisplayCount(INITIAL_DISPLAY_COUNT);
            }}
          />
        </div>
        <div className="text-sm text-muted-foreground self-center">
          {isSearching
            ? `${filteredPlugins.length} match${filteredPlugins.length === 1 ? "" : "es"}`
            : `${plugins.length} plugins total`}
        </div>
      </div>

      <TopicTags items={plugins} hrefPrefix="/plugins/topic" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visiblePlugins.map((plugin) => (
          <PluginCard key={plugin.slug} plugin={plugin} />
        ))}
      </div>

      {filteredPlugins.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No plugins found matching your criteria
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
          Showing first {visiblePlugins.length} of {filteredPlugins.length} matches.
          Refine your search or browse by topic.
        </div>
      )}
    </div>
  );
}
