import {actionTypes} from 'config';
import {put, call, takeLatest, all} from 'redux-saga/effects';
import fetchAPI from 'services/FetchService';
import navService from 'services/NavigationService';
import {showNotification, setUserInfo, clearBookings} from 'redux/actions';

function* authLogin({type, endpoint, method, bodyParams}) {
  try {
    const res = yield call(() => fetchAPI(endpoint, method, bodyParams));
    const {status, data} = res;
    if (status != 200) {
      return;
    }

    yield put(setUserInfo({username: bodyParams.username}));
    navService.resetHomeScreen();
  } catch (error) {
    let notiMessage = 'Login failed';
    const errorData = error?.response?.data;
    if (errorData && typeof errorData == 'string') {
      notiMessage = error.response.data;
    }
    yield put(
      showNotification({
        notiMessage,
        notiType: 'error',
        notiTitle: 'Error',
      }),
    );
  }
}

function* authLogout() {
  yield put(clearBookings());
  navService.resetLogin();
}

function* watchOnLoadPaynow() {
  yield takeLatest(actionTypes.LOGIN, authLogin);
  yield takeLatest(actionTypes.LOGOUT, authLogout);
}

export default function* authSaga() {
  yield all([watchOnLoadPaynow()]);
}
