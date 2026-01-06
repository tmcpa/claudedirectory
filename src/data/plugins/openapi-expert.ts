import { Plugin } from "@/lib/types";

export const openapiExpertPlugin: Plugin = {
  slug: "openapi-expert",
  title: "OpenAPI Expert",
  description: "Generate, validate, and work with OpenAPI/Swagger specifications for API development",
  tags: ["openapi", "swagger", "api", "documentation", "community"],
  featured: false,
  author: {
    name: "Community",
    url: "https://github.com/ccplugins",
  },
  repoUrl: "https://github.com/ccplugins/openapi-expert",
  installCommand: "npx claude-plugins install openapi-expert",
  config: `{
  "enabledPlugins": {
    "openapi-expert": true
  }
}`,
  commands: [
    { name: "/openapi", description: "Generate OpenAPI spec from code" },
    { name: "/validate-api", description: "Validate OpenAPI specification" },
    { name: "/mock-api", description: "Generate mock server from spec" },
  ],
  relatedItems: [
    { type: "mcp-server", slug: "apidog", relationship: "works-with" },
  ],
};
