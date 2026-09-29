import type { Pattern } from './content.ts';

export interface SearchResult {
  id: string; patternId: string; variationId?: string; title: string;
  matchedKeywords: string[]; prerequisites: string[]; explanation: string; exact: boolean;
}
const normalize = (value: string) => value.trim().toLowerCase().replace(/\s+/g, ' ');

/** Bidirectional keyword substrings also match Chinese phrases without spaces. */
export function searchPatterns(patterns: Pattern[], query: string): SearchResult[] {
  const normalized = normalize(query);
  if (!normalized) return [];
  const terms = [...new Set([normalized, ...normalized.split(' ')])];
  const results: SearchResult[] = [];
  for (const pattern of patterns) {
    const candidates = [
      { id: pattern.id, title: pattern.name, keywords: pattern.keywords,
        prerequisites: [...new Set(pattern.standard_templates.flatMap(t => t.prerequisites))],
        explanation: pattern.standard_templates.map(t => t.trigger_signal).join(' '), variationId: undefined as string | undefined },
      ...pattern.variations.map(v => ({ id: `${pattern.id}/${v.id}`, variationId: v.id, title: `${pattern.name} · ${v.name}`, keywords: v.keywords, prerequisites: v.prerequisites, explanation: v.trigger_signal })),
    ];
    for (const candidate of candidates) {
      const matchedKeywords = candidate.keywords.filter(k => terms.some(t => normalize(k).includes(t) || t.includes(normalize(k))));
      if (!matchedKeywords.length) continue;
      results.push({ id: candidate.id, patternId: pattern.id, variationId: candidate.variationId,
        title: candidate.title, matchedKeywords, prerequisites: candidate.prerequisites,
        explanation: candidate.explanation, exact: matchedKeywords.some(k => terms.includes(normalize(k))) });
    }
  }
  return results.sort((a, b) => Number(b.exact) - Number(a.exact)
    || Number(Boolean(b.variationId)) - Number(Boolean(a.variationId))
    || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
}
