import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import flightsReducer from './modules/flights/store/flights.slice';
import airlinesReducer from './modules/airlines/store/airlines.slice';
import airportsReducer from './modules/airports/store/airports.slice';

import flightsSaga from './modules/flights/store/flights.saga';
import airlinesSaga from './modules/airlines/store/airlines.saga';
import airportsSaga from './modules/airports/store/airports.saga';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    Flights: flightsReducer,
    Airlines: airlinesReducer,
    Airports: airportsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: { warnAfter: 128 },
    serializableCheck: { warnAfter: 128 },
  }).concat(sagaMiddleware),
});

sagaMiddleware.run(flightsSaga);
sagaMiddleware.run(airlinesSaga);
sagaMiddleware.run(airportsSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
