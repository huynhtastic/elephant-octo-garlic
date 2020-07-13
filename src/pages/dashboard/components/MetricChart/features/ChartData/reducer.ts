import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { CombinedError } from 'urql';

import { Measurement } from '../../../../features/current-measure';

export interface DataPoint {
  at: number;
  units: string[];
  [key: string]: any;
}

interface InitMetricData {
  metric: string;
  measurements: {
    at: number;
    unit: string;
    value: number;
  }[];
}
const initialState: DataPoint[] = [];

const slice = createSlice({
  name: 'metricData',
  initialState,
  reducers: {
    initData: (_, { payload }: PayloadAction<InitMetricData[]>) => {
      const newState = [];

      for (let i = 0; i < payload[0].measurements.length; i += 1) {
        const { at } = payload[0].measurements[i];
        const point: DataPoint = { at, units: [] };
        payload.forEach((metric): void => {
          const { value, unit } = metric.measurements[i];
          point[metric.metric] = { value, unit };

          if (!point.units.includes(unit)) point.units = [...point.units, unit];
        });
        newState.push(point);
      }

      return newState;
    },
    addMeasure: (state, action: PayloadAction<Measurement>) => {
      if (state.length < 1) return state;

      const { at, value, metric, unit } = action.payload;
      const lastPoint = state[state.length - 1];
      let newPoint: DataPoint;
      let newState = [...state];

      if (lastPoint.at === at) {
        newPoint = {
          ...lastPoint,
          [metric]: { value, unit },
        };

        if (!lastPoint.units.includes(unit)) newPoint.units = [...lastPoint.units, unit];
        newState = state.slice(0, state.length - 1);
      } else {
        newPoint = {
          at,
          units: [unit],
          [metric]: { value, unit },
        };
      }

      newState.push(newPoint);
      return newState;
    },
    handleErr: (state, action: PayloadAction<CombinedError>) => {
      const { name, message } = action.payload;
      toast.error(`Error getting chart data:\n${name}: ${message}`);
      return state;
    },
  },
});

export const { actions, reducer } = slice;
