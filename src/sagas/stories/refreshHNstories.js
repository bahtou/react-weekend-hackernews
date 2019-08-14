import { all, call, take } from 'redux-saga/effects';

import hnEndpoint, { STORY } from 'Endpoints';
import { REFETCH_HN_STORIES_REQUESTED } from './index';


function* refreshHNstories() {
  while (true) {
    const { ctx, next } = yield take(REFETCH_HN_STORIES_REQUESTED);
    const { storyCategory, limit } = ctx.params;

    const storyIds = yield call(hnEndpoint, storyCategory);
    const limitedStoryIds = storyIds.slice(0, limit);
    const calls = limitedStoryIds.map(storyId => call(hnEndpoint, STORY, storyId));

    const stories = yield all(calls);

    ctx.state = { stories };
    yield next();
  }
}


export default refreshHNstories;
