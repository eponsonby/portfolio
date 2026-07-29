import runs from './running.json';

// Single point of truth for how the site gets running data — see
// getMediaData.js for the same pattern applied to the Notion Media Log.
export function getRunningData() {
  return runs;
}
