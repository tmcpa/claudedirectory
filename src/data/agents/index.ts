import { Agent } from "@/lib/types";
import { typescriptProAgent } from "./typescript-pro";
import { nextjsProAgent } from "./nextjs-pro";
import { reactProAgent } from "./react-pro";
import { securityAuditorAgent } from "./security-auditor";
import { codeReviewerAgent } from "./code-reviewer";
import { promptEngineerAgent } from "./prompt-engineer";
import { cloudArchitectAgent } from "./cloud-architect";
import { aiEngineerAgent } from "./ai-engineer";
import { devopsIncidentResponderAgent } from "./devops-incident-responder";
import { backendArchitectAgent } from "./backend-architect";
import { frontendDeveloperAgent } from "./frontend-developer";
import { pythonProAgent } from "./python-pro";
import { testAutomatorAgent } from "./test-automator";
import { documentationExpertAgent } from "./documentation-expert";
import { productManagerAgent } from "./product-manager";
import { debuggerAgent } from "./debugger";
import { dataEngineerAgent } from "./data-engineer";
import { deploymentEngineerAgent } from "./deployment-engineer";
// Feature Dev Plugin Agents
import { codeExplorerAgent } from "./code-explorer";
import { codeArchitectAgent } from "./code-architect";
import { fdCodeReviewerAgent } from "./fd-code-reviewer";
// Specialization Agents
import { openclawAgent } from "./openclaw";

export const agents: Agent[] = [
  typescriptProAgent,
  nextjsProAgent,
  reactProAgent,
  securityAuditorAgent,
  codeReviewerAgent,
  promptEngineerAgent,
  cloudArchitectAgent,
  aiEngineerAgent,
  devopsIncidentResponderAgent,
  backendArchitectAgent,
  frontendDeveloperAgent,
  pythonProAgent,
  testAutomatorAgent,
  documentationExpertAgent,
  productManagerAgent,
  debuggerAgent,
  dataEngineerAgent,
  deploymentEngineerAgent,
  // Feature Dev Plugin Agents
  codeExplorerAgent,
  codeArchitectAgent,
  fdCodeReviewerAgent,
  // Specialization Agents
  openclawAgent,
];

export function getAgentBySlug(slug: string): Agent | undefined {
  return agents.find((a) => a.slug === slug);
}

export function getFeaturedAgents(): Agent[] {
  return agents.filter((a) => a.featured);
}

export function getAgentsByTag(tag: string): Agent[] {
  return agents.filter((a) => a.tags.includes(tag));
}

export function getAgentsByCategory(category: Agent["category"]): Agent[] {
  return agents.filter((a) => a.category === category);
}

export function getAllAgentTags(): string[] {
  const tags = new Set<string>();
  agents.forEach((a) => a.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

export function getAllAgentCategories(): Agent["category"][] {
  const categories = new Set<Agent["category"]>();
  agents.forEach((a) => categories.add(a.category));
  return Array.from(categories).sort();
}
