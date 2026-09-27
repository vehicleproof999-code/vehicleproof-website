// Writes every page as real HTML into dist/, so the text is there without
// JavaScript (store reviewers, search engines, link previews). React then
// attaches to it in the browser for the scroll effects.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const template = readFileSync(join(dist, 'index.html'), 'utf8');
const { render, routes } = await import(pathToFileURL(join(root, '.ssr', 'entry-server.js')).href);

for (const route of routes) {
  const { head, html } = render(route);
  const page = template.replace('<!--app-head-->', head).replace('<!--app-html-->', html);
  const file = route.path === '/404' ? join(dist, '404.html') : join(dist, route.path, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, page);
  console.log(`  ${route.path.padEnd(18)} ${(page.length / 1024).toFixed(1)} kB`);
}
rmSync(join(root, '.ssr'), { recursive: true, force: true });
