import Link from "next/link";
import type { Metadata } from "next";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CollectionPageJsonLd } from "@/components/json-ld";
import { useCases } from "@/data/use-cases";
import { getUseCaseCounts } from "@/lib/use-cases";
import { BASE_URL } from "@/lib/constants";
import { getCurrentMonthYear } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Best Claude Code setups by use case (${getCurrentMonthYear()})`,
  description:
    "Browse Claude Code configurations by what you're trying to do: code review, testing, security, deployment, debugging, databases, APIs, and more. Curated directories of skills, agents, plugins, MCP servers, and hooks for each use case.",
  keywords: [
    "claude code use cases",
    "claude code by use case",
    "claude code workflows",
    "claude code code review",
    "claude code testing",
    "claude code security",
  ],
  openGraph: {
    title: "Claude Code by Use Case",
    description:
      "Curated directories of Claude Code skills, agents, plugins, and MCP servers for every common use case.",
    url: `${BASE_URL}/for`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Claude Code by Use Case",
    description:
      "Curated directories of Claude Code skills, agents, plugins, and MCP servers for every common use case.",
  },
  alternates: { canonical: `${BASE_URL}/for` },
};

export default function UseCaseIndexPage() {
  const counts = getUseCaseCounts();

  return (
    <div className="container py-8">
      <CollectionPageJsonLd
        name="Claude Code by Use Case"
        description="Curated cross-type directories for common Claude Code workflows."
        url={`${BASE_URL}/for`}
        itemCount={useCases.length}
      />

      <div className="mb-10 max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Claude Code by Use Case</h1>
        <p className="text-muted-foreground leading-relaxed">
          Start with what you&apos;re trying to do. Each page pulls together
          skills, agents, plugins, MCP servers, prompts, hooks, and how-tos for
          a single workflow — so you can see every Claude Code configuration
          that helps with, say, code review or deployment in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {useCases.map((useCase) => (
          <Link key={useCase.slug} href={`/for/${useCase.slug}`}>
            <Card className="h-full hover:bg-accent/50 transition-colors cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">{useCase.title}</CardTitle>
                  <span className="text-xs text-muted-foreground shrink-0 pt-1">
                    {counts[useCase.slug] ?? 0} items
                  </span>
                </div>
                <CardDescription className="line-clamp-3">
                  {useCase.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
