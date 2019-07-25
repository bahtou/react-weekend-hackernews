import { all } from 'redux-saga/effects';
import domainsChannel from './domains';


export default function* sagaCoordinator() {
  yield all([
    domainsChannel()
  ]);
}
