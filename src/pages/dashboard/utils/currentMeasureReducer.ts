import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { CombinedError } from 'urql';

export interface Measurement {
  at: number;
  value: number;
  metric: string;
  unit: string;
}

export type CurrentMeasure = Record<string, Omit<Measurement, 'metric'>>;

const initialState: CurrentMeasure = {};

const slice = createSlice({
  name: 'currentMeasure',
  initialState,
  reducers: {
    storeMeasure: (state, { payload: { metric, ...measure } }: PayloadAction<Measurement>) => {
      return {
        ...state,
        [metric]: measure,
      };
    },
    handleErr: (state, action: PayloadAction<CombinedError>) => {
      const { name, message } = action.payload;
      toast.error(`Error getting current measurements:\n${name}: ${message}`);
      return state;
    },
  },
});

export const { actions, reducer } = slice;
