import { reducer as chartDataReducer } from '../Features/ChartData';
import { reducer as currentMeasureReducer } from '../Features/CurrentMeasure';
import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as metricsReducer } from '../Features/VisibleMetrics';

export default {
  weather: weatherReducer,
  visibleMetrics: metricsReducer,
  currentMeasures: currentMeasureReducer,
  chartData: chartDataReducer,
};
