import { Container, LinearProgress, FormControlLabel, Checkbox } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useQuery } from 'urql';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../store';
import { actions, VisibleMetrics } from './utils';
import { Dispatch } from 'redux';

const query = `
  {
    getMetrics
  }
`;

const getVisibleMetrics = (state: IState): VisibleMetrics => state.visibleMetrics;

// const VisibleMetricsReducer: Reducer<State, Action> = (state, action): State => {
//   if (change) {
//     const { name, isChecked } = change;
//     return { ...state, [name]: isChecked };
//   }

//   // TODO:
//   console.error('NO INIT OR EVENT FOUND');
//   return state;
// };
const renderMetricSelectors = (visibleMetrics: VisibleMetrics, dispatch: Dispatch): React.ReactElement[] => {
  return Object.entries(visibleMetrics).map(
    ([name, isChecked]): React.ReactElement => {
      return (
        <FormControlLabel
          key={name}
          control={
            <Checkbox
              checked={isChecked}
              // onChange={({ target: { checked } }): void => dispatch(
              //   actions
              //   { change: { name, isChecked: checked } })}
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
