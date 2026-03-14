"use client";

import { useState } from "react";
import Link from "next/link";
import { MCPCard } from "@/components/cards/mcp-card";
import { Search } from "@/components/search";
import { Badge } from "@/components/ui/badge";
import { mcpServers, getAllMCPServerTags } from "@/data/mcp-servers";

export function MCPServersListing() {
  const [search, setSearch] = useState("");
  const allTags = getAllMCPServerTags();

  const filteredServers = mcpServers.filter((server) => {
    return (
      search === "" ||
      server.title.toLowerCase().includes(search.toLowerCase()) ||
      server.description.toLowerCase().includes(search.toLowerCase()) ||
      server.tags.some((tag) =>
        tag.toLowerCase().includes(search.toLowerCase())
      )
    );
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:max-w-xs">
          <Search
            placeholder="Search MCP servers..."
            value={search}
            onChange={setSearch}
          />
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
        {filteredServers.map((server) => (
          <MCPCard key={server.slug} server={server} />
        ))}
      </div>

      {filteredServers.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No MCP servers found matching your criteria
        </div>
      )}
    </div>
  );
}
