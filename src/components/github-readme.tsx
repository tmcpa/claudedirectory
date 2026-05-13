import ReactMarkdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";
import { ExternalLink, BookOpen } from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import { getRepoReadme, type RepoMetadata } from "@/lib/github";

interface GitHubReadmeProps {
  repoUrl?: string;
  meta: RepoMetadata | null;
}

export async function GitHubReadme({ repoUrl, meta }: GitHubReadmeProps) {
  if (!repoUrl) return null;
  const readme = await getRepoReadme(repoUrl);
  if (!readme) return null;

  const baseUrl = meta
    ? `https://raw.githubusercontent.com/${meta.owner}/${meta.repo}/${meta.defaultBranch}/`
    : undefined;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          README
        </h2>
        <a
          href={meta?.readmeUrl ?? repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          View on GitHub
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
      <article className="prose prose-invert prose-sm max-w-none rounded-lg border bg-card p-5">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          urlTransform={(url) => {
            // Resolve relative paths against the repo's raw base before
            // sanitising, so `./docs/foo.md` becomes an absolute
            // raw.githubusercontent URL. Absolute URLs and fragments pass
            // through untouched into defaultUrlTransform.
            let resolved = url;
            if (
              baseUrl &&
              url &&
              !url.startsWith("#") &&
              !/^[a-z][a-z0-9+.-]*:/i.test(url)
            ) {
              try {
                resolved = new URL(url, baseUrl).toString();
              } catch {
                // fall through with original
              }
            }
            // defaultUrlTransform strips javascript:, vbscript:, data:, etc.
            return defaultUrlTransform(resolved);
          }}
          components={{
            code({ className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const isInline = !match;
              if (isInline) {
                return (
                  <code className="bg-muted px-1.5 py-0.5 rounded text-sm" {...props}>
                    {children}
                  </code>
                );
              }
              return (
                <CodeBlock
                  code={String(children).replace(/\n$/, "")}
                  language={match[1]}
                />
              );
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            pre({ children, node }: any) {
              const codeChild = node?.children?.find(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (child: any) => child.type === "element" && child.tagName === "code",
              );
              if (codeChild) {
                const cls =
                  (codeChild.properties?.className as string[] | undefined)?.[0] || "";
                const langMatch = /language-(\w+)/.exec(cls);
                if (!langMatch) {
                  const text =
                    codeChild.children
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      ?.filter((c: any) => c.type === "text")
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      .map((c: any) => c.value)
                      .join("") || "";
                  return <CodeBlock code={text.replace(/\n$/, "")} language="text" />;
                }
              }
              return <>{children}</>;
            },
            h1({ children }) {
              return <h3 className="text-lg font-semibold mt-6 mb-3">{children}</h3>;
            },
            h2({ children }) {
              return <h3 className="text-base font-semibold mt-5 mb-2">{children}</h3>;
            },
            h3({ children }) {
              return <h4 className="text-base font-medium mt-4 mb-2">{children}</h4>;
            },
            p({ children }) {
              return <p className="my-3 leading-relaxed">{children}</p>;
            },
            ul({ children }) {
              return <ul className="my-3 ml-4 list-disc space-y-1">{children}</ul>;
            },
            ol({ children }) {
              return <ol className="my-3 ml-4 list-decimal space-y-1">{children}</ol>;
            },
            a({ href, children }) {
              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {children}
                </a>
              );
            },
            img({ src, alt }) {
              if (!src || typeof src !== "string") return null;
              // eslint-disable-next-line @next/next/no-img-element
              return <img src={src} alt={alt ?? ""} className="rounded-md my-3" loading="lazy" />;
            },
            table({ children }) {
              return (
                <div className="my-4 overflow-x-auto">
                  <table className="w-full border-collapse border border-border">
                    {children}
                  </table>
                </div>
              );
            },
            th({ children }) {
              return (
                <th className="border border-border px-3 py-1.5 text-left font-semibold text-sm">
                  {children}
                </th>
              );
            },
            td({ children }) {
              return (
                <td className="border border-border px-3 py-1.5 text-sm">{children}</td>
              );
            },
            blockquote({ children }) {
              return (
                <blockquote className="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground">
                  {children}
                </blockquote>
              );
            },
          }}
        >
          {readme}
        </ReactMarkdown>
      </article>
    </section>
  );
}
