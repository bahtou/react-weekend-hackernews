import { put, take } from 'redux-saga/effects';

import { STORE_STORIES_RESULTS } from './index';


function* storeResults() {
  while (true) {
    const { ctx: { params, state } } = yield take(STORE_STORIES_RESULTS);
    const { storyCategory } = params;
    const { stories } = state;

    yield put({
      type: `SET_${storyCategory}`,
      payload: stories
    });
  }
}


export default storeResults;
