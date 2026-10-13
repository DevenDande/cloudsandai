import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { getStructuredData, pageMetadata, render } from '../dist-ssr/entry-server.js';

const templatePath = new URL('../dist/index.html', import.meta.url);
const template = await readFile(templatePath, 'utf8');

for (const [route, metadata] of Object.entries(pageMetadata)) {
  const canonical = `https://cloudsandai.com${route}`;
  const socialImage = metadata.ogImage
    ? `https://cloudsandai.com${metadata.ogImage}`
    : 'https://cloudsandai.com/1735043718836.jpeg';
  const socialImageAlt = metadata.ogImageAlt ?? 'Deven Dande, AI/ML instructor, teaching a machine learning session';
  const socialImageType = metadata.ogImage ? 'image/png' : 'image/jpeg';
  const socialImageWidth = 1200;
  const socialImageHeight = metadata.ogImage ? 630 : 1500;
  const structuredData = getStructuredData(route);
  let prerendered = template.replace('<div id="root"></div>', `<div id="root">${render(route)}</div>`);
  prerendered = prerendered
    .replace(/<title>[^<]*<\/title>/, `<title>${metadata.title}</title>`)
    .replace(/(<meta name="title" content=")[^"]*(")/, `$1${metadata.title}$2`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${metadata.description}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${canonical}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${canonical}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${metadata.title}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${metadata.description}$2`)
    .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${socialImage}$2`)
    .replace(/(<meta property="og:image:alt" content=")[^"]*(")/, `$1${socialImageAlt}$2`)
    .replace(/(<meta property="og:image:type" content=")[^"]*(")/, `$1${socialImageType}$2`)
    .replace(/(<meta property="og:image:width" content=")[^"]*(")/, `$1${socialImageWidth}$2`)
    .replace(/(<meta property="og:image:height" content=")[^"]*(")/, `$1${socialImageHeight}$2`)
    .replace(/(<meta name="twitter:url" content=")[^"]*(")/, `$1${canonical}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${metadata.title}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${metadata.description}$2`)
    .replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${socialImage}$2`)
    .replace(/(<meta name="twitter:image:alt" content=")[^"]*(")/, `$1${socialImageAlt}$2`);

  if (structuredData) {
    const structuredDataScript = `<script id="structured-data" type="application/ld+json">${JSON.stringify(structuredData)}</script>`;
    if (/<script id="structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/.test(prerendered)) {
      prerendered = prerendered.replace(
        /<script id="structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/,
        structuredDataScript,
      );
    } else {
      prerendered = prerendered.replace('</head>', `  ${structuredDataScript}\n  </head>`);
    }
  } else {
    prerendered = prerendered.replace(/\s*<script id="structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/, '');
  }

  if (!prerendered.includes(`<div id="root">${render(route)}`)) {
    throw new Error(`Could not render the React root for ${route}`);
  }

  const outputPath = new URL(`../dist${route === '/' ? '' : route}/index.html`, import.meta.url);
  await mkdir(new URL('.', outputPath), { recursive: true });
  await writeFile(outputPath, prerendered);
}