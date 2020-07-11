import { Container, LinearProgress, FormControlLabel, Checkbox } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useQuery } from 'urql';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { IState } from '../../store';
import { actions, VisibleMetrics } from './utils';

const query = `
  {
    getMetrics
  }
`;

const getVisibleMetrics = (state: IState): VisibleMetrics => state.visibleMetrics;

const renderMetricSelectors = (visibleMetrics: VisibleMetrics, dispatch: Dispatch): React.ReactElement[] => {
  return Object.entries(visibleMetrics).map(
    ([name, isChecked]): React.ReactElement => {
      return (
        <FormControlLabel
          key={name}
          control={
            <Checkbox
              checked={isChecked}
              onChange={(): void => {
                dispatch(actions.toggleMetric(name));
              }}
              name={name}
            />
          }
          label={name}
        />
      );
    },
  );
};

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const visibleMetrics = useSelector(getVisibleMetrics);

  const [result] = useQuery({
    query,
  });

  const { fetching, data, error } = result;

  useEffect((): void => {
    if (data) dispatch(actions.initMetrics(data.getMetrics));
  }, [data, dispatch]);

  if (fetching) return <LinearProgress />;

  return <Container>{renderMetricSelectors(visibleMetrics, dispatch)}</Container>;
};

export default Dashboard;
