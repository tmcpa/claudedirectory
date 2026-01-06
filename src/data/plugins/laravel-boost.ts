import { Plugin } from "@/lib/types";

export const laravelBoostPlugin: Plugin = {
  slug: "laravel-boost",
  title: "Laravel Boost",
  description: "Laravel development toolkit MCP server. Intelligent assistance for Laravel applications including Artisan commands, Eloquent queries, routing, migrations, and framework-specific code generation.",
  tags: ["laravel", "php", "framework", "backend", "official"],
  featured: false,
  author: {
    name: "Laravel",
    url: "https://laravel.com",
  },
  installCommand: "claude plugins add laravel-boost@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "laravel-boost@claude-plugins-official": true
  }
}`,
  repoUrl: "https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/laravel-boost",
};
