import { put, take } from 'redux-saga/effects';
import { STORE_DOMAIN_RESULTS } from './index';


function* storeResults() {
  while (true) {
    const { ctx:{ params, state } } = yield take(STORE_DOMAIN_RESULTS);
    const { domainCategory } = params;
    const { filteredTopDomains } = state;

    yield put({
      type: `SET_${domainCategory}`,
      payload: filteredTopDomains
    });
  }
}


export default storeResults;
