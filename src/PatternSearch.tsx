import { useId } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { patternIndex } from './content';
import { searchPatterns } from './search';
import './search.css';

const patterns = Object.values(patternIndex);
export function PatternSearch() {
  const [params, setParams] = useSearchParams();
  const id = useId();
  const query = params.get('q') ?? '';
  const results = searchPatterns(patterns, query);
  const setQuery = (value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set('q', value); else next.delete('q');
    setParams(next, { replace: true });
  };
  return <section className="pattern-search" aria-labelledby={`${id}-title`}>
    <h2 id={`${id}-title`}>從題目線索，找到可能的模式</h2>
    <p id={`${id}-hint`}>例如「最短」「旋轉」「找環」。先看辨識理由，再確認適用前提。</p>
    <div className="search-input-row"><label className="sr-only" htmlFor={`${id}-query`}>題目關鍵字</label>
      <input id={`${id}-query`} type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="輸入題目關鍵字…" aria-describedby={`${id}-hint`} />
      {query && <button type="button" onClick={() => setQuery('')}>清除</button>}</div>
    <p className="search-count" role="status">{query.trim() ? `找到 ${results.length} 個可能對應` : '依模式瀏覽六個分類'}</p>
    {!query.trim() ? <div className="pattern-categories">{patterns.map(p => <Link key={p.id} to={`/templates/${p.id}`}>{p.name}</Link>)}</div>
      : results.length ? <ul className="search-results">{results.map(r => <li key={r.id}>
        <Link className="result-title" to={`/templates/${r.patternId}?${new URLSearchParams({ q: query })}${r.variationId ? `#variation-${r.variationId}` : ''}`}>{r.title}</Link>
        <p className="match-reason">匹配關鍵字：{r.matchedKeywords.join('、')}</p><p>{r.explanation}</p>
        <details><summary>確認適用前提（{r.prerequisites.length}）</summary><ul>{r.prerequisites.map(p => <li key={p}>{p}</li>)}</ul></details>
      </li>)}</ul> : <div className="no-results"><p>目前沒有匹配結果。試著描述目標或資料特性，例如：</p>
        <div className="suggestions">{['最短', '二分答案', '找環', 'bfs', '回溯', 'dp'].map(word => <button type="button" key={word} onClick={() => setQuery(word)}>{word}</button>)}</div>
      </div>}
  </section>;
}
