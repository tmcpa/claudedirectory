import type { Metadata } from "next";
import { AgentsListing } from "./_components/agents-listing";

const BASE_URL = "https://claudedirectory.org";

export const metadata: Metadata = {
  title: "Claude Code Agents & Subagent Configurations",
  description:
    "Discover specialized Claude Code agents for development, testing, infrastructure, security, and more. Subagent configurations that give Claude Code deep domain expertise for complex tasks.",
  keywords: [
    "claude code agents",
    "claude code subagents",
    "ai agents",
    "specialized agents",
    "claude code configurations",
  ],
  openGraph: {
    title: "Claude Code Agents & Subagent Configurations",
    description:
      "Discover specialized Claude Code agents for development, testing, infrastructure, security, and more.",
    url: `${BASE_URL}/agents`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Claude Code Agents & Subagent Configurations",
    description:
      "Discover specialized Claude Code agents for development, testing, infrastructure, security, and more.",
  },
  alternates: {
    canonical: `${BASE_URL}/agents`,
  },
};

export default function AgentsPage() {
  return (
    <div className="container py-8">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Agents</h1>
        <p className="text-muted-foreground leading-relaxed">
          Focused subagent configurations that give Claude Code deep expertise in specific
          domains — from database migrations and security audits to infrastructure
          automation and data pipelines. Each agent includes the full configuration needed
          to create specialized workflows. Browse by category or tag to find the right
          agent for your task.
        </p>
      </div>

      <AgentsListing />
    </div>
  );
}
