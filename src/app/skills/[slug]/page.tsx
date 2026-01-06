import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CodeBlock } from "@/components/code-block";
import { CopyButton } from "@/components/copy-button";
import { skills, getSkillBySlug } from "@/data/skills";
import { ArrowLeft, Zap, User } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return skills.map((skill) => ({
    slug: skill.slug,
  }));
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const skill = getSkillBySlug(params.slug);
  if (!skill) return { title: "Skill Not Found" };

  return {
    title: `${skill.title} - Claude Code Directory`,
    description: skill.description,
  };
}

export default async function SkillDetailPage(props: Props) {
  const params = await props.params;
  const skill = getSkillBySlug(params.slug);

  if (!skill) {
    notFound();
  }

  return (
    <div className="container py-8 max-w-4xl">
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/skills">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Skills
        </Link>
      </Button>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-accent">
            <Zap className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{skill.title}</h1>
            <p className="text-muted-foreground">{skill.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {skill.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>
            By{" "}
            {skill.author.url ? (
              <a
                href={skill.author.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline"
              >
                {skill.author.name}
              </a>
            ) : (
              skill.author.name
            )}
          </span>
        </div>

        <Separator />

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Skill Content</h2>
            <CopyButton text={skill.content} />
          </div>
          <CodeBlock code={skill.content} language="markdown" />
        </div>

        <div className="bg-accent/50 rounded-lg p-4">
          <h3 className="font-semibold mb-2">How to use</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
            <li>Copy the skill content above</li>
            <li>Create a .claude/skills directory in your project</li>
            <li>Save as .claude/skills/{skill.slug}.md</li>
            <li>Use /{skill.slug} in Claude Code to invoke this skill</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
