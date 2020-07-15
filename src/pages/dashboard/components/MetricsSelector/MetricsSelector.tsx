import { LinearProgress, FormControlLabel, Checkbox, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { useQuery } from 'urql';

import { actions, VisibleMetrics } from '../../../../Features/VisibleMetrics';
import { IState } from '../../../../store';

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

const MetricsSelector: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const visibleMetrics = useSelector(getVisibleMetrics);

  const [result] = useQuery({
    query,
  });

  const { fetching, data, error } = result;

  useEffect((): void => {
    if (error) dispatch(actions.handleErr(error));
    if (data) dispatch(actions.initMetrics(data.getMetrics));
  }, [data, dispatch, error]);

  if (fetching) return <LinearProgress />;

  return (
    <>
      <Typography variant="h5" component="h2">
        Metrics Available:
      </Typography>
      {renderMetricSelectors(visibleMetrics, dispatch)}
    </>
  );
});

export default MetricsSelector;
