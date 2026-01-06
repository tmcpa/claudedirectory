import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CodeBlock } from "@/components/code-block";
import { CopyButton } from "@/components/copy-button";
import { mcpServers, getMCPServerBySlug } from "@/data/mcp-servers";
import { ArrowLeft, Server, User, Terminal } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return mcpServers.map((server) => ({
    slug: server.slug,
  }));
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const server = getMCPServerBySlug(params.slug);
  if (!server) return { title: "MCP Server Not Found" };

  return {
    title: `${server.title} - Claude Code Directory`,
    description: server.description,
  };
}

export default async function MCPServerDetailPage(props: Props) {
  const params = await props.params;
  const server = getMCPServerBySlug(params.slug);

  if (!server) {
    notFound();
  }

  return (
    <div className="container py-8 max-w-4xl">
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/mcp-servers">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to MCP Servers
        </Link>
      </Button>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-accent">
            <Server className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{server.title}</h1>
            <p className="text-muted-foreground">{server.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {server.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>
            By{" "}
            {server.author.url ? (
              <a
                href={server.author.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline"
              >
                {server.author.name}
              </a>
            ) : (
              server.author.name
            )}
          </span>
        </div>

        <Separator />

        {server.installCommand && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                Installation
              </h2>
              <CopyButton text={server.installCommand} />
            </div>
            <CodeBlock code={server.installCommand} language="bash" />
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Configuration</h2>
            <CopyButton text={server.config} />
          </div>
          <CodeBlock code={server.config} language="json" />
        </div>

        <div className="bg-accent/50 rounded-lg p-4">
          <h3 className="font-semibold mb-2">How to use</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
            {server.installCommand && (
              <li>Run the installation command above (if needed)</li>
            )}
            <li>Open your Claude Code settings file (~/.claude/settings.json)</li>
            <li>Add the configuration to the mcpServers section</li>
            <li>Restart Claude Code to apply changes</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
