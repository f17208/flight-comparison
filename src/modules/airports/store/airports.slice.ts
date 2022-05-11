import { AxiosError } from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Airport } from '../types/airports.types';
import { RootState } from '../../../app.store';

export type AirportsState = {
  airports: Airport[];
  loading: boolean;
  departureAirport: Airport | null;
  arrivalAirport: Airport | null;
  error?: AxiosError;
};

const initialState: AirportsState = {
  airports: [],
  loading: false,
  departureAirport: null,
  arrivalAirport: null,
  error: undefined,
};

export const airportsSlice = createSlice({
  name: 'Airports',
  initialState,
  reducers: {
    setAirports: (state, action: PayloadAction<Airport[]>) => {
      state.airports = action.payload;
    },
    setError: (state, action: PayloadAction<AxiosError>) => {
      state.error = action.payload;
    },
    setDepartureAirport: (state, action: PayloadAction<Airport | null>) => {
      state.departureAirport = action.payload;
    },
    setArrivalAirport: (state, action: PayloadAction<Airport | null>) => {
      state.arrivalAirport = action.payload;
    },
    swapDepartureAndArrivalAirports: (state) => {
      const { departureAirport, arrivalAirport } = state;
      const newState = {
        ...state,
        departureAirport: arrivalAirport,
        arrivalAirport: departureAirport,
      };
      Object.assign(state, newState);
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
  setAirports,
  setError,
  swapDepartureAndArrivalAirports,
  setLoading,
  setDepartureAirport,
  setArrivalAirport,
  reset,
} = airportsSlice.actions;

// selectors
export const airportsSelector = (state: RootState) => state.Airports.airports;
export const loadingSelector = (state: RootState) => state.Airports.loading;
export const errorSelector = (state: RootState) => state.Airports.error;

export const departureAirportSelector = (state: RootState) => state.Airports.departureAirport;
export const arrivalAirportSelector = (state: RootState) => state.Airports.arrivalAirport;

export default airportsSlice.reducer;
