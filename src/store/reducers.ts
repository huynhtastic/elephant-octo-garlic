import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as currentMeasureReducer } from '../pages/dashboard/features/current-measure';
import { reducer as metricsReducer } from '../pages/dashboard/components/MetricsSelector/utils';

export default {
  weather: weatherReducer,
  visibleMetrics: metricsReducer,
  currentMeasure: currentMeasureReducer,
};
