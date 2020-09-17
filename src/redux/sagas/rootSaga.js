import {all, fork} from 'redux-saga/effects';
import authSaga from './authSaga';
import bookingSaga from './bookingSaga';

export default function* rootSaga() {
  yield all([fork(authSaga), fork(bookingSaga)]);
}
