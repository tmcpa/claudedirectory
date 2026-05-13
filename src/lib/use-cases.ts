import { skills } from "@/data/skills";
import { agents } from "@/data/agents";
import { plugins } from "@/data/plugins";
import { mcpServers } from "@/data/mcp-servers";
import { prompts } from "@/data/prompts";
import { hooks } from "@/data/hooks";
import { howTos } from "@/data/how-to";
import type {
  Skill,
  Agent,
  Plugin,
  MCPServer,
  Prompt,
  Hook,
  HowTo,
} from "@/lib/types";
import { useCases, type UseCase } from "@/data/use-cases";

export interface UseCaseMatches {
  skills: Skill[];
  agents: Agent[];
  plugins: Plugin[];
  mcpServers: MCPServer[];
  prompts: Prompt[];
  hooks: Hook[];
  howTos: HowTo[];
  total: number;
}

function matches(itemTags: string[], useCaseTags: string[]): boolean {
  const set = new Set(itemTags);
  return useCaseTags.some((t) => set.has(t));
}

export function getMatchesForUseCase(useCase: UseCase): UseCaseMatches {
  const matchedSkills = skills.filter((s) => matches(s.tags, useCase.tags));
  const matchedAgents = agents.filter((a) => matches(a.tags, useCase.tags));
  const matchedPlugins = plugins.filter((p) => matches(p.tags, useCase.tags));
  const matchedMcp = mcpServers.filter((m) => matches(m.tags, useCase.tags));
  const matchedPrompts = prompts.filter((p) => matches(p.tags, useCase.tags));
  const matchedHooks = hooks.filter((h) => matches(h.tags, useCase.tags));
  const matchedHowTos = howTos.filter((h) => matches(h.tags, useCase.tags));

  return {
    skills: matchedSkills,
    agents: matchedAgents,
    plugins: matchedPlugins,
    mcpServers: matchedMcp,
    prompts: matchedPrompts,
    hooks: matchedHooks,
    howTos: matchedHowTos,
    total:
      matchedSkills.length +
      matchedAgents.length +
      matchedPlugins.length +
      matchedMcp.length +
      matchedPrompts.length +
      matchedHooks.length +
      matchedHowTos.length,
  };
}

export function getUseCasesForTag(tag: string): UseCase[] {
  return useCases.filter((u) => u.tags.includes(tag));
}

export function getUseCaseCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const uc of useCases) {
    counts[uc.slug] = getMatchesForUseCase(uc).total;
  }
  return counts;
}

type Tagged = { tags: string[] };

function intersectByTagAndUseCase<T extends Tagged>(
  items: T[],
  tag: string,
  useCase: UseCase,
): T[] {
  const ucSet = new Set(useCase.tags);
  return items.filter(
    (item) => item.tags.includes(tag) && item.tags.some((t) => ucSet.has(t)),
  );
}

export function getSkillsForTagAndUseCase(tag: string, useCase: UseCase): Skill[] {
  return intersectByTagAndUseCase(skills, tag, useCase);
}
export function getAgentsForTagAndUseCase(tag: string, useCase: UseCase): Agent[] {
  return intersectByTagAndUseCase(agents, tag, useCase);
}
export function getPluginsForTagAndUseCase(tag: string, useCase: UseCase): Plugin[] {
  return intersectByTagAndUseCase(plugins, tag, useCase);
}
export function getMcpServersForTagAndUseCase(tag: string, useCase: UseCase): MCPServer[] {
  return intersectByTagAndUseCase(mcpServers, tag, useCase);
}
export function getPromptsForTagAndUseCase(tag: string, useCase: UseCase): Prompt[] {
  return intersectByTagAndUseCase(prompts, tag, useCase);
}
export function getHooksForTagAndUseCase(tag: string, useCase: UseCase): Hook[] {
  return intersectByTagAndUseCase(hooks, tag, useCase);
}
export function getHowTosForTagAndUseCase(tag: string, useCase: UseCase): HowTo[] {
  return intersectByTagAndUseCase(howTos, tag, useCase);
}

export type CrossPageType =
  | "skills"
  | "agents"
  | "plugins"
  | "mcp-servers"
  | "prompts"
  | "hooks"
  | "how-to";

const collectionForType: Record<CrossPageType, Tagged[]> = {
  skills,
  agents,
  plugins,
  "mcp-servers": mcpServers,
  prompts,
  hooks,
  "how-to": howTos,
};

export function getCrossPageParams(
  type: CrossPageType,
): Array<{ tag: string; useCase: string }> {
  const collection = collectionForType[type];
  const tags = new Set<string>();
  for (const item of collection) for (const t of item.tags) tags.add(t);

  const params: Array<{ tag: string; useCase: string }> = [];
  for (const tag of tags) {
    for (const uc of useCases) {
      const matches = intersectByTagAndUseCase(collection, tag, uc);
      if (matches.length > 0) {
        params.push({ tag, useCase: uc.slug });
      }
    }
  }
  return params;
}
