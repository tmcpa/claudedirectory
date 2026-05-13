import { Plugin } from "@/lib/types";

export const prismaPlugin: Plugin = {
  slug: "prisma",
  title: "Prisma",
  description: "Prisma ORM integration for database management. Generate schemas, run migrations, explore data with Prisma Studio, and manage database workflows.",
  tags: ["database", "orm", "typescript", "official"],
  featured: false,
  author: {
    name: "Prisma",
    url: "https://prisma.io",
  },
  repoUrl: "https://github.com/anthropics/claude-plugins-official",
  installCommand: "/plugin install prisma@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "prisma@claude-plugins-official": true
  }
}`,
  commands: [
    { name: "/prisma-migrate", description: "Create and run database migrations" },
    { name: "/prisma-generate", description: "Generate Prisma client" },
    { name: "/prisma-studio", description: "Open Prisma Studio for data exploration" },
    { name: "/prisma-seed", description: "Seed database with data" },
  ],
};
