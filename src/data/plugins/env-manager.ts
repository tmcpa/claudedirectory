import { Plugin } from "@/lib/types";

export const envManagerPlugin: Plugin = {
  slug: "env-manager",
  title: "Env Manager",
  description: "Manage environment variables across .env files with validation, secret detection, sync across environments, and .env.example generation",
  tags: ["env", "configuration", "secrets", "dotenv", "community"],
  featured: false,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  installCommand: "claude plugins add env-manager",
  commands: [
    { name: "/env:validate", description: "Validate .env files against .env.example" },
    { name: "/env:sync", description: "Sync environment variables across .env files" },
    { name: "/env:example", description: "Generate .env.example from current .env files" },
    { name: "/env:secrets", description: "Detect accidentally committed secrets" },
  ],
};
