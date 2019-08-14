import { call, put, select, take } from 'redux-saga/effects';

import { GET_HN_DOMAINS_REQUESTED } from 'Sagas/domains';
import { fetchHNstories } from 'Sagas/stories/getHNstories';


const mapDomains = {
  BEST_DOMAINS: 'BEST_STORIES',
  TOP_DOMAINS: 'TOP_STORIES'
};

function* getHNdomains() {
  while (true) {
    const { ctx, next } = yield take(GET_HN_DOMAINS_REQUESTED);
    const { domainCategory, limit } = ctx.params;

    const storyCategory = mapDomains[domainCategory];
    let stories = yield select(state => state.STORIES[storyCategory]);

    if (!stories.length) {
      stories = yield call(fetchHNstories, storyCategory, limit);

      yield put({
        type: `SET_${storyCategory}`,
        payload: stories
      });
    }

    ctx.state = { ...ctx.state, stories };
    yield next();
  }
}


export default getHNdomains;
