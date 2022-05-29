import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { useLocalStorage } from '../utils/hooks';

import { activities, Tile } from '../utils/const';
import { generateId, getCategoriesData } from '../utils/utils';
import AllTrackers from './AllTrackers';
import Chart from './Chart';

export const Body = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-size: calc(4vmin);
  color: white;
`;

export const Head = styled.header`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  justify-content: space-evenly;
`;

export const Heading = styled.header`
  margin: 0.9em 0;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;

const initialTiles = [
  {
    category: activities.selftime,
    activity: 'Coding',
  },
  {
    category: activities.work,
    activity: 'Working',
  },
  {
    category: activities.animals,
    activity: 'Playing with dog',
  },
  {
    category: activities.animals,
    activity: 'Walking with dog',
  },
  {
    category: activities.animals,
    activity: 'Feeding the dog',
  },
  {
    category: activities.animals,
    activity: 'Feeding the cat',
  },
  {
    category: activities.animals,
    activity: 'Cleaning after the cat',
  },
].map(item => ({
  ...item,
  id: generateId(10),
}));

type Mode = 'list' | 'chart';

const App = (): JSX.Element => {
  const [mode, setMode] = useState('list' as Mode);
  const [tiles, updateTiles] = useLocalStorage('tiles', initialTiles as Tile[]);
  const [categories, updateCategories] = useState(getCategoriesData(tiles));

  useEffect(() => {
    updateCategories(getCategoriesData(tiles));
  }, [tiles]);

  const switchToList = useCallback(() => {
    setMode('list');
  }, []);

  const switchToChart = useCallback(() => {
    setMode('chart');
  }, []);

  return (
    <Body>
      <Head>
        <Heading onClick={switchToList}>Timetracker</Heading>
        <Heading onClick={switchToChart}>Chart</Heading>
      </Head>
      {mode === 'list' && (
        <AllTrackers
          tiles={tiles}
          categories={categories}
          updateTiles={updateTiles}
        />
      )}
      {mode === 'chart' && <Chart tiles={tiles} categories={categories} />}
    </Body>
  );
};

export default App;
