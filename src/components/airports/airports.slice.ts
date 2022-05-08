import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Airport } from './airports.api';
import { RootState } from '../../app.store';

export type AirportsState = {
  airports: Airport[];
  loading: boolean;
};

const initialState: AirportsState = {
  airports: [],
  loading: false,
};

export const airportsSlice = createSlice({
  name: 'Airports',
  initialState,
  reducers: {
    setAirports: (state, action: PayloadAction<Airport[]>) => {
      state.airports = action.payload;
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
  setLoading,
  reset,
} = airportsSlice.actions;

// selectors
export const airportsSelector = (state: RootState) => state.Airports.airports;
export const loadingSelector = (state: RootState) => state.Airports.loading;

export default airportsSlice.reducer;
