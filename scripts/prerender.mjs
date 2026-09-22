import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { pageMetadata, render } from '../dist-ssr/entry-server.js';

const templatePath = new URL('../dist/index.html', import.meta.url);
const template = await readFile(templatePath, 'utf8');

for (const [route, metadata] of Object.entries(pageMetadata)) {
  const canonical = `https://cloudsandai.com${route}`;
  let prerendered = template.replace('<div id="root"></div>', `<div id="root">${render(route)}</div>`);
  prerendered = prerendered
    .replace(/<title>[^<]*<\/title>/, `<title>${metadata.title}</title>`)
    .replace(/(<meta name="title" content=")[^"]*(")/, `$1${metadata.title}$2`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${metadata.description}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${canonical}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${canonical}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${metadata.title}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${metadata.description}$2`)
    .replace(/(<meta name="twitter:url" content=")[^"]*(")/, `$1${canonical}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${metadata.title}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${metadata.description}$2`);

  if (route !== '/') {
    prerendered = prerendered.replace(/\s*<script id="structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/, '');
  }

  if (!prerendered.includes(`<div id="root">${render(route)}`)) {
    throw new Error(`Could not render the React root for ${route}`);
  }

  const outputPath = new URL(`../dist${route === '/' ? '' : route}/index.html`, import.meta.url);
  await mkdir(new URL('.', outputPath), { recursive: true });
  await writeFile(outputPath, prerendered);
}