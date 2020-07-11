import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type WeatherForLocation = {
  description: string;
  locationName: string;
  temperatureinCelsius: number;
};

export type ApiErrorAction = {
  error: string;
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
    // FIXME: Reintroduce error if needed
    // weatherApiErrorReceived: (state, _: PayloadAction<ApiErrorAction>) => state,
    weatherApiErrorReceived: (state) => state,
  },
});

export const { actions, reducer } = slice;
