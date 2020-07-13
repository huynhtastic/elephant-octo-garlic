import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as currentMeasureReducer } from '../pages/dashboard/features/current-measure';
import { reducer as metricsReducer } from '../pages/dashboard/components/MetricsSelector/features/visible-metrics';
import { reducer as chartDataReducer } from '../pages/dashboard/components/MetricChart/features/ChartData';

export default {
  weather: weatherReducer,
  visibleMetrics: metricsReducer,
  currentMeasures: currentMeasureReducer,
  chartData: chartDataReducer,
};
