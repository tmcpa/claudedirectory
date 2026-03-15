import { Plugin } from "@/lib/types";

export const mongodbPlugin: Plugin = {
  slug: "mongodb",
  title: "MongoDB",
  description: "Query MongoDB collections, inspect schemas, build aggregation pipelines, and manage indexes with natural language from Claude Code",
  tags: ["database", "mongodb", "nosql", "data", "external"],
  featured: false,
  author: {
    name: "MongoDB",
    url: "https://github.com/mongodb",
  },
  installCommand: "claude plugins add @mongodb/claude-plugin",
  commands: [
    { name: "/mongo:query", description: "Run queries against a MongoDB collection" },
    { name: "/mongo:schema", description: "Infer and display collection schemas" },
    { name: "/mongo:aggregate", description: "Build and test aggregation pipelines" },
  ],
};
