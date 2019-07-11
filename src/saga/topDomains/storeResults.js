import { put, take } from 'redux-saga/effects';

import { SET_TOP_DOMAINS } from 'Reducers/topDomains';
import { STORE_TOP_DOMAIN_STORIES_RESULTS } from './index'


function* storeResults() {
  while (true) {
    const { payload } = yield take(STORE_TOP_DOMAIN_STORIES_RESULTS);

    yield put({
      type: SET_TOP_DOMAINS,
      payload
    });

  }
}


export default storeResults;
