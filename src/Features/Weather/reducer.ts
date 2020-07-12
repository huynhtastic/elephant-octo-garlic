import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CombinedError } from 'urql';

export type WeatherForLocation = {
  description: string;
  locationName: string;
  temperatureinCelsius: number;
};

const initialState = {
  temperatureinCelsius: 0,
  temperatureinFahrenheit: 0,
  description: '',
  locationName: '',
};

const toF = (c: number) => (c * 9) / 5 + 32;

const slice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    weatherDataRecevied: (state, action: PayloadAction<WeatherForLocation>) => {
      const { temperatureinCelsius } = action.payload;
      Object.assign(state, { ...action.payload, temperatureinFahrenheit: toF(temperatureinCelsius) });
    },
    // no-unused vars flags this next line, but we use this definition for the saga
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    weatherApiErrorReceived: (state, _: PayloadAction<CombinedError>) => state,
  },
});

export const { actions, reducer } = slice;
