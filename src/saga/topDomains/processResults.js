import { put, take } from 'redux-saga/effects';
import {
  PROCESS_STORIES_RESULTS,
  STORE_TOP_DOMAIN_STORIES_RESULTS
} from './index'


const numTopDomains = 20;

function generateTopDomains(stories) {
  const topDomains = {};

  for (const story of stories) {
    const { url, score } = story;
    if (!url) continue;

    const { hostname } = new URL(url);
    const topDomain = topDomains[hostname];

    if (!topDomain) {
      topDomains[hostname] = {
        hostname,
        score,
        numPosts: 1,
        mean: score
      };
      continue;
    }

    topDomains[hostname].score += score;
    topDomains[hostname].numPosts += 1;
    topDomains[hostname].mean = Math.round(topDomains[hostname].score / topDomains[hostname].numPosts);
  }

  return topDomains;
}

function filterTopDomains(topDomains) {
  const sorted = Object.keys(topDomains).sort((firstEl, secEl) => {
    return topDomains[secEl].score - topDomains[firstEl].score;
  });

  const filtered = sorted.slice(0, numTopDomains);

  return filtered.map((topDomain, indx) => {
    return { ...topDomains[topDomain], rank: indx + 1 };
  });
}

function* processResults() {
  while (true) {
    const { payload:{ stories }} = yield take(PROCESS_STORIES_RESULTS);
    const topDomains = generateTopDomains(stories);
    const filteredTopDomains = filterTopDomains(topDomains);

    yield put({
      type: STORE_TOP_DOMAIN_STORIES_RESULTS,
      payload: filteredTopDomains
    });
  }
}


export default processResults;
