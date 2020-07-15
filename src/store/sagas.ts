import { spawn } from 'redux-saga/effects';

import { saga as chartDataSaga } from '../Features/ChartData';
import { saga as currentMeasureSaga } from '../Features/CurrentMeasure';
import { saga as visibleMetricsSaga } from '../Features/VisibleMetrics';
import weatherSaga from '../Features/Weather/saga';

export default function* root() {
  yield spawn(weatherSaga);
  yield spawn(currentMeasureSaga);
  yield spawn(visibleMetricsSaga);
  yield spawn(chartDataSaga);
}
