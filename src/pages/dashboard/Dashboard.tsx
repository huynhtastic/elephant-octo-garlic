import { Container } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSubscription } from 'urql';

import LatestMetric from './components/LatestMetric';
import MetricsSelector from './components/MetricsSelector/MetricsSelector';
import { actions } from './utils';

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

const Dashboard: React.FC = (): React.ReactElement => {
  const [{ data, error }] = useSubscription({
    query,
  });

  const dispatch = useDispatch();

  useEffect((): void => {
    if (error) dispatch(actions.handleErr(error));
    if (data) dispatch(actions.storeMeasure(data.newMeasurement));
  }, [error, data, dispatch]);

  return (
    <Container>
      <MetricsSelector />
      <LatestMetric />
    </Container>
  );
};

export default Dashboard;
