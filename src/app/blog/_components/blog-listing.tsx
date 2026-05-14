"use client";

import { useState } from "react";
import { BlogCard } from "@/components/cards/blog-card";
import { Search } from "@/components/search";
import { TopicTags } from "@/components/topic-tags";
import { blogPosts } from "@/data/blog";

export function BlogListing() {
  const [search, setSearch] = useState("");

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

      <TopicTags items={blogPosts} hrefPrefix="/blog/topic" label="Topic" />

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
