import { all, call, put, select, take } from 'redux-saga/effects';

import hnEndpoint, { STORY } from 'Endpoints';
import {
  FETCH_HN_STORIES_REQUESTED,
  PROCESS_STORIES_RESULTS
} from './index';

const mapDomains = {
  BEST_DOMAINS: 'BEST_STORIES',
  TOP_DOMAINS: 'TOP_STORIES'
};

function* fetchHNstories() {
  while (true) {
    const { payload:{ domainCategory, limit }} = yield take(FETCH_HN_STORIES_REQUESTED);
    const storyCategory = mapDomains[domainCategory];
    let stories = yield select(state => state.STORIES[storyCategory]);

    if (stories && stories.length === 0) {
      const storyIds = yield call(hnEndpoint, storyCategory);
      const limitedStoryIds = storyIds.slice(0, limit);
      const calls = limitedStoryIds.map(storyId => call(hnEndpoint, STORY, storyId));

      stories = yield all(calls);
    }
    console.log(domainCategory);
    yield put({
      type: PROCESS_STORIES_RESULTS,
      payload: { domainCategory, stories }
    });
  }
}


export default fetchHNstories;
