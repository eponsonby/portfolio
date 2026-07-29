import knitting from './knitting.json';

// Single point of truth for how the site gets knitting data — see
// getMediaData.js for the same pattern applied to the Notion Media Log.
export function getKnittingData() {
  return knitting;
}
