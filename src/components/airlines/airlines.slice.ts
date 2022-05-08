import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Airline } from './airlines.api';
import { RootState } from '../../app.store';

export type AirlinesState = {
  airlines: Airline[];
  loading: boolean;
};

const initialState: AirlinesState = {
  airlines: [],
  loading: false,
};

export const airlinesSlice = createSlice({
  name: 'Airlines',
  initialState,
  reducers: {
    setAirlines: (state, action: PayloadAction<Airline[]>) => {
      state.airlines = action.payload;
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
  setAirlines,
  setLoading,
  reset,
} = airlinesSlice.actions;

// selectors
export const airlinesSelector = (state: RootState) => state.Airlines.airlines;
export const loadingSelector = (state: RootState) => state.Airlines.loading;

export default airlinesSlice.reducer;
