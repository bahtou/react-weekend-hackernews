import { all, put, take } from 'redux-saga/effects';

import fetchHNstories from './fetchHNstories';
import processResults from './processResults';
import storeResults from './storeResults';


export const TOP_DOMAIN_CHANNEL = 'TOP_DOMAIN_CHANNEL';
export const FETCH_HN_STORIES_REQUESTED = 'FETCH_HN_STORIES_REQUESTED';
export const PROCESS_STORIES_RESULTS = 'PROCESS_STORIES_RESULTS';
export const STORE_TOP_DOMAIN_STORIES_RESULTS = 'STORE_TOP_DOMAIN_STORIES_RESULTS';


/**
 * EVENTS
 */
const defaultNumStories = 100;
export const fetchTopDomainsRequested = (storyCategory, limit=defaultNumStories) => {
  return {
    type: TOP_DOMAIN_CHANNEL,
    msg: {
      evt: FETCH_HN_STORIES_REQUESTED,
      payload: { storyCategory, limit }
    }
  };
};

/**
 * SAGA
 */
function* pipeline() {
  while (true) {
    const { msg:{ evt, payload }} = yield take(TOP_DOMAIN_CHANNEL);

    yield put({ type: evt, payload });
  }
}


export default function* topDomains() {
  yield all([
    pipeline(),
    fetchHNstories(),
    processResults(),
    storeResults()
  ]);
}
