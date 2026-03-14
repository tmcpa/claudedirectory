"use client";

import { useState } from "react";
import Link from "next/link";
import { BlogCard } from "@/components/cards/blog-card";
import { Search } from "@/components/search";
import { Badge } from "@/components/ui/badge";
import { blogPosts, getAllBlogPostTags } from "@/data/blog";

export function BlogListing() {
  const [search, setSearch] = useState("");
  const allTags = getAllBlogPostTags();

  const filteredPosts = blogPosts.filter((post) => {
    return (
      search === "" ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.description.toLowerCase().includes(search.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(search.toLowerCase())
      )
    );
  });

  return (
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
          {allTags.map((tag) => (
            <Link key={tag} href={`/blog/topic/${tag}`}>
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
  );
}
