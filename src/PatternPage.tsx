import { Fragment, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import generated from './generated/code-tokens.json';
import './pattern.css';
import { problemIndex, type Language, type Lesson, type Pattern, type Variation } from './content';

const languageNames: Record<Language, string> = { python: 'Python', java: 'Java', cpp: 'C++' };
const languages: Language[] = ['cpp', 'python', 'java'];
const tokenIndex = generated as Record<string, { content: string; color?: string }[][]>;

function CodeView({ patternId, lesson, language, variation }: { patternId: string; lesson: Lesson; language: Language; variation?: Variation }) {
  const [full, setFull] = useState(false);
  const lines = lesson.code[language].lines;
  const changed = new Set(variation?.highlight_lines[language] ?? []);
  const tokens = tokenIndex[`${patternId}/${variation ? 'variation' : 'standard'}/${lesson.id}/${language}`];
  const visible = lines.map((_, i) => i).filter(i => !variation || full || [i, i + 1, i + 2].some(n => changed.has(n)));
  return <div className="code-view">
    <div className="code-toolbar"><span>{languageNames[language]}{variation ? ' · 標記行為新增／修改' : ' · 標準模板'}</span>
      {variation && <button type="button" aria-pressed={full} onClick={() => setFull(!full)}>{full ? '只看差異' : '查看完整程式碼'}</button>}
    </div>
    {variation && !full && changed.size === 0 ? <p>此語言沒有新增／修改行；請查看刪除說明或完整程式碼。</p> :
      <pre tabIndex={0} aria-label={`${languageNames[language]} ${lesson.name} ${variation && !full ? '差異片段' : '完整程式碼'}`}><code>
        {visible.map((i, index) => <Fragment key={i}>
          {i > (visible[index - 1] ?? -1) + 1 && <span className="code-gap">⋯ 省略未修改行</span>}
          <span className={changed.has(i + 1) ? 'code-line changed' : 'code-line'} data-line={i + 1}>
            <span className="line-number" aria-hidden="true">{changed.has(i + 1) ? '+' : ' '} {i + 1}</span>
            {(tokens?.[i] ?? [{ content: lines[i], color: undefined }]).map((token, j) => <span key={j} style={{ color: token.color }}>{token.content || '\u200b'}</span>)}
          </span>
        </Fragment>)}
        {visible.length > 0 && visible[visible.length - 1] < lines.length - 1 && <span className="code-gap">⋯ 省略未修改行</span>}
      </code></pre>}
  </div>;
}
function LessonDetails({ lesson }: { lesson: Lesson }) {
  return <>
    <h4>適用前提</h4><ul>{lesson.prerequisites.map(p => <li key={p}>{p}</li>)}</ul>
    <p>{lesson.explanation}</p>
    <div className="counterexamples"><h4>別直接套用的情況</h4>{lesson.counterexamples.map(c => <div key={c.scenario}><strong>{c.scenario}</strong><p>{c.reason}</p></div>)}</div>
    <dl className="complexity-grid"><div><dt>時間</dt><dd>{lesson.complexity.time}</dd></div><div><dt>額外空間</dt><dd>{lesson.complexity.space}</dd></div></dl><p>{lesson.complexity.reason}</p>
    {lesson.problem_ids.length > 0 && <><h4>前往 LeetCode 練習</h4><ul>{lesson.problem_ids.map(id => {
      const problem = problemIndex.find(p => p.id === id)!;
      return <li key={id}><a href={problem.url} target="_blank" rel="noreferrer">{problem.number}. {problem.name} ↗</a> <small>（{problem.difficulty}，另開分頁）</small></li>;
    })}</ul></>}
  </>;
}
function VariationCard({ pattern, variation, language, targeted }: { pattern: Pattern; variation: Variation; language: Language; targeted: boolean }) {
  const { key: navigationKey } = useLocation();
  const [open, setOpen] = useState(targeted);
  const section = useRef<HTMLElement>(null);
  useEffect(() => {
    if (targeted) { setOpen(true); section.current?.scrollIntoView({ block: 'start' }); }
  }, [targeted, navigationKey]);
  const id = `variation-${variation.id}`;
  const base = pattern.standard_templates.find(t => t.id === variation.base_template_id)!;
  return <section ref={section} id={id} className="variation-card">
    <h3><button type="button" id={`${id}-button`} aria-expanded={open} aria-controls={`${id}-panel`} onClick={() => setOpen(!open)}><span>{variation.name}</span><span aria-hidden="true">{open ? '−' : '+'}</span></button></h3>
    <div className="variation-signal"><p>{variation.trigger_signal}</p><div className="keywords">{variation.keywords.map(k => <mark key={k}>{k}</mark>)}</div></div>
    <div id={`${id}-panel`} role="region" aria-labelledby={`${id}-button`} hidden={!open} className="variation-body">
      {open && <><p className="base-reference">比較基礎：<a href={`#standard-${base.id}`}>{base.name}</a></p>
        <h4>從標準模板改哪裡？</h4><p>{variation.diff_from_standard}</p>
        {variation.removed_code_notes.length > 0 && <ul>{variation.removed_code_notes.map(note => <li key={note}>{note}</li>)}</ul>}
        <CodeView patternId={pattern.id} lesson={variation} language={language} variation={variation} />
        <LessonDetails lesson={variation} />
        <Link to={`#${id}`}>此變形的連結 ↗</Link></>}
    </div>
  </section>;
}
export function PatternPage({ pattern }: { pattern: Pattern }) {
  const [language, setLanguage] = useState<Language>('cpp');
  const { hash } = useLocation();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  return <div className="pattern-page">
    <div className="pattern-intro"><p className="eyebrow">STANDARD → VARIATION → PRACTICE</p><h2>先理解模板，再辨識變形。</h2><p>比較狀態、判斷條件與更新時機。關鍵字是線索，適用前提才是選擇模板的依據。</p></div>
    {pattern.variations.length > 0 && <nav className="variation-index" aria-label="變形快速導覽">{pattern.variations.map(v => <Link key={v.id} to={`#variation-${v.id}`}>{v.name}</Link>)}</nav>}
    <div role="tablist" aria-label="程式語言" className="language-tabs">{languages.map((lang, i) => <button type="button" key={lang} ref={el => { tabs.current[i] = el; }} role="tab" id={`language-${lang}`} aria-selected={lang === language} aria-controls="pattern-code-panel" tabIndex={lang === language ? 0 : -1} onClick={() => setLanguage(lang)} onKeyDown={e => {
      let next = i;
      if (e.key === 'ArrowRight') next = (i + 1) % languages.length;
      else if (e.key === 'ArrowLeft') next = (i + languages.length - 1) % languages.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = languages.length - 1;
      else return;
      e.preventDefault(); setLanguage(languages[next]); tabs.current[next]?.focus();
    }}>{languageNames[lang]}</button>)}</div>
    <div id="pattern-code-panel" role="tabpanel" aria-labelledby={`language-${language}`}>
      {pattern.standard_templates.map(lesson => <section className="sample" id={`standard-${lesson.id}`} key={lesson.id}><span className="badge">標準模板</span><h2>{lesson.name}</h2><p>{lesson.trigger_signal}</p>
        <CodeView patternId={pattern.id} lesson={lesson} language={language} /><LessonDetails lesson={lesson} />
      </section>)}
      {pattern.variations.length > 0 && <div className="section-heading"><h2>{pattern.variations.length} 種變形，找到改動的理由</h2><span>展開比較 · 切換完整程式碼</span></div>}
      {pattern.variations.map(v => <VariationCard key={v.id} pattern={pattern} variation={v} language={language} targeted={hash === `#variation-${v.id}`} />)}
    </div>
  </div>;
}
