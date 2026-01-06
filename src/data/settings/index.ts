import { SettingsExample } from "@/lib/types";
import { recommendedSettings } from "./recommended";
import { permissiveSettings } from "./permissive";
import { secureSettings } from "./secure";

export const settingsExamples: SettingsExample[] = [
  recommendedSettings,
  permissiveSettings,
  secureSettings,
];

export function getSettingsBySlug(slug: string): SettingsExample | undefined {
  return settingsExamples.find((s) => s.slug === slug);
}

export function getFeaturedSettings(): SettingsExample[] {
  return settingsExamples.filter((s) => s.featured);
}

export function getSettingsByTag(tag: string): SettingsExample[] {
  return settingsExamples.filter((s) => s.tags.includes(tag));
}

export function getAllSettingsTags(): string[] {
  const tags = new Set<string>();
  settingsExamples.forEach((s) => s.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}
