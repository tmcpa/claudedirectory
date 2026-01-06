export interface Author {
  name: string;
  url?: string;
  avatar?: string;
}

export interface Prompt {
  slug: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  author: Author;
  featured?: boolean;
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
}

export interface Skill {
  slug: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  author: Author;
  featured?: boolean;
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
}

export type ContentItem = Prompt | MCPServer | Hook | Skill | Plugin | HowTo | Agent;
