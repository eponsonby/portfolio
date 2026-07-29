// Pulls the Media Log database from Notion and writes it to a static JSON
// file the site imports at build time. Run with `npm run fetch-data`.
// Property shapes here mirror add_media.py in the Notion-Media-Tracker repo —
// keep the two in sync if the Notion database schema ever changes.

import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

dotenv.config();

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
const NOTION_VERSION = '2022-06-28';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, '../src/data/media.json');
const COVERS_DIR = path.join(__dirname, '../public/covers');

function requireEnv() {
  const missing = [
    ['NOTION_API_KEY', NOTION_API_KEY],
    ['NOTION_DATABASE_ID', NOTION_DATABASE_ID],
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missing.length) {
    console.error(`Missing required .env values: ${missing.join(', ')}`);
    console.error('Copy .env.example to .env and fill in your Notion integration secret.');
    process.exit(1);
  }
}

function plainText(richTextArray = []) {
  return richTextArray.map((t) => t.plain_text).join('');
}

// Notion returns each property in a shape specific to its type — this
// flattens the ones the Media Log actually uses down to plain values.
// `coverUrl` here is still the *source* URL (external link, TMDb/Open
// Library link, or a temporary Notion-hosted signed URL) — downloadCovers()
// below replaces it with a locally-hosted path before the file is written.
function transformPage(page) {
  const props = page.properties;
  return {
    id: page.id,
    title: plainText(props.Name?.title),
    type: props.Type?.select?.name ?? null,
    status: props.Status?.select?.name ?? null,
    rating: props.Rating?.number ?? null,
    creator: plainText(props.Creator?.rich_text) || null,
    genres: (props.Genre?.multi_select ?? []).map((g) => g.name),
    coverUrl: props.Cover?.files?.[0]?.external?.url ?? props.Cover?.files?.[0]?.file?.url ?? null,
    dateStarted: props['Date Started']?.date?.start ?? null,
    dateFinished: props['Date Finished']?.date?.start ?? null,
    recommendedBy: plainText(props['Recommended By']?.rich_text) || null,
    notes: plainText(props.Notes?.rich_text) || null,
  };
}

async function fetchAllPages() {
  const pages = [];
  let cursor;

  do {
    const response = await fetch(`https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cursor ? { start_cursor: cursor } : {}),
    });

    if (!response.ok) {
      throw new Error(`Notion API error ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();
    pages.push(...data.results);
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);

  return pages;
}

const EXTENSION_BY_CONTENT_TYPE = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/avif': 'avif',
  'image/heic': 'heic',
};

// Downloads the source cover image (whatever it is — a pasted external URL,
// a TMDb/Open Library link from add_media.py, or a temporary Notion-hosted
// signed URL) and saves it into the repo, so the site never depends on any
// of those staying reachable. Runs on every fetch — covers are small, and
// this keeps "I changed the cover in Notion" always picked up correctly
// without needing separate change-detection logic.
async function downloadCover(item) {
  if (!item.coverUrl) return null;

  try {
    const response = await fetch(item.coverUrl);
    if (!response.ok) {
      console.warn(`  cover download failed for "${item.title}" (${response.status}), leaving blank`);
      return null;
    }
    const contentType = response.headers.get('content-type')?.split(';')[0];
    const ext = EXTENSION_BY_CONTENT_TYPE[contentType] ?? 'jpg';
    const filename = `${item.id}.${ext}`;
    const buffer = Buffer.from(await response.arrayBuffer());
    await writeFile(path.join(COVERS_DIR, filename), buffer);
    return `/covers/${filename}`;
  } catch (err) {
    console.warn(`  cover download failed for "${item.title}" (${err.message}), leaving blank`);
    return null;
  }
}

async function main() {
  requireEnv();
  console.log('Fetching Media Log from Notion...');
  const pages = await fetchAllPages();
  const media = pages.map(transformPage);

  await mkdir(COVERS_DIR, { recursive: true });
  console.log(`Downloading ${media.filter((m) => m.coverUrl).length} cover images...`);
  await Promise.all(
    media.map(async (item) => {
      item.coverUrl = await downloadCover(item);
    }),
  );

  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, JSON.stringify(media, null, 2));
  console.log(`Wrote ${media.length} entries to ${path.relative(process.cwd(), OUTPUT_PATH)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
