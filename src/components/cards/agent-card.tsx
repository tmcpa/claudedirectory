import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Agent } from "@/lib/types";
import { Bot } from "lucide-react";

interface AgentCardProps {
  agent: Agent;
}

const categoryColors: Record<Agent["category"], string> = {
  development: "bg-blue-500/10 text-blue-500",
  "data-ai": "bg-purple-500/10 text-purple-500",
  infrastructure: "bg-green-500/10 text-green-500",
  "quality-testing": "bg-orange-500/10 text-orange-500",
  security: "bg-red-500/10 text-red-500",
  business: "bg-yellow-500/10 text-yellow-500",
  specialization: "bg-cyan-500/10 text-cyan-500",
};

const categoryLabels: Record<Agent["category"], string> = {
  development: "Development",
  "data-ai": "Data & AI",
  infrastructure: "Infrastructure",
  "quality-testing": "Quality & Testing",
  security: "Security",
  business: "Business",
  specialization: "Specialization",
};

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <Link href={`/agents/${agent.slug}`}>
      <Card className="h-full hover:bg-accent/50 transition-colors cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-lg">{agent.title}</CardTitle>
            </div>
          </div>
          <CardDescription className="line-clamp-2">
            {agent.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1">
            <Badge className={categoryColors[agent.category]} variant="secondary">
              {categoryLabels[agent.category]}
            </Badge>
            {agent.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {agent.tags.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{agent.tags.length - 2}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
