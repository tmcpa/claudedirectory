"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MCPCard } from "@/components/cards/mcp-card";
import { Search } from "@/components/search";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mcpServers, getAllMCPServerTags } from "@/data/mcp-servers";
import {
  INITIAL_DISPLAY_COUNT,
  SHOW_MORE_INCREMENT,
  MAX_SEARCH_RESULTS,
  sortListingItems,
} from "@/lib/listing";

export function MCPServersListing() {
  const [search, setSearch] = useState("");
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);
  const allTags = getAllMCPServerTags();

  const sortedServers = useMemo(() => sortListingItems(mcpServers), []);

  const filteredServers = useMemo(() => {
    if (search === "") return sortedServers;
    const q = search.toLowerCase();
    return sortedServers.filter(
      (server) =>
        server.title.toLowerCase().includes(q) ||
        server.description.toLowerCase().includes(q) ||
        server.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [search, sortedServers]);

  const isSearching = search !== "";
  const cap = isSearching ? MAX_SEARCH_RESULTS : displayCount;
  const visibleServers = filteredServers.slice(0, cap);
  const hiddenCount = filteredServers.length - visibleServers.length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:max-w-xs">
          <Search
            placeholder="Search MCP servers..."
            value={search}
            onChange={(v) => {
              setSearch(v);
              setDisplayCount(INITIAL_DISPLAY_COUNT);
            }}
          />
        </div>
        <div className="text-sm text-muted-foreground self-center">
          {isSearching
            ? `${filteredServers.length} match${filteredServers.length === 1 ? "" : "es"}`
            : `${mcpServers.length} servers total`}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <Link key={tag} href={`/mcp-servers/topic/${tag}`}>
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
        {visibleServers.map((server) => (
          <MCPCard key={server.slug} server={server} />
        ))}
      </div>

      {filteredServers.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No MCP servers found matching your criteria
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
          Showing first {visibleServers.length} of {filteredServers.length} matches.
          Refine your search or browse by topic.
        </div>
      )}
    </div>
  );
}
