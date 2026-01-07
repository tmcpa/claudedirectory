import { Plugin } from "@/lib/types";

export const supabasePlugin: Plugin = {
  slug: "supabase",
  title: "Supabase",
  description: "Supabase backend integration. Database operations, authentication, storage, real-time subscriptions, project management, and SQL query execution directly from Claude Code.",
  tags: ["database", "backend", "authentication", "integration", "official"],
  featured: true,
  author: {
    name: "Supabase",
    url: "https://supabase.com",
  },
  installCommand: "claude plugins add supabase@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "supabase@claude-plugins-official": true
  }
}`,
  repoUrl: "https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/supabase",
  commands: [
    { name: "/supabase-query", description: "Execute SQL queries on your Supabase database" },
    { name: "/supabase-migrate", description: "Create and run database migrations" },
    { name: "/supabase-auth", description: "Manage authentication and users" },
    { name: "/supabase-storage", description: "Manage file storage buckets" },
    { name: "/supabase-functions", description: "Deploy and manage edge functions" },
  ],
  relatedItems: [
    { type: "mcp-server", slug: "supabase", relationship: "requires" },
  ],
};
