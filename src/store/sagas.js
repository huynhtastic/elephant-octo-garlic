import { spawn } from 'redux-saga/effects';
import weatherSaga from '../Features/Weather/saga';
import { saga as currentMeasureSaga } from '../pages/dashboard/features/current-measure';

export default function* root() {
  yield spawn(weatherSaga);
  yield spawn(currentMeasureSaga);
}
