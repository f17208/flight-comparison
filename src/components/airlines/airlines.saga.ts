import { AxiosResponse } from 'axios';
import { call, takeEvery, put } from 'redux-saga/effects';
import { getAirlines } from './airlines.api';
import { setAirlines, setLoading } from './airlines.slice';

export const sagaActions = {
  FETCH_ALL_AIRLINES: 'FETCH_ALL_AIRLINES',
};

export function* fetchAllAirlinesSaga() {
  yield put(setLoading(true));
  const result: AxiosResponse = yield call(getAirlines);
  yield put(setAirlines(result.data.data));
  yield put(setLoading(false));
}

export default function* rootSaga() {
  yield takeEvery(sagaActions.FETCH_ALL_AIRLINES, fetchAllAirlinesSaga);
}
