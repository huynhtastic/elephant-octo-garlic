import { spawn } from 'redux-saga/effects';
import weatherSaga from '../Features/Weather/saga';
import { saga as currentMeasureSaga } from '../pages/dashboard/features/current-measure';
import { saga as visibleMetricsSaga } from '../pages/dashboard/components/MetricsSelector/features/visible-metrics';

export default function* root() {
  yield spawn(weatherSaga);
  yield spawn(currentMeasureSaga);
  yield spawn(visibleMetricsSaga);
}