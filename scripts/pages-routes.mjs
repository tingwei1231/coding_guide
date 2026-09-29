import { readFile, mkdir, copyFile } from 'node:fs/promises';
import { resolve, relative, isAbsolute } from 'node:path';

const catalog = JSON.parse(await readFile('content/catalog.json', 'utf8'));
const output = resolve('dist');
for (const { route } of catalog) {
  if (route === '/') continue;
  const directory = resolve(output, route.replace(/^\//, ''));
  const path = relative(output, directory);
  if (path.startsWith('..') || isAbsolute(path)) throw new Error(`Invalid route: ${route}`);
  await mkdir(directory, { recursive: true });
  await copyFile(resolve(output, 'index.html'), resolve(directory, 'index.html'));
}
await copyFile(resolve(output, 'index.html'), resolve(output, '404.html'));
console.log(`Generated GitHub Pages entry files for ${catalog.length} routes and 404.html.`);
