import { Plugin } from "@/lib/types";

export const i18nManagerPlugin: Plugin = {
  slug: "i18n-manager",
  title: "i18n Manager",
  description: "Manage internationalization workflows including extracting translatable strings, syncing locale files, and detecting missing translations",
  tags: ["i18n", "localization", "translations", "globalization", "community"],
  featured: false,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  installCommand: "claude plugins add i18n-manager",
  commands: [
    { name: "/i18n:extract", description: "Extract hardcoded strings into translation keys" },
    { name: "/i18n:sync", description: "Find missing translations across locale files" },
    { name: "/i18n:add", description: "Add a new locale with auto-translated defaults" },
  ],
};
