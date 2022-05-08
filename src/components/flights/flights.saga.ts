import { AxiosResponse } from 'axios';
import { call, takeEvery, put } from 'redux-saga/effects';
import { getFlights } from './flights.api';
import { setFlights, setLoading } from './flights.slice';

export const sagaActions = {
  FETCH_ALL_FLIGHTS: 'FETCH_ALL_FLIGHTS',
};

export function* fetchAllFlightsSaga() {
  yield put(setLoading(true));
  const result: AxiosResponse = yield call(getFlights);
  yield put(setFlights(result.data.data));
  yield put(setLoading(false));
}

export default function* rootSaga() {
  yield takeEvery(sagaActions.FETCH_ALL_FLIGHTS, fetchAllFlightsSaga);
}
