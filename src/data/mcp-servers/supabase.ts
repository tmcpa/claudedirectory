import { MCPServer } from "@/lib/types";

export const supabaseServer: MCPServer = {
  slug: "supabase",
  title: "Supabase Server",
  description: "Interact with Supabase databases, authentication, storage, and edge functions through natural language",
  tags: ["database", "supabase", "postgres", "auth", "storage", "community"],
  featured: true,
  author: {
    name: "Supabase Community",
    url: "https://github.com/supabase-community",
  },
  installCommand: "npm install -g @supabase/mcp-server",
  config: `{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server"],
      "env": {
        "SUPABASE_URL": "your-supabase-url",
        "SUPABASE_SERVICE_ROLE_KEY": "your-service-role-key"
      }
    }
  }
}`,
};
