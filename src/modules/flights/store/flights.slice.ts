import { AxiosError } from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Flight } from '../types/flights.types';
import { RootState } from '../../../app.store';

export type FlightsState = {
  allFlights: Flight[];
  foundFlights: Flight[];
  allFlightsError?: AxiosError;
  foundFlightsError?: AxiosError;
  loading: boolean;
  loadingAll: boolean;
};

const initialState: FlightsState = {
  foundFlights: [],
  allFlights: [],
  loading: false,
  loadingAll: false,
  allFlightsError: undefined,
  foundFlightsError: undefined,
};

export const flightsSlice = createSlice({
  name: 'Flights',
  initialState,
  reducers: {
    setFlights: (state, action: PayloadAction<Flight[]>) => {
      state.foundFlights = action.payload;
    },
    setAllFlights: (state, action: PayloadAction<Flight[]>) => {
      state.allFlights = action.payload;
    },
    setAllFlightsError: (state, action: PayloadAction<AxiosError | undefined>) => {
      state.allFlightsError = action.payload;
    },
    setFoundFlightsError: (state, action: PayloadAction<AxiosError | undefined>) => {
      state.foundFlightsError = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAllFlightsLoading: (state, action: PayloadAction<boolean>) => {
      state.loadingAll = action.payload;
    },
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setFlights,
  setAllFlights,
  setAllFlightsError,
  setFoundFlightsError,
  setLoading,
  setAllFlightsLoading,
  reset,
} = flightsSlice.actions;

// selectors
export const flightsSelector = (state: RootState) => state.Flights.foundFlights;
export const allFlightsSelector = (state: RootState) => state.Flights.allFlights;
export const foundFlightsErrorSelector = (state: RootState) => state.Flights.foundFlightsError;
export const allFlightsErrorSelector = (state: RootState) => state.Flights.allFlightsError;
export const loadingSelector = (state: RootState) => state.Flights.loading;
export const loadingAllSelector = (state: RootState) => state.Flights.loadingAll;

export default flightsSlice.reducer;
