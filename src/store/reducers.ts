import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as metricsReducer } from '../pages/dashboard/utils';

export default {
  weather: weatherReducer,
  visibleMetrics: metricsReducer,
};
