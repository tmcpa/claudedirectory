// Editor-authored verdicts for specific comparisons. Keys are
// `${type}|${aSlug}|${bSlug}|${useCaseSlug}` where (aSlug, bSlug) is the
// alphabetized canonical pair — see canonicalPair() in lib/comparisons.ts.
//
// Any entry here replaces the auto-generated heuristic verdict on the
// corresponding /compare page. Leave empty until a comparison is worth a
// real take.

export interface VerdictOverride {
  summary: string;
  pickA: string;
  pickB: string;
  tieBreaker?: string;
}

export const verdictOverrides: Record<string, VerdictOverride> = {};
