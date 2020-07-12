import { PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { takeEvery, call } from 'redux-saga/effects';
import { CombinedError } from 'urql';

import { actions as WeatherActions } from './reducer';

function* apiErrorReceived({ payload: { name, message } }: PayloadAction<CombinedError>) {
  yield call(toast.error, `Error trying to get weather: ${name}: ${message}`);
}

export default function* watchApiError() {
  yield takeEvery(WeatherActions.weatherApiErrorReceived.type, apiErrorReceived);
}
