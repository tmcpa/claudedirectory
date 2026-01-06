import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CodeBlock } from "@/components/code-block";
import { CopyButton } from "@/components/copy-button";
import { settingsExamples } from "@/data/settings";
import { Settings, User } from "lucide-react";

export const metadata = {
  title: "Settings Examples - Claude Code Directory",
  description: "Example configurations for Claude Code settings",
};

export default function SettingsPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Example configurations for your Claude Code settings.json
        </p>
      </div>

      <div className="space-y-8">
        {settingsExamples.map((settings) => (
          <Card key={settings.slug} id={settings.slug}>
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-accent">
                  <Settings className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">{settings.title}</CardTitle>
                  <CardDescription className="text-base">
                    {settings.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {settings.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>
                  By{" "}
                  {settings.author.url ? (
                    <a
                      href={settings.author.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:underline"
                    >
                      {settings.author.name}
                    </a>
                  ) : (
                    settings.author.name
                  )}
                </span>
              </div>

              <Separator />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Configuration</h3>
                  <CopyButton text={settings.config} />
                </div>
                <CodeBlock code={settings.config} language="json" />
              </div>
            </CardContent>
          </Card>
        ))}

        <Card className="bg-accent/30">
          <CardHeader>
            <CardTitle>Settings File Location</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Claude Code settings are stored in your home directory:
            </p>
            <CodeBlock code="~/.claude/settings.json" language="bash" showCopy />
            <p className="text-sm text-muted-foreground mt-4">
              You can also configure project-specific settings in your project root.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
