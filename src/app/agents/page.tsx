import type { Metadata } from "next";
import { CollectionPageJsonLd } from "@/components/json-ld";
import { agents } from "@/data/agents";
import { AgentsListing } from "./_components/agents-listing";
import { BASE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Claude Code Agents - Specialized Subagents for Any Task",
  description:
    "20+ specialized Claude Code agent configs for development, security, DevOps, testing, and data. Give Claude Code deep domain expertise with copy-paste subagent configurations.",
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
      <CollectionPageJsonLd
        name="Claude Code Agents"
        description="Specialized subagent configurations that give Claude Code deep expertise in specific domains."
        url={`${BASE_URL}/agents`}
        itemCount={agents.length}
      />
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
