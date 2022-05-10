import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Flight } from './flights.types';
import { RootState } from '../../app.store';

export type FlightsState = {
  flights: Flight[];
  loading: boolean;
};

const initialState: FlightsState = {
  flights: [],
  loading: false,
};

export const flightsSlice = createSlice({
  name: 'Flights',
  initialState,
  reducers: {
    setFlights: (state, action: PayloadAction<Flight[]>) => {
      state.flights = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setFlights,
  setLoading,
  reset,
} = flightsSlice.actions;

// selectors
export const flightsSelector = (state: RootState) => state.Flights.flights;
export const loadingSelector = (state: RootState) => state.Flights.loading;

export default flightsSlice.reducer;
