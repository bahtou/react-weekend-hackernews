import { all, take } from 'redux-saga/effects';
import Pipeline from 'Pipelines';

import getHNstories from './getHNstories';
import refreshHNstories from './refreshHNstories';
import storeResults from './storeResults';


export const STORIES_CHANNEL = 'STORIES_CHANNEL';
export const GET_HN_STORIES_REQUESTED = 'GET_HN_STORIES_REQUESTED';
export const REFETCH_HN_STORIES_REQUESTED = 'REFETCH_HN_STORIES_REQUESTED';
export const PROCESS_STORIES_RESULTS = 'PROCESS_STORIES_RESULTS';
export const STORE_STORIES_RESULTS = 'STORE_STORIES_RESULTS';


const StoriesChannelPipeline = new Pipeline(STORIES_CHANNEL);

/**
 * EVENT Tiggers (Action Creators)
 */
const defaultNumStories = 100;
export const getStoriesRequested = (storyCategory, limit=defaultNumStories) =>
  StoriesChannelPipeline
    .params({ storyCategory, limit })
    .use(
      GET_HN_STORIES_REQUESTED,
      STORE_STORIES_RESULTS
    );

export const refreshStoriesRequested = (storyCategory, limit=defaultNumStories) =>
  StoriesChannelPipeline
    .params({ storyCategory, limit })
    .use(
      REFETCH_HN_STORIES_REQUESTED,
      STORE_STORIES_RESULTS
    );

/**
 * SAGA
 */
function* pipeline() {
  while (true) {
    const { next } = yield take(STORIES_CHANNEL);

    yield next();
  }
}


export default function* stories() {
  yield all([
    pipeline(),
    getHNstories(),
    refreshHNstories(),
    storeResults()
  ]);
}
