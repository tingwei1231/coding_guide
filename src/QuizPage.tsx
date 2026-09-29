import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import data from '../content/quizzes.json';
import { pages, patternNames, titleFor } from './content';
import { drawQuestions, gradeAnswer, type Question } from './quiz';
import './quiz.css';

const pool = data as Question[];
const resultNames = { unanswered: '未作答', correct: '答對', incorrect: '答錯' };
export function QuizPage() {
  const [pattern, setPattern] = useState('all');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const summary = useRef<HTMLDivElement>(null);
  function reset(next: Question[]) {
    setQuestions(next); setAnswers({}); setSubmitted(false);
    requestAnimationFrame(() => heading.current?.focus());
  }
  const answered = questions.filter(q => answers[q.id]?.trim()).length;
  const correct = questions.filter(q => gradeAnswer(q, answers[q.id]) === 'correct').length;
  return <section className="quiz" aria-label="概念測驗練習">
    <div className="quiz-controls"><label htmlFor="quiz-pattern">練習範圍</label><select id="quiz-pattern" value={pattern} onChange={e => setPattern(e.target.value)}><option value="all">綜合抽 6 題</option>{Object.entries(patternNames).map(([id, name]) => <option key={id} value={id}>{name}：4 題</option>)}</select><button type="button" onClick={() => reset(drawQuestions(pool, pattern))}>{questions.length ? '依所選範圍重新抽題' : '開始測驗'}</button></div>
    {questions.length > 0 && <form onSubmit={e => { e.preventDefault(); setSubmitted(true); requestAnimationFrame(() => summary.current?.focus()); }}>
      <h2 ref={heading} tabIndex={-1}>本回合 {questions.length} 題</h2><p>已作答 {answered} / {questions.length}。空白答案送出後標記為未作答。</p>
      {submitted && <div className="quiz-summary" ref={summary} tabIndex={-1} role="status">答對 {correct} / {questions.length} 題；未作答 {questions.length - answered} 題。請閱讀各題解說後再練習。</div>}
      {questions.map((q, index) => {
        const result = gradeAnswer(q, answers[q.id]);
        return <section className="quiz-question" key={q.id} data-question-id={q.id}>
          <p className="quiz-kind">{q.pattern_ids.map(id => patternNames[id]).join(' / ')} · {q.type === 'choice' ? '選擇題' : q.type === 'text-fill' ? '文字填空' : '程式碼填空'}</p>
          <fieldset disabled={submitted}><legend>{index + 1}. {q.prompt}</legend>
            {q.type === 'choice' ? q.options.map(option => <label className="quiz-option" key={option.id}><input type="radio" name={q.id} value={option.id} checked={answers[q.id] === option.id} onChange={() => setAnswers(a => ({ ...a, [q.id]: option.id }))} />{option.text}</label>) : <>
              {q.type === 'code-fill' && <pre tabIndex={0} aria-label={`${q.language} 待填程式碼`}><code>{q.code_with_blank}</code></pre>}
              <label htmlFor={`answer-${q.id}`}>你的答案</label><input id={`answer-${q.id}`} type="text" autoComplete="off" spellCheck={false} value={answers[q.id] ?? ''} aria-describedby={`rules-${q.id}`} onChange={e => setAnswers(a => ({ ...a, [q.id]: e.target.value }))} />
              <p id={`rules-${q.id}`} className="quiz-rules">{q.normalization.case_sensitive ? '區分' : '不區分'}大小寫；{q.normalization.trim ? '忽略' : '保留'}首尾空白；{q.normalization.collapse_whitespace ? '連續空白視為一個空格' : '保留連續空白'}。填空依可接受答案清單比對，不保證辨識所有等價寫法。</p>
            </>}
          </fieldset>
          {submitted && <div className={`quiz-feedback ${result}`}><h3>{resultNames[result]}</h3><p><strong>{q.type === 'choice' ? '正確答案' : '可接受答案'}：</strong>{q.type === 'choice' ? q.options.find(o => o.id === q.answer_option_id)?.text : q.accepted_answers.map((a, i) => <span key={a}>{i > 0 && ' ／ '}<code>{a}</code></span>)}</p><p>{q.explanation}</p><p><strong>常見誤解：</strong>{q.misconception}</p><p>複習：{q.content_ids.map(id => { const page = pages.find(p => p.id === id)!; return <Link key={id} to={page.route}>{titleFor(page)}</Link>; })}</p></div>}
        </section>;
      })}
      <div className="quiz-actions">{!submitted && <button type="submit">送出答案</button>}<button type="button" onClick={() => reset([...questions])}>重做這組題目</button></div>
    </form>}
  </section>;
}
