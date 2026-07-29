// One-time interactive setup — run this yourself with `npm run strava-authorize`.
// Opens the Strava OAuth flow, walks you through approving access, exchanges
// the code for a refresh token, and saves it straight to .env. The code and
// tokens never leave your terminal.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import readline from 'node:readline/promises';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ENV_PATH = path.join(__dirname, '../.env');

const { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET } = process.env;

if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET) {
  console.error('Missing STRAVA_CLIENT_ID / STRAVA_CLIENT_SECRET in .env — add those first.');
  process.exit(1);
}

const REDIRECT_URI = 'http://localhost/exchange_token';
const SCOPE = 'activity:read_all';

const authUrl =
  `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  `&response_type=code&approval_prompt=auto&scope=${SCOPE}`;

console.log('\n1. Open this URL in your browser and click "Authorize":\n');
console.log(authUrl);
console.log(
  '\n2. You\'ll land on a "localhost can\'t be reached" error page — that\'s expected.',
);
console.log('   Copy the value after "code=" (and before "&scope=") from that page\'s address bar.\n');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const code = (await rl.question('Paste the code here: ')).trim();
rl.close();

if (!code) {
  console.error('No code entered, exiting.');
  process.exit(1);
}

const response = await fetch('https://www.strava.com/oauth/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    client_id: STRAVA_CLIENT_ID,
    client_secret: STRAVA_CLIENT_SECRET,
    code,
    grant_type: 'authorization_code',
  }),
});

if (!response.ok) {
  console.error(`Token exchange failed (${response.status}): ${await response.text()}`);
  process.exit(1);
}

const data = await response.json();

let envText = existsSync(ENV_PATH) ? readFileSync(ENV_PATH, 'utf8') : '';
const line = `STRAVA_REFRESH_TOKEN=${data.refresh_token}`;
if (/^STRAVA_REFRESH_TOKEN=.*$/m.test(envText)) {
  envText = envText.replace(/^STRAVA_REFRESH_TOKEN=.*$/m, line);
} else {
  envText = envText.replace(/\n?$/, '') + `\n${line}\n`;
}
writeFileSync(ENV_PATH, envText);

console.log(`\nDone — refresh token saved to .env for ${data.athlete?.firstname ?? 'your account'}.`);
console.log('You can now run the actual Strava fetch script.');
