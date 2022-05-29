import React, { useEffect, useState } from 'react';
import reverse from 'lodash/reverse';
import sortBy from 'lodash/sortBy';
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

import { Activity, Categories, Category, Tile } from '../utils/const';
import { formatTime, getCategoriesData, getTime } from '../utils/utils';

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

export const CategoryHeading = styled.div`
  padding-top: 0.4em;
`;

const toPercent = (decimal: number) => `${(decimal * 100).toFixed(1)}%`;

const getPercent = (value: number, total: number) => {
  const ratio = total > 0 ? value / total : 0;

  return toPercent(ratio);
};

type Point = {
  dataKey?: string | number;
  name?: string;
  color?: string;
  value?: number;
};

const getSortedCategories = (tilesData: Tile[], categories: Categories) => {
  const arrayOfCategories = Object.keys(categories).map(
    category => categories[category],
  );
  const sortedCategories = sortBy(arrayOfCategories, [({ total }) => -total]);
  return sortedCategories;
};

const getSortedTiles = (tilesData: Tile[], sortedCategories: Category[]) => {
  const sortedTiles = sortedCategories.reduce((acc: Tile[], { name }) => {
    return [...acc, ...tilesData.filter(({ category }) => category === name)];
  }, []);
  return sortedTiles;
};

const renderTooltipContent = (
  o: TooltipProps<number, string>,
): React.ReactNode => {
  const { payload = [], label } = o;
  const total = payload.reduce(
    (result: number, entry: Point) => result + (entry?.value || 0),
    0,
  ) as number;

  const tiles = payload.map(
    entry =>
      ({
        id: entry.dataKey,
        activity: entry.name,
        category: entry.unit,
        time: entry.value,
        color: entry.color,
      } as Tile),
  );

  const categories = getCategoriesData(tiles);
  const sortedCategories = getSortedCategories(tiles, categories);
  const sortedTiles = getSortedTiles(tiles, sortedCategories);

  // eslint-disable-next-line no-console
  console.log(categories, sortedTiles);

  const t = getTime(total);
  const totalTime = formatTime(t.miliseconds, t.seconds, t.minutes, t.hours);

  return (
    <div className="customized-tooltip-content">
      <p className="total">{`${label} (Total: ${totalTime})`}</p>
      <ul className="list">
        {sortedCategories.map(({ name, ...props }) => {
          const c = getTime(props.total);
          const cTime = formatTime(
            c.miliseconds,
            c.seconds,
            c.minutes,
            c.hours,
          );

          return (
            <>
              <CategoryHeading>{`${name}: ${cTime}(${getPercent(
                props.total,
                total,
              )})`}</CategoryHeading>

              {sortedTiles
                .filter(({ category }) => category === name)
                .map((tile: Tile, index: number) => {
                  const time = tile.time || 0;
                  const { miliseconds, seconds, minutes, hours } =
                    getTime(time);
                  const value = formatTime(
                    miliseconds,
                    seconds,
                    minutes,
                    hours,
                  );

                  return (
                    // eslint-disable-next-line react/no-array-index-key
                    <li key={`item-${index}`} style={{ color: tile.color }}>
                      {`${tile.activity}: ${value}(${getPercent(
                        tile?.time || 0,
                        total,
                      )})`}
                    </li>
                  );
                })}
            </>
          );
        })}
      </ul>
    </div>
  );
};

const getChartData = (tilesData: Tile[], categories: Categories) => {
  const sortedCategories = getSortedCategories(tilesData, categories);
  const sortedTiles = getSortedTiles(tilesData, sortedCategories);
  const currentPoint = sortedTiles.reduce(
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
  const [data, setData] = useState(getChartData(tiles, categories));

  useEffect(() => {
    const interval = setInterval(() => {
      setData(getChartData(tiles, categories));
    }, 1000);

    return () => clearInterval(interval);
  }, [tiles, categories]);

  const sortedCategories = getSortedCategories(tiles, categories);
  const sortedTiles = getSortedTiles(tiles, sortedCategories);

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

          {reverse([...sortedTiles]).map(tile => {
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
                unit={tile.category}
              />
            );
          })}
        </AreaChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default Chart;
