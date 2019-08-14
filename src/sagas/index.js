import { all } from 'redux-saga/effects';

import domainsChannel from './domains';
import storiesChannel from './stories';


export default function* sagaCoordinator() {
  yield all([
    domainsChannel(),
    storiesChannel()
  ]);
}
