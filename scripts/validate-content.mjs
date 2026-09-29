import { readFile, readdir, access } from 'node:fs/promises';
import { resolve, relative, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv';

export const root = fileURLToPath(new URL('../', import.meta.url));
const patternIds = new Set(['sliding-window', 'binary-search', 'two-pointers', 'bfs-dfs', 'backtracking', 'dp']);
const languages = ['python', 'java', 'cpp'];
const readJson = async path => JSON.parse((await readFile(path, 'utf8')).replace(/^\uFEFF/, ''));
const ajv = new Ajv({ allErrors: true, strict: true });
for (const name of ['common', 'patterns', 'problems', 'sources', 'content', 'quizzes']) {
  ajv.addSchema(await readJson(resolve(root, `schemas/${name}.schema.json`)));
}

export async function loadContent(base = root) {
  const names = (await readdir(resolve(base, 'content/patterns'))).filter(n => n.endsWith('.json')).sort();
  return {
    patterns: await Promise.all(names.map(n => readJson(resolve(base, 'content/patterns', n)))),
    problems: await readJson(resolve(base, 'content/problems.json')),
    sources: await readJson(resolve(base, 'content/sources.json')),
    content: await readJson(resolve(base, 'content/catalog.json')),
    quizzes: await readJson(resolve(base, 'content/quizzes.json')),
  };
}

export async function validateContent(data, base = root) {
  const errors = [];
  const checkEncoding = (value, location) => {
    if (typeof value === 'string' && /\uFFFD|\?{3,}/.test(value)) errors.push(`${location}: possible encoding corruption`);
    else if (value && typeof value === 'object') for (const [key, child] of Object.entries(value)) checkEncoding(child, `${location}/${key}`);
  };
  checkEncoding(data, 'content');
  const checkSchema = (name, value, location) => {
    const validate = ajv.getSchema(`${name}.schema.json`);
    if (!validate(value)) for (const e of validate.errors) errors.push(`${location}${e.instancePath}: ${e.message} ${JSON.stringify(e.params)}`);
  };
  checkSchema('patterns', data.patterns?.[0], 'patterns/0');
  if (!Array.isArray(data.patterns) || !data.patterns.length) errors.push('patterns: at least one pattern required');
  else data.patterns.slice(1).forEach((p, i) => checkSchema('patterns', p, `patterns/${i + 1}`));
  for (const name of ['problems', 'sources', 'content', 'quizzes']) checkSchema(name, data[name], name);
  // Only inspect references after shape validation, so malformed documents cannot crash the checker.
  if (errors.length) return errors;
  const unique = (items, key, label) => {
    const seen = new Set();
    for (const item of items) {
      if (seen.has(item[key])) errors.push(`${label}: duplicate ${key} ${item[key]}`);
      seen.add(item[key]);
    }
    return seen;
  };
  unique(data.patterns, 'id', 'patterns');
  const problems = unique(data.problems, 'id', 'problems');
  unique(data.problems, 'number', 'problems');
  unique(data.problems, 'url', 'problems');
  const sources = unique(data.sources, 'id', 'sources');
  const contents = unique(data.content, 'id', 'content');
  unique(data.content, 'route', 'content');
  unique(data.quizzes, 'id', 'quizzes');
  const refs = (ids, known, label) => { for (const id of ids) if (!known.has(id)) errors.push(`${label}: unknown reference ${id}`); };
  const sourceMap = new Map(data.sources.map(s => [s.id, s]));
  const problemMap = new Map(data.problems.map(p => [p.id, p]));
  for (const p of data.patterns) {
    refs([p.id], patternIds, 'pattern');
    const templates = unique(p.standard_templates, 'id', `${p.id}/templates`);
    unique(p.variations, 'id', `${p.id}/variations`);
    for (const lesson of [...p.standard_templates, ...p.variations]) {
      const label = `${p.id}/${lesson.id}`;
      refs(lesson.problem_ids, problems, label);
      refs(lesson.content_ids, contents, label);
      for (const id of lesson.problem_ids) if (problemMap.has(id) && !problemMap.get(id).pattern_ids.includes(p.id)) errors.push(`${label}: problem ${id} does not include pattern ${p.id}`);
      if ('base_template_id' in lesson) {
        refs([lesson.base_template_id], templates, label);
        for (const lang of languages) {
          for (const line of lesson.highlight_lines[lang]) if (line > lesson.code[lang].lines.length) errors.push(`${label}/${lang}: highlight line ${line} out of range`);
        }
      }
      for (const lang of languages) if (!lesson.code[lang].lines.some(line => line.trim())) errors.push(`${label}/${lang}: empty code`);
    }
  }
  for (const p of data.problems) {
    refs(p.pattern_ids, patternIds, p.id);
    refs([p.source_id, ...p.collection_source_ids], sources, p.id);
    const source = sourceMap.get(p.source_id);
    if (source && (source.kind !== 'problem' || source.status !== 'verified' || source.url !== p.url)) errors.push(`${p.id}: problem source must be verified and match URL`);
    for (const id of p.collection_source_ids) {
      const source = sourceMap.get(id);
      if (source && (source.kind !== 'collection' || source.status !== 'verified')) errors.push(`${p.id}: collection source ${id} is not verified`);
    }
  }
  for (const page of data.content) {
    refs(page.pattern_ids, patternIds, page.id);
    refs(page.problem_ids, problems, page.id);
    if (page.status === 'ready' && page.markdown_path === null) errors.push(`${page.id}: ready content requires markdown_path`);
    if (page.markdown_path !== null) {
      const path = resolve(base, page.markdown_path);
      const rel = relative(resolve(base, 'content/articles'), path);
      if (rel.startsWith('..') || isAbsolute(rel)) errors.push(`${page.id}: markdown path escapes content/articles`);
      else {
        try {
          const article = await readFile(path, 'utf8');
          checkEncoding(article, page.markdown_path);
          if (!article.trim()) errors.push(`${page.id}: empty markdown`);
          for (const match of article.matchAll(/(!?)\[[^\]]*\]\((\/[^\s)]*)\)/g)) {
            const [, image, target] = match;
            const [route, hash] = target.split('#');
            if (image) {
              const asset = resolve(base, 'public', route.slice(1));
              const assetRel = relative(resolve(base, 'public'), asset);
              if (assetRel.startsWith('..') || isAbsolute(assetRel)) errors.push(`${page.id}: invalid image path ${target}`);
              else try { await access(asset); } catch { errors.push(`${page.id}: missing image ${target}`); }
            } else {
              const linked = data.content.find(p => p.route === route);
              if (!linked) errors.push(`${page.id}: unknown article route ${route}`);
              if (hash && route.startsWith('/templates/')) {
                const pattern = data.patterns.find(p => `/templates/${p.id}` === route);
                const ids = pattern ? [...pattern.standard_templates.map(l => `standard-${l.id}`), ...pattern.variations.map(l => `variation-${l.id}`)] : [];
                if (!ids.includes(hash)) errors.push(`${page.id}: unknown template anchor ${target}`);
              }
            }
          }
        } catch { errors.push(`${page.id}: missing markdown ${page.markdown_path}`); }
      }
    }
  }
  for (const q of data.quizzes) {
    refs(q.pattern_ids, patternIds, q.id);
    refs(q.content_ids, contents, q.id);
    if (q.type === 'choice') refs([q.answer_option_id], unique(q.options, 'id', q.id), q.id);
    if (q.type === 'code-fill' && q.code_with_blank.split('___').length !== 2) errors.push(`${q.id}: code-fill requires exactly one ___ marker`);
  }
  return errors;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const data = await loadContent();
    const errors = await validateContent(data);
    if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
    else console.log(`Content valid: ${data.patterns.length} patterns, ${data.problems.length} problems, ${data.quizzes.length} quizzes, ${data.content.filter(p => p.status === 'ready').length}/${data.content.length} ready pages. This checks contracts, not release completeness.`);
  } catch (error) { console.error(`Content validation failed: ${error.message}`); process.exitCode = 1; }
}
