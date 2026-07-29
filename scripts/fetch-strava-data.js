// Pulls recent runs from Strava and writes them to a static JSON file the
// site imports at build time — same pattern as the Notion/Ravelry scripts.
// Requires STRAVA_REFRESH_TOKEN in .env — run `npm run strava-authorize`
// once first if you don't have one yet.

import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

dotenv.config();

const { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN } = process.env;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, '../src/data/running.json');
const ENV_PATH = path.join(__dirname, '../.env');

function requireEnv() {
  const missing = [
    ['STRAVA_CLIENT_ID', STRAVA_CLIENT_ID],
    ['STRAVA_CLIENT_SECRET', STRAVA_CLIENT_SECRET],
    ['STRAVA_REFRESH_TOKEN', STRAVA_REFRESH_TOKEN],
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missing.length) {
    console.error(`Missing required .env values: ${missing.join(', ')}`);
    console.error('Run `npm run strava-authorize` first if you\'re missing the refresh token.');
    process.exit(1);
  }
}

// Strava may rotate the refresh token on use — save whatever it returns so
// the next run doesn't break.
function saveRefreshTokenIfChanged(newToken) {
  if (newToken === STRAVA_REFRESH_TOKEN) return;
  let envText = existsSync(ENV_PATH) ? readFileSync(ENV_PATH, 'utf8') : '';
  envText = envText.replace(/^STRAVA_REFRESH_TOKEN=.*$/m, `STRAVA_REFRESH_TOKEN=${newToken}`);
  writeFileSync(ENV_PATH, envText);
}

async function getAccessToken() {
  const response = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVA_CLIENT_SECRET,
      refresh_token: STRAVA_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  });

  if (!response.ok) {
    throw new Error(`Strava token refresh failed ${response.status}: ${await response.text()}`);
  }

  const data = await response.json();
  saveRefreshTokenIfChanged(data.refresh_token);
  return data.access_token;
}

function transformActivity(a) {
  const distanceMiles = a.distance / 1609.34;
  return {
    id: a.id,
    name: a.name,
    date: a.start_date_local,
    distanceMiles: Math.round(distanceMiles * 100) / 100,
    movingTimeSeconds: a.moving_time,
    paceSecondsPerMile: distanceMiles > 0 ? Math.round(a.moving_time / distanceMiles) : null,
  };
}

// Strava paginates activities (max 200/page) — loop until a page comes back
// short, so "all time" stats (longest run, running since) are actually
// complete rather than just the most recent ~100 activities of any type.
async function fetchAllActivities(accessToken) {
  const activities = [];
  let page = 1;
  while (true) {
    const response = await fetch(`https://www.strava.com/api/v3/athlete/activities?per_page=200&page=${page}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      throw new Error(`Strava API error ${response.status}: ${await response.text()}`);
    }

    const pageActivities = await response.json();
    activities.push(...pageActivities);
    if (pageActivities.length < 200) break;
    page += 1;
  }
  return activities;
}

async function main() {
  requireEnv();
  console.log('Fetching Strava activities...');

  const accessToken = await getAccessToken();
  const activities = await fetchAllActivities(accessToken);
  const runs = activities.filter((a) => a.type === 'Run').map(transformActivity);

  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, JSON.stringify(runs, null, 2));
  console.log(`Wrote ${runs.length} runs to ${path.relative(process.cwd(), OUTPUT_PATH)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
