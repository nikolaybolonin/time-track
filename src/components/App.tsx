import React, { useCallback } from 'react';
import styled from 'styled-components';

import { useLocalStorage } from '../utils/hooks';

import { activities } from '../utils/const';
import { generateId, parseJSON } from '../utils/utils';
import { AddNewTile } from './AddNewTile';
import { Tile, TrackingTile } from './TrackingTile';

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

export const Header = styled.header`
  margin: 0.9em 0;
`;

export const Frame = styled.div`
  position: relative;
  width: min(100%, 1000px);
  min-height: 100%;
  box-sizing: border-box;

  padding: 0.3em;

  display: grid;
  grid-template-columns: minmax(50%, 100px) minmax(50%, 100px);
  grid-auto-rows: 1fr;

  &:before {
    content: '';
    width: 0;
    padding-bottom: 100%;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }
`;

export const TileWrapper = styled.div`
  background: rgba(0, 0, 0, 0.1);
  border: 0.2em white solid;
  margin: 0.3em;
  border-radius: 5%;
  transition: border-color 0.3s ease 0s;

  &:first-child {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }

  &:hover {
    border-color: red;
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

const App = (): JSX.Element => {
  const [tiles, updateTiles] = useLocalStorage('tiles', initialTiles as Tile[]);

  const addNewTile = useCallback(
    (tileData: Tile) => {
      if (typeof window === 'undefined') {
        return;
      }

      // get latest Tile beacuse of lack of performance of the useLocalStorage hook
      const latestTiles = parseJSON(
        window.localStorage.getItem('tiles'),
      ) as Tile[];

      const newTiles = [
        ...(latestTiles || []),
        {
          ...tileData,
          id: generateId(10),
        },
      ];

      updateTiles(newTiles);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [updateTiles],
  );

  const removeTile = useCallback(
    (tileData: Tile) => {
      if (typeof window === 'undefined') {
        return;
      }

      const { id } = tileData;
      // get latest Tile beacuse of lack of performance of the useLocalStorage hook
      const latestTiles = parseJSON(
        window.localStorage.getItem('tiles'),
      ) as Tile[];

      if (!latestTiles) {
        return;
      }

      const newTiles = latestTiles.filter(item => item.id !== id);

      updateTiles(newTiles);

      if (!newTiles.length) {
        window.localStorage.removeItem('tiles');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [updateTiles],
  );

  const updateTile = useCallback(
    (tileData: Tile) => {
      if (typeof window === 'undefined') {
        return;
      }

      const { id } = tileData;
      // get latest Tile beacuse of lack of performance of the useLocalStorage hook
      const latestTiles = parseJSON(
        window.localStorage.getItem('tiles'),
      ) as Tile[];

      if (!latestTiles) {
        return;
      }

      const newTiles = latestTiles.map(item => {
        if (item.id === id) {
          return {
            ...item,
            ...tileData,
          };
        }
        return item;
      });

      updateTiles(newTiles);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [updateTiles],
  );

  return (
    <Body>
      <Header>Timetracker</Header>
      <Frame>
        {tiles.map(data => (
          <TileWrapper key={data.id}>
            <TrackingTile
              tileData={data}
              updateTile={updateTile}
              removeTile={removeTile}
            />
          </TileWrapper>
        ))}

        <AddNewTile addNewTile={addNewTile} />
      </Frame>
    </Body>
  );
};

export default App;
