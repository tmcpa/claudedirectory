import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Prompt } from "@/lib/types";
import { FileText } from "lucide-react";

interface PromptCardProps {
  prompt: Prompt;
}

export function PromptCard({ prompt }: PromptCardProps) {
  return (
    <Link href={`/prompts/${prompt.slug}`}>
      <Card className="h-full hover:bg-accent/50 transition-colors cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-lg">{prompt.title}</CardTitle>
            </div>
          </div>
          <CardDescription className="line-clamp-2">
            {prompt.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1">
            {prompt.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {prompt.tags.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{prompt.tags.length - 4}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
