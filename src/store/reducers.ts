import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as metricsReducer } from '../pages/dashboard/components/MetricsSelector/utils';

export default {
  weather: weatherReducer,
  visibleMetrics: metricsReducer,
};
