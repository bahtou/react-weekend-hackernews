import { all } from 'redux-saga/effects';
import topDomainsChannel from './topDomains';


export default function* sagaCoordinator() {
  yield all([
    topDomainsChannel()
  ]);
}
