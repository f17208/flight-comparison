import { AxiosError } from 'axios';
import { call, takeEvery, put } from 'redux-saga/effects';
import { setAirports, setLoading, setError } from './airports.slice';
import { Airport } from '../types';
import { getAirports } from '../api';

export const sagaActions = {
  FETCH_ALL_AIRPORTS: 'FETCH_ALL_AIRPORTS',
};

export function* fetchAllAirportsSaga() {
  yield put(setLoading(true));
  const {
    data,
    error,
  }: {
    data?: Airport[],
    error?: AxiosError,
  } = yield call(getAirports);

  if (error) {
    yield put(setError(error));
  }
  if (data) {
    yield put(setAirports(data));
  }
  yield put(setLoading(false));
}

export default function* rootSaga() {
  yield takeEvery(sagaActions.FETCH_ALL_AIRPORTS, fetchAllAirportsSaga);
}
