import test from 'node:test';
import assert from 'node:assert/strict';
import { loadContent } from '../scripts/validate-content.mjs';
import { searchPatterns } from '../src/search.ts';

const { patterns } = await loadContent();
test('catalog contains six modes, eight standard templates, and thirteen variations', () => {
  assert.equal(patterns.length, 6);
  assert.equal(patterns.flatMap(p => p.standard_templates).length, 8);
  assert.equal(patterns.flatMap(p => p.variations).length, 13);
});
test('search normalizes case and whitespace and supports unsegmented Chinese', () => {
  assert(searchPatterns(patterns, '  BINARY   SEARCH ').some(r => r.patternId === 'binary-search'));
  assert(searchPatterns(patterns, '最短子陣列').some(r => r.variationId === 'shrink-to-min'));
  assert.deepEqual(searchPatterns(patterns, '   '), []);
});
test('multiple terms are OR matched and results include reasons and prerequisites', () => {
  const results = searchPatterns(patterns, '找環 旋轉');
  assert(results.some(r => r.variationId === 'fast-slow'));
  assert(results.some(r => r.variationId === 'rotated-array'));
  assert(results.every(r => r.matchedKeywords.length && r.prerequisites.length && r.explanation));
});
test('ranking prefers exact keyword, then variation, then stable ID', () => {
  const p = structuredClone(patterns.find(p => p.id === 'sliding-window'));
  p.keywords = ['線索'];
  p.variations = p.variations.slice(0, 3);
  p.variations[0].keywords = ['線索'];
  p.variations[1].keywords = ['線索'];
  p.variations[2].keywords = ['線索延伸'];
  const results = searchPatterns([p], '線索');
  assert.deepEqual(results.map(r => r.id), ['sliding-window/fixed-size', 'sliding-window/longest-unique', 'sliding-window', 'sliding-window/shrink-to-min']);
});
test('new conforming pattern is searchable without special rendering logic', () => {
  const extra = structuredClone(patterns[0]);
  extra.id = 'test-pattern'; extra.keywords = ['unique-signal']; extra.variations = [];
  assert.equal(searchPatterns([...patterns, extra], 'unique-signal')[0].patternId, 'test-pattern');
  assert.deepEqual(searchPatterns(patterns, 'xyz-unmatched-928'), []);
});
