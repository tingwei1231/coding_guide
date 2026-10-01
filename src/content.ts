import catalog from '../content/catalog.json';
import problems from '../content/problems.json';

export interface Page {
  id: string; route: string; title: string; status: string;
  markdown_path: string | null; sections: string[];
}
export interface Lesson {
  id: string; name: string; trigger_signal: string; prerequisites: string[];
  explanation: string; code: Record<'python' | 'java' | 'cpp', { lines: string[] }>;
  complexity: { time: string; space: string; reason: string };
  problem_ids: string[];
  keywords: string[];
  counterexamples: { scenario: string; reason: string }[];
}
export type Language = 'python' | 'java' | 'cpp';
export interface Variation extends Lesson {
  base_template_id: string; diff_from_standard: string; removed_code_notes: string[];
  highlight_lines: Record<Language, number[]>;
}
export interface Pattern { id: string; name: string; keywords: string[]; standard_templates: Lesson[]; variations: Variation[] }
export const pages: Page[] = catalog;
export const problemIndex = problems;
const patterns = import.meta.glob<Pattern>('../content/patterns/*.json', { eager: true, import: 'default' });
export const patternIndex = Object.fromEntries(Object.values(patterns).map(p => [p.id, p]));
const articles = import.meta.glob<string>('../content/articles/**/*.md', { eager: true, query: '?raw', import: 'default' });
export function articleFor(page: Page) { return page.markdown_path ? articles[`../${page.markdown_path}`] : undefined; }
export const labels: Record<string, string> = {
  'data-structures': '資料結構', languages: '語言對照', templates: '模式模板',
  'guided-learning': '引導教學', roadmap: '學習路徑', quiz: '概念測驗',
  'mock-interview': '模擬面試', 'career-prep': '求職準備', 'big-o': '時間複雜度',
  'ds-array': 'Array 陣列', 'ds-string': 'String 字串', 'ds-hashmap-set': 'HashMap / Set',
  'ds-linked-list': 'Linked List 鏈結串列', 'ds-stack': 'Stack', 'ds-queue': 'Queue',
  'ds-heap': 'Heap 堆積', 'ds-tree': 'Tree 樹、BST 與 Trie', 'ds-graph': 'Graph 圖', 'ds-union-find': 'Union-Find 並查集',
};
export const patternNames: Record<string, string> = {
  'sliding-window': 'Sliding Window', 'binary-search': 'Binary Search', 'two-pointers': 'Two Pointers',
  'bfs-dfs': 'BFS / DFS', backtracking: 'Backtracking', dp: 'Dynamic Programming',
};
export function titleFor(page: Page) {
  if (page.id === 'home') return '刷題之前，先學會思考。';
  if (page.id.startsWith('template-')) return patternNames[page.id.slice(9)] ?? page.title;
  if (page.id.startsWith('guide-')) return `${patternNames[page.id.slice(6)] ?? page.title} 代表題`;
  return labels[page.id] ?? page.title;
}
