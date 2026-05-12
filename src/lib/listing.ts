// Helpers for listing pages that mix curated and auto-ingested items.
//
// Goal: keep the page fast even when the underlying data has 1,000+ entries.
// Featured/curated items always show first; ingested items are sorted by stars.

interface ListingItem {
  featured?: boolean;
  source?: "curated" | "ingested";
  stars?: number;
  title: string;
}

export const INITIAL_DISPLAY_COUNT = 60;
export const SHOW_MORE_INCREMENT = 60;
// Search results are still capped — 1,000-card render kills the browser.
export const MAX_SEARCH_RESULTS = 240;

export function sortListingItems<T extends ListingItem>(items: T[]): T[] {
  // Stable sort: featured, then curated, then ingested by stars desc, then title.
  return [...items].sort((a, b) => {
    const af = a.featured ? 1 : 0;
    const bf = b.featured ? 1 : 0;
    if (af !== bf) return bf - af;
    const aIngested = a.source === "ingested" ? 1 : 0;
    const bIngested = b.source === "ingested" ? 1 : 0;
    if (aIngested !== bIngested) return aIngested - bIngested;
    if (aIngested && bIngested) {
      const sa = a.stars ?? 0;
      const sb = b.stars ?? 0;
      if (sa !== sb) return sb - sa;
    }
    return a.title.localeCompare(b.title);
  });
}
