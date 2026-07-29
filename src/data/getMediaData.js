import media from './media.json';

// Single point of truth for how the site gets Media Log data. Today this
// reads the static JSON that scripts/fetch-notion-data.js writes at build
// time. If this ever needs to update live instead of on redeploy, only this
// function changes — swap the import for a fetch() to a serverless endpoint.
export function getMediaData() {
  return media;
}
