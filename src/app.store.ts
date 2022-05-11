import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import flightsReducer from './modules/flights/flights.slice';
import airlinesReducer from './modules/airlines/airlines.slice';
import airportsReducer from './modules/airports/airports.slice';

import flightsSaga from './modules/flights/flights.saga';
import airlinesSaga from './modules/airlines/airlines.saga';
import airportsSaga from './modules/airports/airports.saga';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    Flights: flightsReducer,
    Airlines: airlinesReducer,
    Airports: airportsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(flightsSaga);
sagaMiddleware.run(airlinesSaga);
sagaMiddleware.run(airportsSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
