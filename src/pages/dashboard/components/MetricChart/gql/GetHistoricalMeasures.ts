import { UseQueryArgs } from 'urql';

import { VisibleMetrics } from '../../../../../Features/VisibleMetrics';
import { MeasurementQuery, Measurement } from '../../../../../utils/schema';

interface Args {
  measures: MeasurementQuery[];
}

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

export interface HistoricalMeasure {
  metric: string;
  measurements: Omit<Measurement, 'metric'>[];
}

export interface GetHistoricalMeasuresData {
  getMultipleMeasurements: HistoricalMeasure[];
}

const getVariables = (visibleMetrics: VisibleMetrics, after: number): MeasurementQuery[] => {
  const variables: MeasurementQuery[] = [];

  return Object.entries(visibleMetrics).reduce((acc, [metricName, isVisible]) => {
    if (!isVisible) return acc;
    return [...acc, { metricName, after: after - THIRTY_MINUTES }];
  }, variables);
};

export default (visibleMetrics: VisibleMetrics, after: number): UseQueryArgs<Args> => ({
  query,
  variables: { measures: getVariables(visibleMetrics, after) },
});
