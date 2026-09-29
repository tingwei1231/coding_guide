import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { drawQuestions, gradeAnswer, normalizeAnswer } from '../src/quiz.ts';
const pool = JSON.parse(await readFile(new URL('../content/quizzes.json', import.meta.url), 'utf8'));

test('quiz covers six patterns with four questions and all types per pattern', () => {
  const patterns = new Set(pool.flatMap(q => q.pattern_ids));
  assert.equal(patterns.size, 6);
  assert.ok(pool.length >= 24);
  for (const pattern of patterns) {
    const group = pool.filter(q => q.pattern_ids.includes(pattern));
    assert.ok(group.length >= 4);
    assert.equal(new Set(group.map(q => q.type)).size, 3);
  }
});
test('all answers grade correctly; empty, whitespace and unknown answers do not pass', () => {
  for (const q of pool) {
    for (const a of q.type === 'choice' ? [q.answer_option_id] : q.accepted_answers) assert.equal(gradeAnswer(q, a), 'correct', q.id);
    assert.equal(gradeAnswer(q), 'unanswered');
    assert.equal(gradeAnswer(q, ' \n\t '), 'unanswered');
    assert.equal(gradeAnswer(q, 'not-an-answer'), 'incorrect');
  }
});
test('normalization follows each flag and does not erase code operators or case', () => {
  assert.equal(gradeAnswer(pool.find(q => q.id === 'fixed-window-text'), '  FIXED \t WINDOW  '), 'correct');
  assert.equal(gradeAnswer(pool.find(q => q.id === 'bfs-visited'), 'true'), 'incorrect');
  assert.equal(gradeAnswer(pool.find(q => q.id === 'fixed-window-code'), 'right + k'), 'incorrect');
  assert.equal(normalizeAnswer(' A  B ', { trim: false, collapse_whitespace: false, case_sensitive: true }), ' A  B ');
  assert.equal(normalizeAnswer(' A  B ', { trim: false, collapse_whitespace: true, case_sensitive: false }), ' a b ');
});
test('draws without duplicates, obeys scope, leaves source untouched and handles small pools', () => {
  const before = JSON.stringify(pool);
  const mixed = drawQuestions(pool, 'all', () => 0.5);
  assert.equal(mixed.length, 6);
  assert.equal(new Set(mixed.map(q => q.id)).size, 6);
  const scoped = drawQuestions(pool, 'dp', () => 0);
  assert.equal(scoped.length, 4);
  assert.ok(scoped.every(q => q.pattern_ids.includes('dp')));
  const choice = scoped.find(q => q.type === 'choice');
  assert.notDeepEqual(choice.options, pool.find(q => q.id === choice.id).options);
  assert.equal(gradeAnswer(choice, choice.answer_option_id), 'correct');
  assert.equal(JSON.stringify(pool), before);
  assert.deepEqual(drawQuestions([], 'all'), []);
  assert.equal(drawQuestions(pool.slice(0, 2)).length, 2);
});
