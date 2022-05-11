import { AxiosError } from 'axios';
import { call, takeEvery, put } from 'redux-saga/effects';
import { getAirlines } from '../api';
import { setAirlines, setError, setLoading } from './airlines.slice';
import { Airline } from '../types';

export const sagaActions = {
  FETCH_ALL_AIRLINES: 'FETCH_ALL_AIRLINES',
};

export function* fetchAllAirlinesSaga() {
  yield put(setLoading(true));
  const {
    data,
    error,
  }: {
    data?: Airline[],
    error?: AxiosError,
  } = yield call(getAirlines);

  if (error) {
    yield put(setError(error));
  }
  if (data) {
    yield put(setAirlines(data));
  }
  yield put(setLoading(false));
}

export default function* rootSaga() {
  yield takeEvery(sagaActions.FETCH_ALL_AIRLINES, fetchAllAirlinesSaga);
}
