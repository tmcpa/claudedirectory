import { Hook } from "@/lib/types";
import { lintOnEditHook } from "./lint-on-edit";
import { formatOnSaveHook } from "./format-on-save";
import { notifyOnCompleteHook } from "./notify-on-complete";
import { tddGuardHook } from "./tdd-guard";
import { claudioHook } from "./claudio";
import { britfixHook } from "./britfix";
import { typescriptQualityHook } from "./typescript-quality";
import { autoTestHook } from "./auto-test";
import { securityScanHook } from "./security-scan";
import { branchProtectHook } from "./branch-protect";
import { commitLintHook } from "./commit-lint";
import { importSortHook } from "./import-sort";
import { bundleSizeCheckHook } from "./bundle-size-check";
import { promptInjectionDefenseHook } from "./prompt-injection-defense";
import { safeCommandApprovalHook } from "./safe-command-approval";
import { fileSizeGuardHook } from "./file-size-guard";
import { autoChangelogHook } from "./auto-changelog";
import { deadCodeDetectorHook } from "./dead-code-detector";
import { testCoverageGuardHook } from "./test-coverage-guard";
import { autoPrDescriptionHook } from "./auto-pr-description";
import { envLeakDetectorHook } from "./env-leak-detector";

export const hooks: Hook[] = [
  lintOnEditHook,
  formatOnSaveHook,
  notifyOnCompleteHook,
  tddGuardHook,
  claudioHook,
  britfixHook,
  typescriptQualityHook,
  autoTestHook,
  securityScanHook,
  branchProtectHook,
  commitLintHook,
  importSortHook,
  bundleSizeCheckHook,
  promptInjectionDefenseHook,
  safeCommandApprovalHook,
  fileSizeGuardHook,
  autoChangelogHook,
  deadCodeDetectorHook,
  testCoverageGuardHook,
  autoPrDescriptionHook,
  envLeakDetectorHook,
];

export function getHookBySlug(slug: string): Hook | undefined {
  return hooks.find((h) => h.slug === slug);
}

export function getFeaturedHooks(): Hook[] {
  return hooks.filter((h) => h.featured);
}

export function getHooksByTag(tag: string): Hook[] {
  return hooks.filter((h) => h.tags.includes(tag));
}

export function getHooksByEvent(event: Hook["event"]): Hook[] {
  return hooks.filter((h) => h.event === event);
}

export function getAllHookTags(): string[] {
  const tags = new Set<string>();
  hooks.forEach((h) => h.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}
