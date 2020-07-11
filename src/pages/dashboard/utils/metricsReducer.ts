import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { CombinedError } from 'urql';

export type VisibleMetrics = Record<string, boolean>;

const initialState: VisibleMetrics = {};

const slice = createSlice({
  name: 'visibleMetrics',
  initialState,
  reducers: {
    initMetrics: (state, action: PayloadAction<string[]>) =>
      action.payload.reduce((acc, name) => {
        acc[name] = false;
        return acc;
      }, state),
    toggleMetric: (state, action: PayloadAction<string>) => {
      const key = action.payload as keyof VisibleMetrics;
      return { ...state, [key]: !state[key] };
    },
    handleErr: (state, action: PayloadAction<CombinedError>) => {
      const { name, message } = action.payload;
      toast.error(`${name}: ${message}`);
      return state;
    },
  },
});

export const { actions, reducer } = slice;
