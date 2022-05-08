import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import flightsReducer from './components/flights/flights.slice';
import flightsSaga from './components/flights/flights.saga';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    Flights: flightsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(flightsSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
