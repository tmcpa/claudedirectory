export function getCurrentMonthYear(date: Date = new Date()): string {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export const TYPE_LABELS = {
  skill: { singular: "Skill", plural: "Skills" },
  plugin: { singular: "Plugin", plural: "Plugins" },
  "mcp-server": { singular: "MCP Server", plural: "MCP Servers" },
  agent: { singular: "Agent", plural: "Agents" },
  hook: { singular: "Hook", plural: "Hooks" },
  prompt: { singular: "Prompt", plural: "Prompts" },
  "how-to": { singular: "Guide", plural: "Guides" },
  blog: { singular: "Article", plural: "Articles" },
} as const;

type ContentTypeKey = keyof typeof TYPE_LABELS;

export function topicTitle(type: ContentTypeKey, displayTag: string): string {
  const date = getCurrentMonthYear();
  const plural = TYPE_LABELS[type].plural;
  return `Best Claude Code ${plural} for ${displayTag} (${date})`;
}

export function topicDescription(
  type: ContentTypeKey,
  displayTag: string,
  count: number,
): string {
  const plural = TYPE_LABELS[type].plural;
  const singular = TYPE_LABELS[type].singular;
  return `${count} hand-picked ${plural.toLowerCase()} for ${displayTag} — copy install commands, configs, and slash commands for Claude Code. Updated ${getCurrentMonthYear()}. Find the right ${singular.toLowerCase()} for your stack.`;
}

export function buildUseCaseTitle(useCaseLabel: string): string {
  const date = getCurrentMonthYear();
  return `Best Claude Code setups for ${useCaseLabel.toLowerCase()} (${date})`;
}

export function crossPageTitle(
  type: ContentTypeKey,
  displayTag: string,
  useCaseTitleStr: string,
): string {
  const date = getCurrentMonthYear();
  const plural = TYPE_LABELS[type].plural;
  return `Best Claude Code ${plural.toLowerCase()} for ${useCaseTitleStr.toLowerCase()} on ${displayTag} (${date})`;
}

export function crossPageDescription(
  type: ContentTypeKey,
  displayTag: string,
  useCaseTitleStr: string,
  count: number,
): string {
  const plural = TYPE_LABELS[type].plural.toLowerCase();
  return `${count} curated Claude Code ${plural} that handle ${useCaseTitleStr.toLowerCase()} on ${displayTag} projects. Install commands, configs, and copy-paste setup, refreshed ${getCurrentMonthYear()}.`;
}
