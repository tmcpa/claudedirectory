"use client";

import { useState } from "react";
import { BlogCard } from "@/components/cards/blog-card";
import { Search } from "@/components/search";
import { Badge } from "@/components/ui/badge";
import { blogPosts, getAllBlogPostTags } from "@/data/blog";
import { cn } from "@/lib/utils";

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const allTags = getAllBlogPostTags();

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      search === "" ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.description.toLowerCase().includes(search.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));

    const matchesTag = selectedTag === null || post.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Blog</h1>
        <p className="text-muted-foreground">
          News, guides, and insights about Claude Code and the AI development ecosystem
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:max-w-xs">
            <Search
              placeholder="Search posts..."
              value={search}
              onChange={setSearch}
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground mr-2">Topic:</span>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No posts found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
}
