import { AxiosResponse } from 'axios';
import { call, takeEvery, put } from 'redux-saga/effects';
import { getAirports } from './airports.api';
import { setAirports, setLoading } from './airports.slice';

export const sagaActions = {
  FETCH_ALL_AIRPORTS: 'FETCH_ALL_AIRPORTS',
};

export function* fetchAllAirportsSaga() {
  yield put(setLoading(true));
  const result: AxiosResponse = yield call(getAirports);
  yield put(setAirports(result.data.data));
  yield put(setLoading(false));
}

export default function* rootSaga() {
  yield takeEvery(sagaActions.FETCH_ALL_AIRPORTS, fetchAllAirportsSaga);
}
