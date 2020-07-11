import { Paper } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

import { VisibleMetrics } from '../MetricsSelector/utils';
import { CurrentMeasure } from '../../utils';
import { IState } from '../../../../store';

interface VisibleMeasures {
  visibleMetrics: VisibleMetrics;
  currentMeasures: CurrentMeasure;
}

const getVisibleMeasures = (state: IState): VisibleMeasures => ({
  visibleMetrics: state.visibleMetrics,
  currentMeasures: state.currentMeasure,
});

const renderLatestMetric = (metrics: VisibleMeasures): (React.ReactElement | undefined)[] => {
  const { visibleMetrics, currentMeasures } = metrics;
  return Object.entries(visibleMetrics).map(([metricName, isVisible]): React.ReactElement | undefined => {
    if (isVisible) {
      let measureString = 'Loading...';
      const measure = currentMeasures[metricName as keyof typeof currentMeasures];
      if (measure) {
        measureString = `${measure.value} ${measure.unit}`;
      }

      return (
        <Paper key={metricName}>
          {metricName} {measureString}
        </Paper>
      );
    }

    return undefined;
  });
};

const LatestMetric: React.FC = (): React.ReactElement => {
  const metrics = useSelector(getVisibleMeasures);
  return <>{renderLatestMetric(metrics)}</>;
};

export default LatestMetric;
