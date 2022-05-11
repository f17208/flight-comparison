import { AxiosError } from 'axios';
import { call, takeEvery, put, all } from 'redux-saga/effects';
import { getFlights, getSearchFlights } from '../api';
import {
  setFlights,
  setAllFlightsLoading,
  setAllFlights,
  setLoading,
  setAllFlightsError,
  setFoundFlightsError,
} from './flights.slice';

import { Flight } from '../types';

export const sagaActions = {
  FETCH_ALL_FLIGHTS: 'FETCH_ALL_FLIGHTS',
  FETCH_SEARCH_FLIGHTS: 'FETCH_SEARCH_FLIGHTS',
};

export function* fetchAllFlightsSaga() {
  yield put(setAllFlightsLoading(true));
  const { data, error }: { data?: Flight[], error?: AxiosError } = yield call(getFlights);
  if (error) {
    yield put(setAllFlightsError(error));
  }
  if (data) {
    yield put(setAllFlights(data));
  }
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
  const {
    data,
    error,
  }: {
    data?: Flight[],
    error?: AxiosError
  } = yield call(getSearchFlights, departureCode, arrivalCode);

  if (error) {
    yield put(setFoundFlightsError(error));
  }
  if (data) {
    yield put(setFlights(data));
  }
  yield put(setLoading(false));
}

export default function* rootSaga() {
  yield all([
    takeEvery(sagaActions.FETCH_SEARCH_FLIGHTS, fetchSearchFlightsSaga),
    takeEvery(sagaActions.FETCH_ALL_FLIGHTS, fetchAllFlightsSaga),
  ]);
}
