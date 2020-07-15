import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSubscription } from 'urql';

import LatestMetric from './components/LatestMetric';
import MetricChart from './components/MetricChart';
import MetricsSelector from './components/MetricsSelector/MetricsSelector';
import { actions as chartDataActions } from '../../Features/ChartData';
import { actions as currentMeasureActions } from '../../Features/CurrentMeasure';
import { IState } from '../../store';
import { Subscription } from '../../utils/schema';

const query = `
  subscription {
    newMeasurement {
      at
      value
      unit
      metric
    }
  }
`;

const useStyles = makeStyles({
  container: {
    padding: 16,
  },
});

const getVisibleMeasures = (state: IState) => state.visibleMetrics;

const Dashboard: React.FC = (): React.ReactElement => {
  const styles = useStyles();
  const [{ data, error }] = useSubscription<Subscription>({
    query,
  });

  const visibleMetrics = useSelector(getVisibleMeasures);
  const dispatch = useDispatch();

  const shouldChartRender = Object.values(visibleMetrics).includes(true);

  useEffect((): void => {
    if (error) dispatch(currentMeasureActions.handleErr(error));
    if (data) {
      const { newMeasurement } = data;
      if (newMeasurement) {
        dispatch(currentMeasureActions.storeMeasure(newMeasurement));
        if (visibleMetrics[newMeasurement.metric]) dispatch(chartDataActions.addMeasure(newMeasurement));
      }
    }
  }, [error, data, dispatch, visibleMetrics]);

  return (
    <Grid className={styles.container} container spacing={4}>
      <Grid item md={9}>
        <LatestMetric />
      </Grid>
      <Grid container item direction="column" md={3}>
        <MetricsSelector />
      </Grid>
      {shouldChartRender && (
        <Grid container item direction="column" md={12} className={styles.container}>
          <MetricChart />
        </Grid>
      )}
    </Grid>
  );
};

export default Dashboard;
