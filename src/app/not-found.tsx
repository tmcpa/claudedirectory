import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BlogCard } from "@/components/cards/blog-card";
import { UniversalSearch } from "@/components/universal-search";
import { getFeaturedBlogPosts } from "@/data/blog";
import {
  Home,
  FileText,
  Server,
  Webhook,
  Zap,
  Puzzle,
  BookOpen,
  Bot,
  Newspaper,
  ArrowRight,
} from "lucide-react";

const sections = [
  { name: "Prompts", description: "CLAUDE.md templates", href: "/prompts", icon: FileText },
  { name: "MCP Servers", description: "Protocol integrations", href: "/mcp-servers", icon: Server },
  { name: "Hooks", description: "Tool-use automation", href: "/hooks", icon: Webhook },
  { name: "Skills", description: "Custom slash commands", href: "/skills", icon: Zap },
  { name: "Plugins", description: "Extend functionality", href: "/plugins", icon: Puzzle },
  { name: "Agents", description: "Specialized subagents", href: "/agents", icon: Bot },
  { name: "How To", description: "Tutorials and guides", href: "/how-to", icon: BookOpen },
  { name: "Blog", description: "News and insights", href: "/blog", icon: Newspaper },
];

export default function NotFound() {
  const recentPosts = getFeaturedBlogPosts().slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero / Message */}
      <section className="container py-20 md:py-28">
        <div className="mx-auto flex max-w-[700px] flex-col items-center gap-4 text-center">
          <p className="text-7xl font-bold tracking-tight sm:text-8xl md:text-9xl text-muted-foreground/30">
            404
          </p>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Page not found
          </h1>
          <p className="max-w-[500px] text-muted-foreground text-lg">
            The page you&apos;re looking for doesn&apos;t exist or may have moved.
            Try searching for what you need below.
          </p>

          <div className="w-full mt-6">
            <UniversalSearch />
          </div>

          <Button asChild size="lg" variant="outline" className="mt-4">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </section>

      {/* Browse Sections */}
      <section className="container py-12 border-t">
        <h2 className="text-xl font-bold mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {sections.map((section) => (
            <Link key={section.href} href={section.href}>
              <Card className="h-full hover:bg-accent/50 transition-colors cursor-pointer">
                <CardHeader className="p-4">
                  <section.icon className="h-6 w-6 mb-1.5 text-muted-foreground" />
                  <CardTitle className="text-base">{section.name}</CardTitle>
                  <CardDescription className="text-xs">
                    {section.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Blog Posts */}
      {recentPosts.length > 0 && (
        <section className="container py-12 border-t">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Popular from the Blog</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/blog">
                View all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
