import { Plugin } from "@/lib/types";

export const openapiExpertPlugin: Plugin = {
  slug: "openapi-expert",
  title: "OpenAPI Expert",
  description: "Update, synchronize, or validate the OpenAPI specification against the actual REST API implementation",
  tags: ["openapi", "swagger", "api", "documentation", "community"],
  featured: false,
  author: {
    name: "Meiring de Wet",
    url: "https://github.com/ccplugins/marketplace",
  },
  repoUrl: "https://github.com/ccplugins/marketplace/tree/main/plugins/openapi-expert",
  installCommand: "claude plugins:add ccplugins/marketplace/plugins/openapi-expert",
};
