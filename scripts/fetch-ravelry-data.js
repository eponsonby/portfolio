// Pulls knitting projects from Ravelry and writes them to a static JSON
// file the site imports at build time — same pattern as fetch-notion-data.js.
// Run with `npm run fetch-ravelry` (or `npm run fetch-data` to refresh both
// Notion and Ravelry at once).

import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

dotenv.config();

const { RAVELRY_USERNAME, RAVELRY_PASSWORD, RAVELRY_HANDLE } = process.env;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, '../src/data/knitting.json');

function requireEnv() {
  const missing = [
    ['RAVELRY_USERNAME', RAVELRY_USERNAME],
    ['RAVELRY_PASSWORD', RAVELRY_PASSWORD],
    ['RAVELRY_HANDLE', RAVELRY_HANDLE],
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missing.length) {
    console.error(`Missing required .env values: ${missing.join(', ')}`);
    console.error('Copy .env.example to .env and fill in your Ravelry read-only key.');
    process.exit(1);
  }
}

// The "In progress" / "Finished" / "Frogged" values are confirmed from a
// real account — Ravelry may use others (e.g. "Hibernating") we haven't
// seen. Those fall into `status: "Other"` rather than getting dropped.
const KNOWN_STATUSES = new Set(['In progress', 'Finished', 'Frogged']);

function transformProject(p) {
  return {
    id: p.id,
    name: p.name,
    patternName: p.pattern_name,
    status: KNOWN_STATUSES.has(p.status_name) ? p.status_name : 'Other',
    progress: p.progress,
    started: p.started,
    completed: p.completed,
    rating: p.rating,
    url: `https://www.ravelry.com/projects/${RAVELRY_HANDLE}/${p.permalink}`,
    photoUrl: p.first_photo?.medium_url ?? null,
  };
}

async function main() {
  requireEnv();
  console.log('Fetching Ravelry projects...');

  const auth = 'Basic ' + Buffer.from(`${RAVELRY_USERNAME}:${RAVELRY_PASSWORD}`).toString('base64');
  const response = await fetch(`https://api.ravelry.com/projects/${RAVELRY_HANDLE}/list.json`, {
    headers: { Authorization: auth },
  });

  if (!response.ok) {
    throw new Error(`Ravelry API error ${response.status}: ${await response.text()}`);
  }

  const data = await response.json();
  const knitting = data.projects.filter((p) => p.craft_name === 'Knitting').map(transformProject);

  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, JSON.stringify(knitting, null, 2));
  console.log(`Wrote ${knitting.length} knitting projects to ${path.relative(process.cwd(), OUTPUT_PATH)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
