import { Star, GitFork, Calendar, GitBranch } from "lucide-react";
import {
  type RepoMetadata,
  formatStars,
  formatRelativeDate,
  formatAbsoluteDate,
} from "@/lib/github";

interface RepoMetaProps {
  meta: RepoMetadata | null;
}

export function RepoMeta({ meta }: RepoMetaProps) {
  if (!meta) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
      <a
        href={`${meta.htmlUrl}/stargazers`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 hover:text-foreground transition-colors"
        title={`${meta.stars.toLocaleString()} stars on GitHub`}
      >
        <Star className="h-4 w-4" />
        <span className="font-medium">{formatStars(meta.stars)}</span>
      </a>
      {meta.forks > 0 && (
        <a
          href={`${meta.htmlUrl}/network/members`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-foreground transition-colors"
          title={`${meta.forks.toLocaleString()} forks`}
        >
          <GitFork className="h-4 w-4" />
          <span>{formatStars(meta.forks)}</span>
        </a>
      )}
      <span
        className="flex items-center gap-1.5"
        title={`Last updated ${formatAbsoluteDate(meta.lastUpdated)}`}
      >
        <Calendar className="h-4 w-4" />
        <span>Updated {formatRelativeDate(meta.lastUpdated)}</span>
      </span>
      {meta.language && (
        <span className="flex items-center gap-1.5" title="Primary language">
          <GitBranch className="h-4 w-4" />
          <span>{meta.language}</span>
        </span>
      )}
      {meta.license && (
        <span className="text-xs uppercase tracking-wide">{meta.license}</span>
      )}
    </div>
  );
}
