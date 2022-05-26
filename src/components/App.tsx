import React, { useCallback } from 'react';
import uniqueId from 'lodash/uniqueId';
import styled from 'styled-components';

import { useLocalStorage } from '../utils/hooks';

import { parseJSON } from '../utils/utils';
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
  font-size: calc(10px + 2vmin);
  color: white;
`;

export const Header = styled.header`
  margin-bottom: 20px;
`;

export const Frame = styled.div`
  position: relative;
  width: min(100%, 600px);
  min-height: 100%;
  border: 1px solid white;
  box-sizing: border-box;

  padding: 5px;

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
  border: 4px white solid;
  margin: 5px;
  border-radius: 5%;
  transition: border 0.3s ease 0s;

  &:first-child {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }

  &:hover {
    border: 4px red solid;
  }
`;

const initialTiles = [
  {
    category: '1',
    activity: 'Coding',
  },
  {
    category: '2',
    activity: 'Working',
  },
  {
    category: '3',
    activity: 'Playing with dog',
  },
  {
    category: '3',
    activity: 'Walking with dog',
  },
  {
    category: '3',
    activity: 'Feeding the dog',
  },
  {
    category: '3',
    activity: 'Feeding the cat',
  },
  {
    category: '3',
    activity: 'Cleaning after the cat',
  },
].map(item => ({ ...item, id: uniqueId() }));

const App = (): JSX.Element => {
  const [tiles, updateTiles] = useLocalStorage('tiles', initialTiles as Tile[]);

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
          <TileWrapper key={data.activity}>
            <TrackingTile
              {...data}
              updateTile={updateTile}
              removeTile={removeTile}
            />
          </TileWrapper>
        ))}
      </Frame>
    </Body>
  );
};

export default App;
