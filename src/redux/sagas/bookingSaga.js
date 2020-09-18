import {actionTypes} from 'config';
import {put, call, takeLatest, all} from 'redux-saga/effects';
import fetchAPI from 'services/FetchService';
import {showNotification, setBookings} from 'redux/actions';
import moment from 'moment';

function* onLoadBookingSaga({type, endpoint, method, bodyParams, onSuccess}) {
  try {
    const res = yield call(() => fetchAPI(endpoint, method, bodyParams));
    const {status, data} = res;
    if (status != 200) {
      return;
    }

    switch (type) {
      case actionTypes.GET_BOOKINGS:
        const sortedArray = data.sort(
          (a, b) => moment(b.created_at) - moment(a.created_at),
        );
        yield put(setBookings(sortedArray));
        break;
      case actionTypes.CREATE_BOOKING:
        if (onSuccess) {
          onSuccess(data);
        }
        break;
      default:
        break;
    }
  } catch (error) {
    // console.log('error-saga', error, error.response);
    let notiMessage = 'API failed';
    const errorData = error?.response?.data;
    if (errorData && typeof errorData == 'string') {
      notiMessage = errorData;
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

function* watchOnLoadPaynow() {
  yield takeLatest(actionTypes.GET_BOOKINGS, onLoadBookingSaga);
  yield takeLatest(actionTypes.CREATE_BOOKING, onLoadBookingSaga);
}

export default function* authSaga() {
  yield all([watchOnLoadPaynow()]);
}
