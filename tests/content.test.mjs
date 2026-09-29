import test from 'node:test';
import assert from 'node:assert/strict';
import { loadContent, validateContent } from '../scripts/validate-content.mjs';

const fixture = await loadContent();
// Keep the known Sliding Window fixture first as more pattern files are added.
fixture.patterns.sort((a, b) => Number(b.id === 'sliding-window') - Number(a.id === 'sliding-window'));
test('Sliding Window sample and all three quiz types satisfy contracts', async () => {
  assert.deepEqual(await validateContent(fixture), []);
});
const cases = [
  ['corrupted explanation', d => d.patterns[0].variations[0].complexity.reason = '????', /encoding corruption/],
  ['missing prerequisite', d => delete d.patterns[0].standard_templates[0].prerequisites, /required.*prerequisites/],
  ['missing language', d => delete d.patterns[0].variations[0].code.java, /required.*java/],
  ['duplicate pattern ID', d => d.patterns.push(structuredClone(d.patterns[0])), /duplicate id sliding-window/],
  ['duplicate problem ID', d => d.problems.push({...d.problems[0], name:'duplicate'}), /duplicate id leetcode-643/],
  ['duplicate variation ID', d => d.patterns[0].variations.push({...d.patterns[0].variations[0], name:'duplicate'}), /duplicate id fixed-size/],
  ['unknown problem', d => d.patterns[0].variations[0].problem_ids.push('leetcode-999'), /unknown reference leetcode-999/],
  ['invalid base template', d => d.patterns[0].variations[0].base_template_id = 'missing', /unknown reference missing/],
  ['out of bounds highlight', d => d.patterns[0].variations[0].highlight_lines.cpp.push(999), /line 999 out of range/],
  ['zero based highlight', d => d.patterns[0].variations[0].highlight_lines.python.push(0), /must be >= 1/],
  ['unknown content', d => d.quizzes[0].content_ids.push('missing'), /unknown reference missing/],
  ['invalid choice answer', d => d.quizzes[0].answer_option_id = 'missing', /unknown reference missing/],
  ['missing fill answer', d => d.quizzes[1].accepted_answers = [], /must NOT have fewer than 1/],
  ['missing code blank', d => d.quizzes[2].code_with_blank = 'no blank', /exactly one/],
  ['unverified collection', d => d.problems[0].collection_source_ids.push('blind-75'), /not verified/],
  ['ready page missing article', d => { d.content[0].status = 'ready'; d.content[0].markdown_path = null; }, /requires markdown_path/],
  ['missing article file', d => d.content[0].markdown_path = 'content/articles/missing.md', /missing markdown/],
];
for (const [name, mutate, expected] of cases) test(`rejects ${name}`, async () => {
  const data = structuredClone(fixture);
  mutate(data);
  assert.match((await validateContent(data)).join('\n'), expected);
});
