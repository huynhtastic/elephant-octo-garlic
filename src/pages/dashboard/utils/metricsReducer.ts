import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type VisibleMetrics = Record<string, boolean>;

const initialState: VisibleMetrics = {};

const slice = createSlice({
  name: 'visibleMetrics',
  initialState,
  reducers: {
    initMetrics: (state, action: PayloadAction<string[]>): void => {
      action.payload.reduce((acc, name) => {
        acc[name] = false;
        return acc;
      }, state);
    },
    // TODO: Handle error
    // weatherApiErrorReceived: (state) => state,
  },
});

export const { actions, reducer } = slice;
