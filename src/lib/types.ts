export interface Author {
  name: string;
  url?: string;
  avatar?: string;
}

export type ContentType = "prompt" | "mcp-server" | "hook" | "skill" | "plugin" | "agent" | "how-to" | "blog";

export type RelationshipType =
  | "contains"      // Plugin contains agents/skills
  | "part-of"       // Agent/skill is part of plugin
  | "requires"      // Needs this to work
  | "recommends"    // Works better with this
  | "documented-by" // Has tutorial/guide
  | "works-with";   // Complementary items

export interface RelatedItem {
  type: ContentType;
  slug: string;
  relationship?: RelationshipType;
}

export interface Prompt {
  slug: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  author: Author;
  featured?: boolean;
  relatedItems?: RelatedItem[];
  repoUrl?: string;
}

export interface MCPServer {
  slug: string;
  title: string;
  description: string;
  config: string;
  installCommand?: string;
  tags: string[];
  author: Author;
  featured?: boolean;
  relatedItems?: RelatedItem[];
  repoUrl?: string;
}

export interface Hook {
  slug: string;
  title: string;
  description: string;
  event: "PreToolUse" | "PostToolUse" | "Notification" | "Stop";
  matcher?: string;
  script: string;
  tags: string[];
  author: Author;
  featured?: boolean;
  relatedItems?: RelatedItem[];
  repoUrl?: string;
}

export interface Skill {
  slug: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  author: Author;
  featured?: boolean;
  relatedItems?: RelatedItem[];
  repoUrl?: string;
}

export interface Plugin {
  slug: string;
  title: string;
  description: string;
  installCommand: string;
  config?: string;
  tags: string[];
  author: Author;
  featured?: boolean;
  relatedItems?: RelatedItem[];
  commands?: { name: string; description: string }[];
  repoUrl?: string;
}

export interface HowTo {
  slug: string;
  title: string;
  description: string;
  content: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  timeToComplete: string;
  tags: string[];
  author: Author;
  featured?: boolean;
  relatedItems?: RelatedItem[];
  repoUrl?: string;
}

export interface Agent {
  slug: string;
  title: string;
  description: string;
  content: string;
  category: "development" | "data-ai" | "infrastructure" | "quality-testing" | "security" | "business" | "specialization";
  tags: string[];
  author: Author;
  featured?: boolean;
  relatedItems?: RelatedItem[];
  repoUrl?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  publishedDate: string;
  tags: string[];
  author: Author;
  featured?: boolean;
  relatedItems?: RelatedItem[];
  repoUrl?: string;
}

export type ContentItem = Prompt | MCPServer | Hook | Skill | Plugin | HowTo | Agent | BlogPost;
