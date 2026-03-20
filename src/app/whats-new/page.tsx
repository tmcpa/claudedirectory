import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CollectionPageJsonLd } from "@/components/json-ld";
import { RecentItemCard } from "@/components/cards/recent-item-card";
import { getRecentlyAdded } from "@/data/recently-added";
import { ArrowLeft, Clock, Rss } from "lucide-react";
import { BASE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "What's New - Latest Claude Code Configurations",
  description:
    "See the latest prompts, MCP servers, hooks, skills, plugins, and agents added to Claude Directory. Stay up to date with new Claude Code configurations.",
  keywords: [
    "claude code new",
    "claude code updates",
    "new mcp servers",
    "new claude code plugins",
    "claude code changelog",
  ],
  openGraph: {
    title: "What's New - Latest Claude Code Configurations",
    description:
      "See the latest prompts, MCP servers, hooks, skills, plugins, and agents added to Claude Directory.",
    url: `${BASE_URL}/whats-new`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "What's New - Latest Claude Code Configurations",
    description:
      "See the latest prompts, MCP servers, hooks, skills, plugins, and agents added to Claude Directory.",
  },
  alternates: {
    canonical: `${BASE_URL}/whats-new`,
  },
};

export default function WhatsNewPage() {
  const recentlyAdded = getRecentlyAdded(50);

  return (
    <div className="container py-8 max-w-4xl">
      <CollectionPageJsonLd
        name="What's New on Claude Directory"
        description="Latest prompts, MCP servers, hooks, skills, plugins, and agents added to Claude Directory."
        url={`${BASE_URL}/whats-new`}
        itemCount={recentlyAdded.length}
      />

      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="h-6 w-6 text-muted-foreground" />
            <h1 className="text-3xl font-bold">What&apos;s New</h1>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/feed.xml">
              <Rss className="mr-2 h-4 w-4" />
              RSS Feed
            </Link>
          </Button>
        </div>
        <p className="text-muted-foreground mt-3 leading-relaxed">
          The latest additions to Claude Directory. Subscribe to the RSS feed to get notified
          when new prompts, MCP servers, skills, plugins, hooks, and agents are added.
        </p>
      </div>

      {recentlyAdded.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentlyAdded.map((recent) => (
            <RecentItemCard
              key={`${recent.type}-${recent.item.slug}`}
              item={recent.item}
              type={recent.type}
              dateAdded={recent.dateAdded}
            />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-12">
          No recent additions yet. Check back soon!
        </p>
      )}
    </div>
  );
}
