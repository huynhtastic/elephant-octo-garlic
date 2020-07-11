import { Container, LinearProgress, FormControlLabel, Checkbox } from '@material-ui/core';
import React, { Reducer, useReducer, useEffect } from 'react';
import { useQuery } from 'urql';

const query = `
  {
    getMetrics
  }
`;

type State = Record<string, boolean>;

interface Action {
  init?: string[];
  change?: { name: string; isChecked: boolean };
}

const VisibleMetricsReducer: Reducer<State, Action> = (state, action): State => {
  const { init, change } = action;
  if (init) {
    return init.reduce((acc, name) => {
      acc[name] = false;
      return acc;
    }, {} as State);
  }

  if (change) {
    const { name, isChecked } = change;
    return { ...state, [name]: isChecked };
  }

  // TODO:
  console.error('NO INIT OR EVENT FOUND');
  return state;
};

const Dashboard: React.FC = () => {
  const [metrics, dispatchMetrics] = useReducer(VisibleMetricsReducer, {});

  const renderMetricSelectors = (): React.ReactElement[] => {
    return Object.entries(metrics).map(
      ([name, isChecked]): React.ReactElement => {
        return (
          <FormControlLabel
            key={name}
            control={
              <Checkbox
                checked={isChecked}
                onChange={({ target: { checked } }): void => dispatchMetrics({ change: { name, isChecked: checked } })}
                name={name}
              />
            }
            label={name}
          />
        );
      },
    );
  };

  const [result] = useQuery({
    query,
  });

  const { fetching, data, error } = result;

  useEffect((): void => {
    if (!fetching && !error) {
      dispatchMetrics({ init: data.getMetrics });
    }
  }, [data, error, fetching]);

  if (fetching) return <LinearProgress />;

  return <Container>{renderMetricSelectors()}</Container>;
};

export default Dashboard;
