import Link from "next/link";
import { Terminal, Rss } from "lucide-react";
import { NewsletterSignup } from "@/components/newsletter-signup";

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-8">
      <div className="container">
        <div className="mb-10 flex flex-col gap-3 rounded-lg border bg-card/40 p-5 md:flex-row md:items-center md:justify-between">
          <div className="md:max-w-sm">
            <h3 className="text-sm font-semibold">Get the weekly digest</h3>
            <p className="text-xs text-muted-foreground">
              The best new Claude Code prompts, MCP servers, and skills — every week.
            </p>
          </div>
          <NewsletterSignup
            source="footer"
            className="md:w-[420px]"
            buttonLabel="Subscribe"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-sm mb-3">Browse</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/prompts" className="hover:text-foreground transition-colors">
                  Prompts
                </Link>
              </li>
              <li>
                <Link href="/mcp-servers" className="hover:text-foreground transition-colors">
                  MCP Servers
                </Link>
              </li>
              <li>
                <Link href="/skills" className="hover:text-foreground transition-colors">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="/plugins" className="hover:text-foreground transition-colors">
                  Plugins
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">More</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/hooks" className="hover:text-foreground transition-colors">
                  Hooks
                </Link>
              </li>
              <li>
                <Link href="/agents" className="hover:text-foreground transition-colors">
                  Agents
                </Link>
              </li>
              <li>
                <Link href="/how-to" className="hover:text-foreground transition-colors">
                  How-To Guides
                </Link>
              </li>
              <li>
                <Link href="/whats-new" className="hover:text-foreground transition-colors">
                  What&apos;s New
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">Learn</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/blog" className="hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="https://code.claude.com/docs/en/overview"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Claude Code Docs
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/tmcpa/claudedirectory/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Contributing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">Connect</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="https://github.com/tmcpa/claudedirectory"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="https://anthropic.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Anthropic
                </Link>
              </li>
              <li>
                <Link
                  href="/feed.xml"
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  <Rss className="h-3 w-3" />
                  RSS Feed
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/40 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Terminal className="h-4 w-4" />
            <span>Claude Directory</span>
          </div>
          <p className="text-xs text-muted-foreground/70">
            This site is not affiliated with, endorsed by, or sponsored by Anthropic.
          </p>
        </div>
      </div>
    </footer>
  );
}
