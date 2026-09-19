import { readFile, writeFile } from 'node:fs/promises';
import { render } from '../dist-ssr/entry-server.js';

const indexPath = new URL('../dist/index.html', import.meta.url);
const template = await readFile(indexPath, 'utf8');
const markup = render();
const prerendered = template.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);

if (prerendered === template) {
  throw new Error('Could not find the React root in dist/index.html');
}

await writeFile(indexPath, prerendered);