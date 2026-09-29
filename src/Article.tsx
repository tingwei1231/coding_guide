import { useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import generated from './generated/code-tokens.json';
import './article.css';

type Snippet = { language: string; code: string };
const names: Record<string, string> = { python: 'Python', java: 'Java', cpp: 'C++' };
const tokens = generated as Record<string, { content: string; color?: string }[][]>;
function Code({ snippet }: { snippet: Snippet }) {
  const lines = tokens[`article/${snippet.language}/${snippet.code}`];
  return <pre tabIndex={0} aria-label={`${names[snippet.language]} 參考實作`}><code>{lines ? lines.map((line, i) => <span className="article-code-line" key={i}>{line.map((t, j) => <span key={j} style={{ color: t.color }}>{t.content}</span>)}{'\n'}</span>) : snippet.code}</code></pre>;
}
function Examples({ snippets, parallel }: { snippets: Snippet[]; parallel: boolean }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  if (parallel) return <div className="language-comparison">{snippets.map(s => <section key={s.language}><h3>{names[s.language]}</h3><Code snippet={s} /></section>)}</div>;
  return <div className="article-examples"><div className="language-tabs" role="tablist" aria-label="參考實作語言">{snippets.map((s, i) => <button key={s.language} ref={el => { refs.current[i] = el; }} role="tab" id={`${id}-${i}`} aria-controls={`${id}-panel`} aria-selected={active === i} tabIndex={active === i ? 0 : -1} onClick={() => setActive(i)} onKeyDown={e => {
    const next = e.key === 'ArrowRight' ? (i + 1) % snippets.length : e.key === 'ArrowLeft' ? (i + snippets.length - 1) % snippets.length : e.key === 'Home' ? 0 : e.key === 'End' ? snippets.length - 1 : -1;
    if (next !== -1) { e.preventDefault(); setActive(next); refs.current[next]?.focus(); }
  }}>{names[s.language]}</button>)}</div><div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-${active}`}><Code snippet={snippets[active]} /></div></div>;
}
export function Article({ text, parallel = false }: { text: string; parallel?: boolean }) {
  // Consecutive Python/Java/C++ fences form one example group. Other Markdown remains ordinary prose.
  const regex = /```python\r?\n([\s\S]*?)\r?\n```\s*```java\r?\n([\s\S]*?)\r?\n```\s*```cpp\r?\n([\s\S]*?)\r?\n```/g;
  const parts: ({ text: string } | { snippets: Snippet[] })[] = [];
  let start = 0;
  for (const match of text.matchAll(regex)) {
    parts.push({ text: text.slice(start, match.index) });
    parts.push({ snippets: ['python', 'java', 'cpp'].map((language, i) => ({ language, code: match[i + 1] })) });
    start = match.index! + match[0].length;
  }
  parts.push({ text: text.slice(start) });
  return <article className={`prose ${parallel ? 'parallel-article' : ''}`}>{parts.map((part, i) => 'snippets' in part ? <Examples key={i} snippets={part.snippets} parallel={parallel} /> : <Markdown key={i} remarkPlugins={[remarkGfm]} components={{
    a: ({ href, children }) => href?.startsWith('/') ? <Link to={href}>{children}</Link> : <a href={href} target="_blank" rel="noreferrer">{children}</a>,
    img: ({ src, alt }) => <img src={src?.startsWith('/') ? `${import.meta.env.BASE_URL}${src.slice(1)}` : src} alt={alt} />,
    table: ({ children }) => <div className="table-scroll" tabIndex={0} role="region" aria-label="資料比較表"><table>{children}</table></div>,
    pre: ({ children }) => <pre tabIndex={0}>{children}</pre>,
  }}>{part.text}</Markdown>)}</article>;
}
