import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HowToCard } from "@/components/cards/how-to-card";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { RelatedUseCases } from "@/components/related-use-cases";
import { getAllHowToTags, getHowTosByTag } from "@/data/how-to";
import { formatTagName } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { BASE_URL } from "@/lib/constants";
import { topicTitle, topicDescription } from "@/lib/seo";

interface Props {
  params: Promise<{ tag: string }>;
}

export function generateStaticParams() {
  return getAllHowToTags().map((tag) => ({ tag }));
}

export async function generateMetadata(props: Props) {
  const { tag } = await props.params;
  const tagItems = getHowTosByTag(tag);
  if (tagItems.length === 0) return { title: "Topic Not Found" };

  const displayName = formatTagName(tag);
  const url = `${BASE_URL}/how-to/topic/${tag}`;
  const title = topicTitle("how-to", displayName);
  const description = topicDescription("how-to", displayName, tagItems.length);

  return {
    title,
    description,
    keywords: [
      tag,
      `best ${tag} claude code tutorial`,
      `${tag} guide`,
      `claude code ${tag} how to`,
      "claude code",
      "how to",
    ],
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

export default async function HowToTopicPage(props: Props) {
  const { tag } = await props.params;
  const tagItems = getHowTosByTag(tag);

  if (tagItems.length === 0) {
    notFound();
  }

  const allTags = getAllHowToTags();
  const displayName = formatTagName(tag);

  return (
    <div className="container py-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BASE_URL },
          { name: "How To Guides", url: `${BASE_URL}/how-to` },
          { name: displayName, url: `${BASE_URL}/how-to/topic/${tag}` },
        ]}
      />

      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/how-to">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Guides
        </Link>
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Best Claude Code Guides for {displayName}
        </h1>
        <p className="text-muted-foreground">
          {tagItems.length} {tagItems.length === 1 ? "guide" : "guides"} tagged
          with &ldquo;{tag}&rdquo;
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {tagItems.map((howTo) => (
          <HowToCard key={howTo.slug} howTo={howTo} />
        ))}
      </div>

      <RelatedUseCases tag={tag} crossPath="/how-to" />

      <div className="border-t pt-6">
        <h2 className="text-sm font-medium text-muted-foreground mb-3">
          Browse more topics
        </h2>
        <div className="flex flex-wrap gap-2">
          {allTags.map((t) => (
            <Link key={t} href={`/how-to/topic/${t}`}>
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
