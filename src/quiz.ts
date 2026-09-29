export type Normalization = { trim: boolean; collapse_whitespace: boolean; case_sensitive: boolean };
type Base = { id: string; pattern_ids: string[]; content_ids: string[]; prompt: string; explanation: string; misconception: string };
export type Question = Base & ({ type: 'choice'; options: { id: string; text: string }[]; answer_option_id: string } | { type: 'text-fill' | 'code-fill'; accepted_answers: string[]; normalization: Normalization; language?: string; code_with_blank?: string });
export function normalizeAnswer(value: string, rules: Normalization) {
  let result = rules.trim ? value.trim() : value;
  if (rules.collapse_whitespace) result = result.replace(/\s+/g, ' ');
  return rules.case_sensitive ? result : result.toLowerCase();
}
export function gradeAnswer(question: Question, answer = ''): 'unanswered' | 'correct' | 'incorrect' {
  if (!answer.trim()) return 'unanswered';
  const correct = question.type === 'choice' ? answer === question.answer_option_id : question.accepted_answers.some(a => normalizeAnswer(a, question.normalization) === normalizeAnswer(answer, question.normalization));
  return correct ? 'correct' : 'incorrect';
}
export function drawQuestions(pool: Question[], pattern = 'all', random = Math.random) {
  const candidates = pool.filter(q => pattern === 'all' || q.pattern_ids.includes(pattern));
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }
  return candidates.slice(0, pattern === 'all' ? 6 : 4).map(q => {
    if (q.type !== 'choice') return q;
    const options = [...q.options];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return { ...q, options };
  });
}
