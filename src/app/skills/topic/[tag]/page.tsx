import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SkillCard } from "@/components/cards/skill-card";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { getAllSkillTags, getSkillsByTag } from "@/data/skills";
import { formatTagName } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

const BASE_URL = "https://claudedirectory.org";

interface Props {
  params: Promise<{ tag: string }>;
}

export function generateStaticParams() {
  return getAllSkillTags().map((tag) => ({ tag }));
}

export async function generateMetadata(props: Props) {
  const { tag } = await props.params;
  const tagItems = getSkillsByTag(tag);
  if (tagItems.length === 0) return { title: "Topic Not Found" };

  const displayName = formatTagName(tag);
  const url = `${BASE_URL}/skills/topic/${tag}`;
  const title = `${displayName} Skills for Claude Code`;
  const description = `Browse ${tagItems.length} Claude Code skills tagged with "${tag}". Custom slash commands and workflows for ${displayName}.`;

  return {
    title,
    description,
    keywords: [tag, `${tag} claude code skills`, `${tag} slash commands`, "claude code", "skills"],
    openGraph: {
      title,
      description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary" as const,
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function SkillTopicPage(props: Props) {
  const { tag } = await props.params;
  const tagItems = getSkillsByTag(tag);

  if (tagItems.length === 0) {
    notFound();
  }

  const allTags = getAllSkillTags();
  const displayName = formatTagName(tag);

  return (
    <div className="container py-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BASE_URL },
          { name: "Skills", url: `${BASE_URL}/skills` },
          { name: displayName, url: `${BASE_URL}/skills/topic/${tag}` },
        ]}
      />

      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/skills">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Skills
        </Link>
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {displayName} Skills for Claude Code
        </h1>
        <p className="text-muted-foreground">
          {tagItems.length} {tagItems.length === 1 ? "skill" : "skills"} tagged
          with &ldquo;{tag}&rdquo;
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {tagItems.map((skill) => (
          <SkillCard key={skill.slug} skill={skill} />
        ))}
      </div>

      <div className="border-t pt-6">
        <h2 className="text-sm font-medium text-muted-foreground mb-3">
          Browse more topics
        </h2>
        <div className="flex flex-wrap gap-2">
          {allTags.map((t) => (
            <Link key={t} href={`/skills/topic/${t}`}>
              <Badge
                variant={t === tag ? "default" : "secondary"}
                className={t === tag ? "bg-primary" : "cursor-pointer hover:bg-accent"}
              >
                {t}
              </Badge>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
