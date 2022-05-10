import { AxiosResponse } from 'axios';
import { call, takeEvery, put, all } from 'redux-saga/effects';
import { getFlights, getSearchFlights } from './flights.api';
import { setFlights, setAllFlightsLoading, setAllFlights, setLoading } from './flights.slice';

export const sagaActions = {
  FETCH_ALL_FLIGHTS: 'FETCH_ALL_FLIGHTS',
  FETCH_SEARCH_FLIGHTS: 'FETCH_SEARCH_FLIGHTS',
};

export function* fetchAllFlightsSaga() {
  yield put(setAllFlightsLoading(true));
  const result: AxiosResponse = yield call(getFlights);
  yield put(setAllFlights(result.data.data));
  yield put(setAllFlightsLoading(false));
}

export type FetchSearchFlightsAction = {
  payload: {
    departureCode: string,
    arrivalCode: string,
  }
};

export function* fetchSearchFlightsSaga({
  payload: {
    departureCode,
    arrivalCode,
  },
}: ReturnType<any>) {
  yield put(setLoading(true));
  const result: AxiosResponse = yield call(getSearchFlights, departureCode, arrivalCode);
  yield put(setFlights(result.data.data));
  yield put(setLoading(false));
}

export default function* rootSaga() {
  yield all([
    takeEvery(sagaActions.FETCH_SEARCH_FLIGHTS, fetchSearchFlightsSaga),
    takeEvery(sagaActions.FETCH_ALL_FLIGHTS, fetchAllFlightsSaga),
  ]);
}
