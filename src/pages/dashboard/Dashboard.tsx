import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSubscription } from 'urql';

import LatestMetric from './components/LatestMetric';
import MetricsSelector from './components/MetricsSelector/MetricsSelector';
import { actions } from './features/current-measure';

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

const Dashboard: React.FC = (): React.ReactElement => {
  const styles = useStyles();
  const [{ data, error }] = useSubscription({
    query,
  });

  const dispatch = useDispatch();

  useEffect((): void => {
    if (error) dispatch(actions.handleErr(error));
    if (data) dispatch(actions.storeMeasure(data.newMeasurement));
  }, [error, data, dispatch]);

  return (
    <Grid className={styles.container} container spacing={2}>
      <Grid item lg={9}>
        <LatestMetric />
      </Grid>
      <Grid container item direction="column" lg={3}>
        <MetricsSelector />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
