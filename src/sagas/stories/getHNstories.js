/* eslint-disable indent */
import { all, call, select, take } from 'redux-saga/effects';

import hnEndpoint, { STORY } from 'Endpoints';
import { GET_HN_STORIES_REQUESTED } from './index';


export function* fetchHNstories(storyCategory, limit) {
  let stories = yield select(state => state.STORIES[storyCategory]); // cache

  if (!stories.length) {                                             // souce
    const storyIds = yield call(hnEndpoint, storyCategory);

    const limitedStoryIds = storyIds.slice(0, limit);
    const calls = limitedStoryIds.map(storyId => call(hnEndpoint, STORY, storyId));

    stories = yield all(calls);
  }

  return stories;
}


function* getHNstories() {
  while (true) {
    const { ctx, next } = yield take(GET_HN_STORIES_REQUESTED);
    const { storyCategory, limit } = ctx.params;

    const stories = yield fetchHNstories(storyCategory, limit);

    ctx.state = { stories };
    yield next();
  }
}


export default getHNstories;
