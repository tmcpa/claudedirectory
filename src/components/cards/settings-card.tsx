import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SettingsExample } from "@/lib/types";
import { Settings } from "lucide-react";

interface SettingsCardProps {
  settings: SettingsExample;
}

export function SettingsCard({ settings }: SettingsCardProps) {
  return (
    <Link href={`/settings#${settings.slug}`}>
      <Card className="h-full hover:bg-accent/50 transition-colors cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-lg">{settings.title}</CardTitle>
            </div>
          </div>
          <CardDescription className="line-clamp-2">
            {settings.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1">
            {settings.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {settings.tags.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{settings.tags.length - 4}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
