import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ExternalLink, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { BASE_URL } from "@/lib/constants";
import { getCurrentMonthYear } from "@/lib/seo";
import { useCases } from "@/data/use-cases";
import {
  COMPARABLE_TYPE_LABELS,
  type ComparableItem,
  type ComparableType,
  getAllComparisonParams,
  getPoolForUseCase,
  pairSlug,
  resolveComparison,
} from "@/lib/comparisons";

interface Props {
  params: Promise<{ type: string; pair: string; useCase: string }>;
}

const VALID_TYPES = new Set<ComparableType>([
  "skills",
  "plugins",
  "mcp-servers",
  "agents",
]);

function asComparableType(type: string): ComparableType | null {
  return VALID_TYPES.has(type as ComparableType)
    ? (type as ComparableType)
    : null;
}

export function generateStaticParams() {
  return getAllComparisonParams();
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { type, pair, useCase } = await props.params;
  const t = asComparableType(type);
  if (!t) return { title: "Not Found" };

  const resolved = resolveComparison(t, pair, useCase);
  if (!resolved) return { title: "Not Found" };

  const { a, b, useCase: uc } = resolved;
  const labels = COMPARABLE_TYPE_LABELS[t];
  const month = getCurrentMonthYear();
  const title = `${a.title} vs ${b.title}: which ${labels.singular} for ${uc.title} in Claude Code? (${month})`;
  const description = `Side-by-side comparison of ${a.title} and ${b.title} for ${uc.title.toLowerCase()} in Claude Code. Tag fit, popularity, recency, and a pick-one verdict. Updated ${month}.`;
  const url = `${BASE_URL}/compare/${t}/${pair}/for/${uc.slug}`;

  return {
    title,
    description,
    keywords: [
      ...uc.keywords,
      `${a.title} vs ${b.title}`,
      `${a.title} ${b.title} ${uc.title.toLowerCase()}`,
      `claude code ${labels.singular.toLowerCase()} comparison`,
      a.title.toLowerCase(),
      b.title.toLowerCase(),
    ],
    openGraph: { title, description, url, type: "article" },
    twitter: { card: "summary", title, description },
    alternates: { canonical: url },
  };
}

export default async function ComparePage(props: Props) {
  const { type, pair, useCase } = await props.params;
  const t = asComparableType(type);
  if (!t) notFound();

  const resolved = resolveComparison(t, pair, useCase);
  if (!resolved) notFound();

  const { a, b, useCase: uc, verdict } = resolved;
  const labels = COMPARABLE_TYPE_LABELS[t];
  const url = `${BASE_URL}/compare/${t}/${pair}/for/${uc.slug}`;
  const heading = `${a.title} vs ${b.title} for ${uc.title}`;

  // Side rail: same A paired against other pool members in the same use case.
  const pool = getPoolForUseCase(t, uc);
  const otherOpponents = pool.filter(
    (item) => item.slug !== a.slug && item.slug !== b.slug,
  );

  return (
    <div className="container py-8 max-w-4xl">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BASE_URL },
          { name: labels.plural, url: `${BASE_URL}${labels.path}` },
          { name: uc.title, url: `${BASE_URL}/for/${uc.slug}` },
          { name: `${a.title} vs ${b.title}`, url },
        ]}
      />

      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href={`/for/${uc.slug}`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {uc.title} setups
        </Link>
      </Button>

      <header className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">{heading}</h1>
        <p className="text-muted-foreground leading-relaxed">
          Comparing two Claude Code {labels.plural.toLowerCase()} for{" "}
          {uc.title.toLowerCase()}. Below: side-by-side facts, then a verdict
          you can disagree with.
        </p>
      </header>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Side by side</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ItemColumn item={a} type={t} useCase={uc.tags} />
          <ItemColumn item={b} type={t} useCase={uc.tags} />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Verdict</h2>
        <Card>
          <CardContent className="pt-6 space-y-3">
            <p className="font-medium">{verdict.summary}</p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>{verdict.pickA}</li>
              <li>{verdict.pickB}</li>
              {verdict.tieBreaker && <li>{verdict.tieBreaker}</li>}
            </ul>
            {verdict.source === "heuristic" && (
              <p className="text-xs text-muted-foreground pt-2 border-t">
                Auto-generated from tag fit, popularity, recency, and featured
                status. Not a hand review.
              </p>
            )}
          </CardContent>
        </Card>
      </section>

      {otherOpponents.length > 0 && (
        <>
          <Separator className="my-6" />
          <section>
            <h2 className="text-sm font-medium text-muted-foreground mb-3">
              More {labels.plural.toLowerCase()} to compare for{" "}
              {uc.title.toLowerCase()}
            </h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {otherOpponents.slice(0, 8).map((opp) => (
                <Link
                  key={opp.slug}
                  href={`/compare/${t}/${pairSlug(a.slug, opp.slug)}/for/${uc.slug}`}
                >
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-accent"
                  >
                    {a.title} vs {opp.title}
                  </Badge>
                </Link>
              ))}
            </div>
            <CrossUseCaseLinks
              type={t}
              a={a.slug}
              b={b.slug}
              currentUseCase={uc.slug}
            />
          </section>
        </>
      )}

      <div className="border-t pt-6 mt-10">
        <Link
          href={`/for/${uc.slug}`}
          className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
        >
          Browse all {uc.title.toLowerCase()} setups
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

function ItemColumn({
  item,
  type,
  useCase,
}: {
  item: ComparableItem;
  type: ComparableType;
  useCase: string[];
}) {
  const labels = COMPARABLE_TYPE_LABELS[type];
  const ucSet = new Set(useCase);
  const detailHref = `${labels.path}/${item.slug}`;

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">
            <Link href={detailHref} className="hover:underline">
              {item.title}
            </Link>
          </CardTitle>
          {item.featured && (
            <Badge variant="default" className="text-xs">
              Featured
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {item.description}
        </p>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div>
          <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1.5">
            Tags
          </div>
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 8).map((tag) => (
              <Badge
                key={tag}
                variant={ucSet.has(tag) ? "default" : "secondary"}
                className="text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <dl className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-1 text-xs">
          <dt className="text-muted-foreground">Author</dt>
          <dd>
            {item.author.url ? (
              <a
                href={item.author.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {item.author.name}
              </a>
            ) : (
              item.author.name
            )}
          </dd>

          {typeof item.stars === "number" && (
            <>
              <dt className="text-muted-foreground">Stars</dt>
              <dd className="inline-flex items-center gap-1">
                <Star className="h-3 w-3" />
                {item.stars.toLocaleString()}
              </dd>
            </>
          )}

          {item.lastUpdated && (
            <>
              <dt className="text-muted-foreground">Updated</dt>
              <dd>
                {new Date(item.lastUpdated).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </dd>
            </>
          )}

          {item.repoUrl && (
            <>
              <dt className="text-muted-foreground">Source</dt>
              <dd>
                <a
                  href={item.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:underline"
                >
                  GitHub
                  <ExternalLink className="h-3 w-3" />
                </a>
              </dd>
            </>
          )}
        </dl>

        {item.installCommand && (
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1.5">
              Install
            </div>
            <code className="block text-xs bg-muted rounded px-2 py-1.5 overflow-x-auto">
              {item.installCommand}
            </code>
          </div>
        )}

        <div>
          <Button variant="outline" size="sm" asChild className="w-full">
            <Link href={detailHref}>View {labels.singular.toLowerCase()}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function CrossUseCaseLinks({
  type,
  a,
  b,
  currentUseCase,
}: {
  type: ComparableType;
  a: string;
  b: string;
  currentUseCase: string;
}) {
  // Show the same comparison under other use cases where both items still
  // fit. Drops use cases where either item doesn't match.
  const links = useCases
    .filter((u) => u.slug !== currentUseCase)
    .filter((u) => {
      const pool = getPoolForUseCase(type, u);
      const slugs = new Set(pool.map((p) => p.slug));
      return slugs.has(a) && slugs.has(b);
    });

  if (links.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-medium text-muted-foreground mb-3">
        Same comparison, other workflows
      </h3>
      <div className="flex flex-wrap gap-2">
        {links.map((u) => (
          <Link
            key={u.slug}
            href={`/compare/${type}/${pairSlug(a, b)}/for/${u.slug}`}
          >
            <Badge
              variant="secondary"
              className="cursor-pointer hover:bg-accent"
            >
              for {u.title}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
}
