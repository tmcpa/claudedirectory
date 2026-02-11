import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContentType, ContentItem } from "@/lib/types";
import { FileText, Server, Webhook, Zap, Puzzle, BookOpen, Bot, Newspaper } from "lucide-react";

const typeConfig: Record<ContentType, { label: string; icon: typeof FileText; href: string }> = {
  prompt: { label: "Prompt", icon: FileText, href: "/prompts" },
  "mcp-server": { label: "MCP Server", icon: Server, href: "/mcp-servers" },
  hook: { label: "Hook", icon: Webhook, href: "/hooks" },
  skill: { label: "Skill", icon: Zap, href: "/skills" },
  plugin: { label: "Plugin", icon: Puzzle, href: "/plugins" },
  "how-to": { label: "Guide", icon: BookOpen, href: "/how-to" },
  agent: { label: "Agent", icon: Bot, href: "/agents" },
  blog: { label: "Blog", icon: Newspaper, href: "/blog" },
};

interface RecentItemCardProps {
  item: ContentItem;
  type: ContentType;
  dateAdded: string;
}

export function RecentItemCard({ item, type, dateAdded }: RecentItemCardProps) {
  const config = typeConfig[type];
  const Icon = config.icon;
  const href = `${config.href}/${item.slug}`;

  return (
    <Link href={href}>
      <Card className="h-full hover:bg-accent/50 transition-colors cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Icon className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-lg">{item.title}</CardTitle>
            </div>
            <Badge variant="outline" className="text-xs shrink-0">
              {config.label}
            </Badge>
          </div>
          <CardDescription className="line-clamp-2">
            {item.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {item.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {item.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{item.tags.length - 3}
                </Badge>
              )}
            </div>
            <span className="text-xs text-muted-foreground shrink-0 ml-2">
              {new Date(dateAdded).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
