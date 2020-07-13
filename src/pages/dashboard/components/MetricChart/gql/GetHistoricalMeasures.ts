import { UseQueryArgs } from 'urql';

import { VisibleMetrics } from '../../MetricsSelector/features/visible-metrics';

const THIRTY_MINUTES = 1800000;

const query = `
  query GetHistoricalMeasures($measures: [MeasurementQuery!]!) {
    getMultipleMeasurements(input: $measures) {
      metric
      measurements {
        at
        value
        unit
      }
    }
  }
`;

const getVariables = (visibleMetrics: VisibleMetrics, after: number) => {
  const variables: Record<string, any>[] = [];

  return Object.entries(visibleMetrics).reduce((acc, [metricName, isVisible]) => {
    if (!isVisible) return acc;
    return [...acc, { metricName, after: after - THIRTY_MINUTES }];
  }, variables);
};

// FIXME:
export default (visibleMetrics: VisibleMetrics, after: number): UseQueryArgs<{}> => ({
  query,
  variables: { measures: getVariables(visibleMetrics, after) },
});
