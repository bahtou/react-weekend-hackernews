import { put, take } from 'redux-saga/effects';

import { STORE_DOMAIN_RESULTS } from './index'


function* storeResults() {
  while (true) {
    const { payload:{ domainCategory, filteredTopDomains }} = yield take(STORE_DOMAIN_RESULTS);
    console.log(filteredTopDomains);

    yield put({
      type: `SET_${domainCategory}`,
      payload: filteredTopDomains
    });

  }
}


export default storeResults;
