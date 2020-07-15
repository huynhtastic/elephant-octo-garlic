import { Card, Grid, CardContent, Typography, makeStyles } from '@material-ui/core';
import { each, isEmpty } from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';

import { CurrentMeasure } from '../../../../Features/CurrentMeasure';
import { VisibleMetrics } from '../../../../Features/VisibleMetrics';
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
): React.ReactElement | React.ReactElement[] => {
  const { visibleMetrics, currentMeasures } = metrics;
  const elements: React.ReactElement[] = [];
  each(visibleMetrics, (isVisible, metricName): void => {
    if (isVisible) {
      let measureString = 'Loading...';
      const measure = currentMeasures[metricName as keyof typeof currentMeasures];

      if (measure !== undefined) {
        measureString = `${measure.value} ${measure.unit}`;
      }

      elements.push(
        <Grid key={metricName} item md={5}>
          <Card>
            <CardContent>
              <Typography className={styles.metricTitle} variant="h5" component="h2">
                {metricName}
              </Typography>
              <Typography color="textSecondary">{measureString}</Typography>
            </CardContent>
          </Card>
        </Grid>,
      );
    }
  });

  if (!isEmpty(elements)) return elements;

  return (
    <Grid item md={12}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            Choose a metric to view data about it.
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
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
