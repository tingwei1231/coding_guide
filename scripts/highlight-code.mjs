import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { createHighlighter } from 'shiki';

const highlighter = await createHighlighter({ themes: ['github-dark'], langs: ['python', 'java', 'cpp'] });
const result = {};
for (const file of await readdir('content/patterns')) {
  if (!file.endsWith('.json')) continue;
  const pattern = JSON.parse(await readFile(`content/patterns/${file}`, 'utf8'));
  for (const [kind, lessons] of [['standard', pattern.standard_templates], ['variation', pattern.variations]]) {
    for (const lesson of lessons) {
      for (const [lang, code] of Object.entries(lesson.code)) {
        const { tokens } = highlighter.codeToTokens(code.lines.join('\n'), { lang, theme: 'github-dark' });
        result[`${pattern.id}/${kind}/${lesson.id}/${lang}`] = tokens.map(line => line.map(({ content, color }) => ({ content, color })));
      }
    }
  }
}
async function highlightArticles(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) { await highlightArticles(path); continue; }
    if (!entry.name.endsWith('.md')) continue;
    const article = await readFile(path, 'utf8');
    for (const match of article.matchAll(/```(python|java|cpp)\r?\n([\s\S]*?)\r?\n```/g)) {
      const [, lang, code] = match;
      const { tokens } = highlighter.codeToTokens(code, { lang, theme: 'github-dark' });
      result[`article/${lang}/${code}`] = tokens.map(line => line.map(({ content, color }) => ({ content, color })));
    }
  }
}
await highlightArticles('content/articles');
await mkdir('src/generated', { recursive: true });
await writeFile('src/generated/code-tokens.json', JSON.stringify(result));
highlighter.dispose();
console.log(`Generated syntax tokens for ${Object.keys(result).length} code samples.`);
