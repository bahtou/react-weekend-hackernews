import { all, call, put, select, take } from 'redux-saga/effects';

import hnEndpoint, { STORY } from 'Endpoints';
import {
  FETCH_HN_STORIES_REQUESTED,
  PROCESS_STORIES_RESULTS
} from './index';


function* fetchHNstories() {
  while (true) {
    const { payload:{ storyCategory, limit }} = yield take(FETCH_HN_STORIES_REQUESTED);
    let stories = yield select(state => state[storyCategory]);

    if (stories && stories.length === 0) {
      const storyIds = yield call(hnEndpoint, storyCategory);
      const limitedStoryIds = storyIds.slice(0, limit);
      const calls = limitedStoryIds.map(storyId => call(hnEndpoint, STORY, storyId));

      stories = yield all(calls);
    }

    yield put({
      type: PROCESS_STORIES_RESULTS,
      payload: { stories }
    });
  }
}


export default fetchHNstories;
