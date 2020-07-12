import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleErr: (state, _: PayloadAction<CombinedError>) => state,
  },
});

export const { actions, reducer } = slice;
