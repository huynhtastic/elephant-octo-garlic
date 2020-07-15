import { CircularProgress } from '@material-ui/core';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Line, LineChart, YAxis, Legend, Tooltip, CartesianGrid, XAxis, ResponsiveContainer } from 'recharts';
import { useQuery } from 'urql';

import getHistoricalMeasures, { GetHistoricalMeasuresData } from './gql/GetHistoricalMeasures';
import generateColor from './utils/randomColorGenerator';
import { actions } from '../../../../Features/ChartData';
import { IState } from '../../../../store';

const getState = (state: IState) => state;

const getXLabel = (at: number): string => new Date(at).toTimeString().slice(0, 5);

const MetricChart: React.FC = (): React.ReactElement => {
  const [latestMeasureTime, setLatestMeasureTime] = useState(0);
  const [colors, setColors] = useState<string[]>([]);

  const dispatch = useDispatch();
  const { visibleMetrics, chartData, currentMeasures } = useSelector(getState);

  const [{ data, error, fetching }] = useQuery<GetHistoricalMeasuresData>(
    getHistoricalMeasures(visibleMetrics, latestMeasureTime),
  );

  useEffect(() => {
    const handleQueryResult = (): void => {
      if (error) {
        dispatch(actions.handleErr(error));
        return;
      }
      if (!data) return;
      dispatch(actions.initData(data.getMultipleMeasurements));
    };

    handleQueryResult();
  }, [error, data, dispatch]);

  useEffect(() => {
    const initLatestMeasureTime = (): void => {
      const isLatestMeasureTimeNotSet = latestMeasureTime === 0;
      if (isLatestMeasureTimeNotSet) {
        const currentMeasureValues = Object.values(currentMeasures);
        const thereIsCurrentMeasure = !isEmpty(currentMeasureValues);
        if (thereIsCurrentMeasure) setLatestMeasureTime(currentMeasureValues[0].at);
      }
    };

    initLatestMeasureTime();
  }, [latestMeasureTime, currentMeasures]);

  useEffect(() => {
    const generateColors = (): void => {
      const metrics = Object.keys(visibleMetrics);
      const shouldRegenColors = metrics.length !== colors.length;
      if (shouldRegenColors) {
        const newColors: string[] = metrics.map((): string => generateColor());
        setColors(newColors);
      }
    };

    generateColors();
  }, [visibleMetrics, setColors, colors]);

  if (fetching || isEmpty(chartData)) return <CircularProgress />;

  const isNewDataLoading = Object.entries(visibleMetrics).some(([metric, isVisible]) => {
    if (!isVisible) return false;
    return chartData[0][metric] === undefined;
  });
  if (isNewDataLoading) return <CircularProgress />;

  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart width={800} height={500} data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="at" tickFormatter={getXLabel} />
        <Tooltip labelFormatter={(at): string => new Date(at).toLocaleString()} />
        <Legend />
        {chartData[0].units.map((unit) => (
          // @ts-ignore: label is not defined correctly in recharts typing
          <YAxis key={unit} yAxisId={unit} label={{ value: unit, position: 'insideBottomLeft' }} />
        ))}
        {Object.entries(visibleMetrics).map(([metricName, isVisible], i) => {
          if (isVisible) {
            return (
              <Line
                yAxisId={chartData[0][metricName].unit}
                key={metricName}
                type="monotone"
                dataKey={`${metricName}.value`}
                name={metricName}
                stroke={colors[i]}
                dot={false}
              />
            );
          }
          return undefined;
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MetricChart;
