import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MCPServer } from "@/lib/types";
import { Server } from "lucide-react";

interface MCPCardProps {
  server: MCPServer;
}

export function MCPCard({ server }: MCPCardProps) {
  return (
    <Link href={`/mcp-servers/${server.slug}`}>
      <Card className="h-full hover:bg-accent/50 transition-colors cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Server className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-lg">{server.title}</CardTitle>
            </div>
          </div>
          <CardDescription className="line-clamp-2">
            {server.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1">
            {server.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {server.tags.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{server.tags.length - 4}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
