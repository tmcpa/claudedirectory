import Link from "next/link";
import { Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Terminal className="h-4 w-4" />
          <span>Claude&apos;s Codes</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link
            href="https://docs.anthropic.com/en/docs/claude-code"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Documentation
          </Link>
          <Link
            href="https://github.com/tmcpa/claudescodes"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </Link>
          <Link
            href="https://anthropic.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Anthropic
          </Link>
        </div>
      </div>
    </footer>
  );
}
