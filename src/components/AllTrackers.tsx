import React, { useCallback } from 'react';
import styled from 'styled-components';

import { Categories, Tile } from '../utils/const';
import { generateId, parseJSON } from '../utils/utils';
import { AddNewTile } from './AddNewTile';
import { TrackingTile } from './TrackingTile';

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

export const Divider = styled.hr`
  width: 100%;
  height: 0.2em;
  background-color: rgba(255, 255, 255, 0.3);
  border: none;

  &.red {
    background-color: red;
  }
`;

interface IProps {
  tiles: Tile[];
  categories: Categories;
  updateTiles: (tiles: Tile[]) => void;
}

const AllTrackers = ({
  tiles,
  categories,
  updateTiles,
}: IProps): JSX.Element => {
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

  const activeTiles = tiles.filter(({ lastTimeStamp }) => lastTimeStamp);

  return (
    <>
      {!!activeTiles.length && (
        <>
          <Frame>
            {activeTiles.map(data => (
              <TileWrapper key={data.id}>
                <TrackingTile
                  tileData={data}
                  updateTile={updateTile}
                  removeTile={removeTile}
                />
              </TileWrapper>
            ))}
          </Frame>

          <Divider className="red" />
        </>
      )}

      {Object.keys(categories).map(category => (
        <>
          <Frame>
            {tiles
              .filter(tile => tile.category === category)
              .map(data => (
                <TileWrapper key={data.id}>
                  <TrackingTile
                    tileData={data}
                    updateTile={updateTile}
                    removeTile={removeTile}
                  />
                </TileWrapper>
              ))}

            <AddNewTile
              addNewTile={addNewTile}
              category={categories[category]}
            />
          </Frame>

          <Divider />
        </>
      ))}
    </>
  );
};

export default AllTrackers;
