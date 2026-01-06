"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, Server, Webhook, Zap, Settings } from "lucide-react";
import { prompts } from "@/data/prompts";
import { mcpServers } from "@/data/mcp-servers";
import { hooks } from "@/data/hooks";
import { skills } from "@/data/skills";
import { settingsExamples } from "@/data/settings";
import { cn } from "@/lib/utils";

interface SearchResult {
  type: "prompt" | "mcp-server" | "hook" | "skill" | "setting";
  slug: string;
  title: string;
  description: string;
  tags: string[];
}

const typeConfig = {
  prompt: { icon: FileText, label: "Prompt", href: "/prompts", color: "text-blue-500" },
  "mcp-server": { icon: Server, label: "MCP Server", href: "/mcp-servers", color: "text-green-500" },
  hook: { icon: Webhook, label: "Hook", href: "/hooks", color: "text-orange-500" },
  skill: { icon: Zap, label: "Skill", href: "/skills", color: "text-purple-500" },
  setting: { icon: Settings, label: "Setting", href: "/settings", color: "text-gray-500" },
};

export function UniversalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const searchQuery = query.toLowerCase();
    const allResults: SearchResult[] = [];

    // Search prompts
    prompts.forEach((p) => {
      if (
        p.title.toLowerCase().includes(searchQuery) ||
        p.description.toLowerCase().includes(searchQuery) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery))
      ) {
        allResults.push({
          type: "prompt",
          slug: p.slug,
          title: p.title,
          description: p.description,
          tags: p.tags,
        });
      }
    });

    // Search MCP servers
    mcpServers.forEach((s) => {
      if (
        s.title.toLowerCase().includes(searchQuery) ||
        s.description.toLowerCase().includes(searchQuery) ||
        s.tags.some((t) => t.toLowerCase().includes(searchQuery))
      ) {
        allResults.push({
          type: "mcp-server",
          slug: s.slug,
          title: s.title,
          description: s.description,
          tags: s.tags,
        });
      }
    });

    // Search hooks
    hooks.forEach((h) => {
      if (
        h.title.toLowerCase().includes(searchQuery) ||
        h.description.toLowerCase().includes(searchQuery) ||
        h.tags.some((t) => t.toLowerCase().includes(searchQuery))
      ) {
        allResults.push({
          type: "hook",
          slug: h.slug,
          title: h.title,
          description: h.description,
          tags: h.tags,
        });
      }
    });

    // Search skills
    skills.forEach((s) => {
      if (
        s.title.toLowerCase().includes(searchQuery) ||
        s.description.toLowerCase().includes(searchQuery) ||
        s.tags.some((t) => t.toLowerCase().includes(searchQuery))
      ) {
        allResults.push({
          type: "skill",
          slug: s.slug,
          title: s.title,
          description: s.description,
          tags: s.tags,
        });
      }
    });

    // Search settings
    settingsExamples.forEach((s) => {
      if (
        s.title.toLowerCase().includes(searchQuery) ||
        s.description.toLowerCase().includes(searchQuery) ||
        s.tags.some((t) => t.toLowerCase().includes(searchQuery))
      ) {
        allResults.push({
          type: "setting",
          slug: s.slug,
          title: s.title,
          description: s.description,
          tags: s.tags,
        });
      }
    });

    setResults(allResults.slice(0, 10));
    setIsOpen(allResults.length > 0);
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((i) => (i < results.length - 1 ? i + 1 : i));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((i) => (i > 0 ? i - 1 : i));
        break;
      case "Enter":
        e.preventDefault();
        if (results[selectedIndex]) {
          const result = results[selectedIndex];
          const config = typeConfig[result.type];
          const href = result.type === "setting"
            ? `${config.href}#${result.slug}`
            : `${config.href}/${result.slug}`;
          window.location.href = href;
        }
        break;
      case "Escape":
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const getResultHref = (result: SearchResult) => {
    const config = typeConfig[result.type];
    return result.type === "setting"
      ? `${config.href}#${result.slug}`
      : `${config.href}/${result.slug}`;
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search prompts, MCP servers, hooks, skills..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && results.length > 0 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="h-14 pl-12 pr-4 text-lg rounded-xl border-2 bg-background/80 backdrop-blur-sm"
        />
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border rounded-xl shadow-lg overflow-hidden z-50">
          <div className="p-2">
            {results.map((result, index) => {
              const config = typeConfig[result.type];
              const Icon = config.icon;

              return (
                <Link
                  key={`${result.type}-${result.slug}`}
                  href={getResultHref(result)}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg transition-colors",
                    index === selectedIndex ? "bg-accent" : "hover:bg-accent/50"
                  )}
                >
                  <div className={cn("mt-0.5", config.color)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium truncate">{result.title}</span>
                      <Badge variant="outline" className="text-xs shrink-0">
                        {config.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                      {result.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="px-4 py-2 border-t bg-muted/50 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-background border text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-background border text-[10px]">↓</kbd>
              to navigate
            </span>
            <span className="mx-2">·</span>
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-background border text-[10px]">↵</kbd>
              to select
            </span>
            <span className="mx-2">·</span>
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-background border text-[10px]">esc</kbd>
              to close
            </span>
          </div>
        </div>
      )}

      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border rounded-xl shadow-lg p-8 text-center z-50">
          <p className="text-muted-foreground">No results found for &quot;{query}&quot;</p>
        </div>
      )}
    </div>
  );
}
