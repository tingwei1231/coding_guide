import { useId } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { articleFor, pages, patternIndex, titleFor } from './content';
import { searchPatterns } from './search';
import './search.css';

const patterns = Object.values(patternIndex);
const categories = pages.filter(p => p.route.startsWith('/templates/') && !['template-cpp-review', 'template-pattern-notes'].includes(p.id));
const extraKeywords: Record<string, string[]> = {
  'hashmap-set': ['hashmap', 'hash set', 'hash map', '雜湊', '頻率', '去重', '補數'],
  stack: ['stack', '堆疊', '括號', '配對'],
  'monotonic-stack': ['monotonic stack', '單調堆疊', 'next greater', 'next smaller', '更小', '更大', '溫度'],
  'linked-list': ['linked list', '鏈結串列', '反轉', '找環'],
  'prefix-sum': ['prefix sum', '前綴和', '區間和', 'subarray sum'],
  intervals: ['interval', '區間', '重疊', '合併'],
  heap: ['heap', 'priority queue', '堆積', 'top k', '第 k 大'],
  'topological-sort': ['topological sort', '拓撲', '依賴', '入度', '課程'],
  bst: ['bst', '二元搜尋樹', '上下界'],
  trie: ['trie', '前綴樹', '字首', '字典'],
  greedy: ['greedy', '貪婪', 'jump game'],
  'bit-manipulation': ['bit', 'xor', '位元'],
  'matrix-simulation': ['matrix', '矩陣', '方向', '模擬'],
};
export function PatternSearch() {
  const [params, setParams] = useSearchParams();
  const id = useId();
  const query = params.get('q') ?? '';
  const terms = [...new Set([query.trim().toLowerCase(), ...query.trim().toLowerCase().split(/\s+/)])].filter(Boolean);
  const extraResults = categories.filter(p => !patternIndex[p.route.split('/')[2]]).flatMap(p => {
    const patternId = p.route.split('/')[2];
    const matchedKeywords = (extraKeywords[patternId] ?? [p.title]).filter(k => terms.some(t => k.includes(t) || t.includes(k)));
    if (!matchedKeywords.length) return [];
    const text = articleFor(p) ?? '';
    const explanation = text.split(/^## /m)[1]?.split('\n\n')[1] ?? p.sections.join('、');
    return [{ id: p.id, patternId, variationId: undefined, title: titleFor(p), matchedKeywords,
      prerequisites: ['閱讀模板內的輸入條件、邊界與複雜度，再依題目調整。'], explanation, exact: false }];
  });
  const results = [...searchPatterns(patterns, query), ...extraResults];
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
    <p className="search-count" role="status">{query.trim() ? `找到 ${results.length} 個可能對應` : `依模式瀏覽 ${categories.length} 個分類`}</p>
    {!query.trim() ? <div className="pattern-categories">{categories.map(p => <Link key={p.id} to={p.route}>{titleFor(p)}</Link>)}</div>
      : results.length ? <ul className="search-results">{results.map(r => <li key={r.id}>
        <Link className="result-title" to={`/templates/${r.patternId}?${new URLSearchParams({ q: query })}${r.variationId ? `#variation-${r.variationId}` : ''}`}>{r.title}</Link>
        <p className="match-reason">匹配關鍵字：{r.matchedKeywords.join('、')}</p><p>{r.explanation}</p>
        <details><summary>確認適用前提（{r.prerequisites.length}）</summary><ul>{r.prerequisites.map(p => <li key={p}>{p}</li>)}</ul></details>
      </li>)}</ul> : <div className="no-results"><p>目前沒有匹配結果。試著描述目標或資料特性，例如：</p>
        <div className="suggestions">{['最短', '二分答案', '找環', 'bfs', '回溯', 'dp'].map(word => <button type="button" key={word} onClick={() => setQuery(word)}>{word}</button>)}</div>
      </div>}
  </section>;
}
