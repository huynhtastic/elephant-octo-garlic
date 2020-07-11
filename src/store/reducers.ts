import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as currentMeasureReducer } from '../pages/dashboard/utils';
import { reducer as metricsReducer } from '../pages/dashboard/components/MetricsSelector/utils';

export default {
  weather: weatherReducer,
  visibleMetrics: metricsReducer,
  currentMeasure: currentMeasureReducer,
};
