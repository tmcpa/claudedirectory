import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Hook } from "@/lib/types";
import { Webhook } from "lucide-react";

interface HookCardProps {
  hook: Hook;
}

export function HookCard({ hook }: HookCardProps) {
  return (
    <Link href={`/hooks/${hook.slug}`}>
      <Card className="h-full hover:bg-accent/50 transition-colors cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Webhook className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-lg">{hook.title}</CardTitle>
            </div>
            <Badge variant="outline" className="text-xs">
              {hook.event}
            </Badge>
          </div>
          <CardDescription className="line-clamp-2">
            {hook.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1">
            {hook.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {hook.tags.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{hook.tags.length - 4}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
