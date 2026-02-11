import { BlogPost } from "@/lib/types";
import { clawdbotOpenclawGuide } from "./clawdbot-openclaw-guide";

export const blogPosts: BlogPost[] = [
  clawdbotOpenclawGuide,
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return blogPosts.filter((p) => p.featured);
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter((p) => p.tags.includes(tag));
}

export function getAllBlogPostTags(): string[] {
  const tags = new Set<string>();
  blogPosts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}
