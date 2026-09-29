import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { loadContent } from '../scripts/validate-content.mjs';
const data = await loadContent();
const text = path => readFile(path, 'utf8');

test('ten structure articles contain required sections, a diagram, and complexity table', async () => {
  const pages = data.content.filter(p => p.id.startsWith('ds-'));
  assert.equal(pages.length, 10);
  for (const page of pages) {
    assert.equal(page.status, 'ready');
    const body = await text(page.markdown_path);
    for (const heading of ['定義','圖解','複雜度','適用情境','常見誤區']) assert(body.includes(`## ${heading}`), `${page.id}: ${heading}`);
    assert.match(body, /!\[[^\]]+\]\(\/diagrams\/[^)]+\.svg\)/);
    assert.match(body, /\| 操作 \| 成本 \|/);
  }
});
test('six guided articles have five reasoning steps, pseudocode, three languages, and practice links', async () => {
  const guides = data.content.filter(p => p.id.startsWith('guide-'));
  assert.equal(guides.length, 6);
  for (const page of guides) {
    const body = await text(page.markdown_path);
    assert.equal((body.match(/^## [1-5]\./gm) ?? []).length, 5);
    for (const language of ['text','python','java','cpp']) assert(body.includes('```'+language+'\n'));
    assert.match(body, /\[前往 LeetCode 練這題\]\(https:\/\/leetcode.com\/problems\//);
    assert(page.problem_ids.length);
  }
});
test('copied reference code stays synchronized with the already verified templates', async () => {
  for (const [patternId, kind, lessonId] of [
    ['sliding-window','variations','shrink-to-min'], ['binary-search','variations','answer-space'],
    ['two-pointers','variations','opposite-ends'], ['backtracking','standard_templates','subsets'], ['dp','standard_templates','bottom-up'],
  ]) {
    const body = await text(`content/articles/guided-learning/${patternId}.md`);
    const lesson = data.patterns.find(p => p.id === patternId)[kind].find(l => l.id === lessonId);
    for (const language of ['python','java','cpp']) {
      const code = body.match(new RegExp('```'+language+'\\n([\\s\\S]*?)\\n```'))?.[1];
      assert.equal(code, lesson.code[language].lines.join('\n'));
    }
  }
});
test('language comparisons, six complexity cases, and roadmap cover planned scope', async () => {
  const languages = await text('content/articles/languages.md');
  assert.equal((languages.match(/^## [1-8]\./gm) ?? []).length, 8);
  for (const lang of ['python','java','cpp']) assert.equal((languages.match(new RegExp('```'+lang,'g')) ?? []).length, 8);
  assert.equal(((await text('content/articles/big-o.md')).match(/^## [1-6]\./gm) ?? []).length, 6);
  const roadmap = await text('content/articles/roadmap.md');
  assert.equal((roadmap.match(/^## [1-6]\./gm) ?? []).length, 6);
  for (const p of data.patterns) assert(roadmap.includes(`/guided-learning/${p.id}`));
  for (const id of data.content.find(p => p.id === 'roadmap').problem_ids) {
    const p = data.problems.find(p => p.id === id);
    assert(roadmap.includes(p.url)); assert(roadmap.includes(p.difficulty));
  }
});
