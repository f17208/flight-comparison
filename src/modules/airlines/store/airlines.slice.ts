import { AxiosError } from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Airline } from '../types';
import { RootState } from '../../../app.store';

export type AirlinesState = {
  airlines: Airline[];
  loading: boolean;
  error?: AxiosError;
};

const initialState: AirlinesState = {
  airlines: [],
  loading: false,
  error: undefined,
};

export const airlinesSlice = createSlice({
  name: 'Airlines',
  initialState,
  reducers: {
    setAirlines: (state, action: PayloadAction<Airline[]>) => {
      state.airlines = action.payload;
    },
    setError: (state, action: PayloadAction<AxiosError | undefined>) => {
      state.error = action.payload;
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
  setError,
  setLoading,
  reset,
} = airlinesSlice.actions;

// selectors
export const airlinesSelector = (state: RootState) => state.Airlines.airlines;
export const loadingSelector = (state: RootState) => state.Airlines.loading;
export const errorSelector = (state: RootState) => state.Airlines.error;

export default airlinesSlice.reducer;
