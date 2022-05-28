import React, { useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';
import styled from 'styled-components';

import { Activity, Categories, Tile } from '../utils/const';
import { formatTime, getTime } from '../utils/utils';

export const ChartWrapper = styled.div`
  font-size: 0.6em;
  width: 100%;
  height: 90vh;

  .customized-tooltip-content .list {
    padding: 0.3em 0.3em 0.3em 1.3em;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 0.3em;
  }
`;

const toPercent = (decimal: number) => `${(decimal * 100).toFixed(1)}%`;

const getPercent = (value: number, total: number) => {
  const ratio = total > 0 ? value / total : 0;

  return toPercent(ratio);
};

type Point = {
  name?: string;
  color?: string;
  value?: number;
};

const renderTooltipContent = (
  o: TooltipProps<number, string>,
): React.ReactNode => {
  const { payload = [], label } = o;
  const total = payload.reduce(
    (result: number, entry: Point) => result + (entry?.value || 0),
    0,
  ) as number;

  const t = getTime(total);
  const totalTime = formatTime(t.miliseconds, t.seconds, t.minutes, t.hours);

  return (
    <div className="customized-tooltip-content">
      <p className="total">{`${label} (Total: ${totalTime})`}</p>
      <ul className="list">
        {payload.map((entry: Point, index: number) => {
          const time = entry.value || 0;
          const { miliseconds, seconds, minutes, hours } = getTime(time);
          const value = formatTime(miliseconds, seconds, minutes, hours);

          return (
            // eslint-disable-next-line react/no-array-index-key
            <li key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${value}(${getPercent(
                entry?.value || 0,
                total,
              )})`}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const getChartData = (tilesData: Tile[]) => {
  const currentPoint = tilesData.reduce(
    (acc, tile) => {
      return {
        ...acc,
        [tile.id]:
          (tile.time || 0) +
          (tile.lastTimeStamp ? Date.now() - tile.lastTimeStamp : 0),
      };
    },
    {
      x: 'Current period',
    },
  );
  return [currentPoint, currentPoint];
};

interface IProps {
  tiles: Tile[];
  categories: Categories;
}

const Chart = ({ tiles, categories }: IProps): JSX.Element => {
  const [data, setData] = useState(getChartData(tiles));

  useEffect(() => {
    const interval = setInterval(() => {
      setData(getChartData(tiles));
    }, 1000);

    return () => clearInterval(interval);
  }, [tiles]);

  return (
    <ChartWrapper>
      <ResponsiveContainer>
        <AreaChart
          width={500}
          height={400}
          data={data}
          stackOffset="expand"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" />
          <YAxis tickFormatter={toPercent} />
          <Tooltip content={renderTooltipContent} />

          {tiles.map(tile => {
            const color =
              categories[tile.category as Activity]?.color || 'yellow';

            return (
              <Area
                key={tile.id}
                name={tile.activity}
                type="monotone"
                dataKey={tile.id}
                stackId="1"
                stroke={color}
                fill={color}
              />
            );
          })}
        </AreaChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default Chart;
