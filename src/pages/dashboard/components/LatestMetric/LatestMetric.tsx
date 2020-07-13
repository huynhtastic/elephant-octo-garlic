import { Card, Grid, CardContent, Typography, makeStyles } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

import { VisibleMetrics } from '../MetricsSelector/features/visible-metrics';
import { CurrentMeasure } from '../../features/current-measure';
import { IState } from '../../../../store';

interface VisibleMeasures {
  visibleMetrics: VisibleMetrics;
  currentMeasures: CurrentMeasure;
}

const getVisibleMeasures = ({ visibleMetrics, currentMeasures }: IState): VisibleMeasures => ({
  visibleMetrics,
  currentMeasures,
});

const useStyles = makeStyles({
  metricTitle: {
    marginBottom: 12,
  },
});

const renderLatestMetric = (
  metrics: VisibleMeasures,
  styles: ReturnType<typeof useStyles>,
): (React.ReactElement | undefined)[] => {
  const { visibleMetrics, currentMeasures } = metrics;
  return Object.entries(visibleMetrics).map(([metricName, isVisible]): React.ReactElement | undefined => {
    if (isVisible) {
      let measureString = 'Loading...';
      const measure = currentMeasures[metricName as keyof typeof currentMeasures];
      if (measure) {
        measureString = `${measure.value} ${measure.unit}`;
      }

      return (
        <Grid key={metricName} item md={5}>
          <Card>
            <CardContent>
              <Typography className={styles.metricTitle} variant="h5" component="h2">
                {metricName}
              </Typography>
              <Typography color="textSecondary">{measureString}</Typography>
            </CardContent>
          </Card>
        </Grid>
      );
    }

    return undefined;
  });
};

const LatestMetric: React.FC = (): React.ReactElement => {
  const metrics = useSelector(getVisibleMeasures);
  const styles = useStyles();

  return (
    <Grid container spacing={2}>
      {renderLatestMetric(metrics, styles)}
    </Grid>
  );
};

export default LatestMetric;
