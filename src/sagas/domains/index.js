import { all, take } from 'redux-saga/effects';
import Pipeline from 'Pipelines';

import getHNstories from './getHNdomains';
import processResults from './processResults';
import storeResults from './storeResults';


export const TOP_DOMAIN_CHANNEL = 'TOP_DOMAIN_CHANNEL';
export const GET_HN_DOMAINS_REQUESTED = 'GET_HN_DOMAINS_REQUESTED';
export const PROCESS_STORIES_RESULTS = 'PROCESS_STORIES_RESULTS';
export const STORE_DOMAIN_RESULTS = 'STORE_DOMAIN_RESULTS';
export const CALLBACK = 'CALLBACK';


const DomainChannelPipeline = new Pipeline(TOP_DOMAIN_CHANNEL);

/**
 * EVENT Tiggers (Action Creators)
 */
const defaultNumStories = 100;
export const getTopDomainsRequested = (domainCategory, limit=defaultNumStories) =>
  DomainChannelPipeline
    .params({ domainCategory, limit })
    .use(
      GET_HN_DOMAINS_REQUESTED,
      PROCESS_STORIES_RESULTS,
      STORE_DOMAIN_RESULTS
    );

/**
 * SAGA
 */
function* pipeline() {
  while (true) {
    const { next } = yield take(TOP_DOMAIN_CHANNEL);

    yield next();
  }
}


export default function* domains() {
  yield all([
    pipeline(),
    getHNstories(),
    processResults(),
    storeResults()
  ]);
}
