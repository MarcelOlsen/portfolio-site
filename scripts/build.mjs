import { createHash } from 'node:crypto';
import {
  copyFile,
  mkdir,
  readFile,
  rename,
  rm,
  stat,
  writeFile,
} from 'node:fs/promises';
import { basename, dirname, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { brotliCompressSync, constants as zlibConstants } from 'node:zlib';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distPath = join(projectRoot, 'dist');
const stagingPath = join(projectRoot, '.dist-build');

const assets = [
  'fonts/site/PPMori-400-latin.woff2',
  'fonts/site/PPMori-600-latin.woff2',
  'social/og.png',
  'social/og.mp4',
  'videos/yir-award.mp4',
  'videos/yir-poster.jpg',
];

const stableAssets = [
  { source: 'public/dot.gif', output: 'dot.gif' },
  { source: 'llms.txt', output: 'llms.txt' },
  { source: 'robots.txt', output: 'robots.txt' },
  { source: 'sitemap.xml', output: 'sitemap.xml' },
];

function contentHash(contents) {
  return createHash('sha256').update(contents).digest('hex').slice(0, 10);
}

function hashedPath(sourcePath, hash) {
  const extension = extname(sourcePath);
  const stem = basename(sourcePath, extension);
  return join(dirname(sourcePath), `${stem}.${hash}${extension}`);
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

async function assertFile(path) {
  const file = await stat(path);
  if (!file.isFile()) throw new Error(`Expected a file at ${path}`);
}

await rm(stagingPath, { recursive: true, force: true });
await mkdir(stagingPath, { recursive: true });

let html = await readFile(join(projectRoot, 'index.html'), 'utf8');
const outputAssets = [];

for (const sourcePath of assets) {
  const absoluteSource = join(projectRoot, sourcePath);
  await assertFile(absoluteSource);

  const contents = await readFile(absoluteSource);
  const outputPath = hashedPath(sourcePath, contentHash(contents));
  const absoluteOutput = join(stagingPath, outputPath);

  if (!html.includes(sourcePath)) {
    throw new Error(`index.html does not reference ${sourcePath}`);
  }

  html = html.replaceAll(sourcePath, outputPath);
  await mkdir(dirname(absoluteOutput), { recursive: true });
  await copyFile(absoluteSource, absoluteOutput);
  outputAssets.push({ path: outputPath, bytes: contents.length });
}

for (const asset of stableAssets) {
  const absoluteSource = join(projectRoot, asset.source);
  const absoluteOutput = join(stagingPath, asset.output);
  await assertFile(absoluteSource);
  await mkdir(dirname(absoluteOutput), { recursive: true });
  await copyFile(absoluteSource, absoluteOutput);
  outputAssets.push({ path: asset.output, bytes: (await stat(absoluteSource)).size });
}

for (const sourcePath of assets) {
  if (html.includes(sourcePath)) {
    throw new Error(`Unhashed asset reference remained: ${sourcePath}`);
  }
}

if (html.includes('__PPMORI_')) {
  throw new Error('An inline font placeholder remained in index.html');
}

await writeFile(join(stagingPath, 'index.html'), html);
await copyFile(join(projectRoot, '_headers'), join(stagingPath, '_headers'));

await rm(distPath, { recursive: true, force: true });
await rename(stagingPath, distPath);

const htmlBytes = Buffer.byteLength(html);
const htmlBrotliBytes = brotliCompressSync(Buffer.from(html), {
  params: { [zlibConstants.BROTLI_PARAM_QUALITY]: 11 },
}).length;

console.log(`Built ${relative(projectRoot, distPath)}/`);
console.log(`  index.html: ${formatBytes(htmlBytes)} raw, ${formatBytes(htmlBrotliBytes)} Brotli`);
for (const asset of outputAssets) {
  console.log(`  ${asset.path}: ${formatBytes(asset.bytes)}`);
}
