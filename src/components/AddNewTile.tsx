import React, { useCallback, useState } from 'react';

import { Category, defaultTile, Tile } from '../utils/const';
import { EditForm } from './EditForm';
import { CloseButton, TileContainer } from './TrackingTile';

interface AddNewTileProps {
  addNewTile: (tileData: Tile) => void;
  category: Category;
}

export const AddNewTile = ({
  addNewTile,
  category,
}: AddNewTileProps): JSX.Element => {
  const [active, setActive] = useState(false);
  const [newTileData] = useState({
    ...defaultTile,
    category: category.name,
  } as Tile);

  const onClickTile = useCallback(() => {
    if (!active) {
      setActive(true);
    }
  }, [active]);

  const onClickX = useCallback(() => {
    setActive(false);
  }, []);

  return (
    <TileContainer onClick={onClickTile}>
      {active ? (
        <>
          <EditForm onSave={addNewTile} tileData={newTileData} />

          <CloseButton onClick={onClickX}>x</CloseButton>
        </>
      ) : (
        'Add New Tracker'
      )}
    </TileContainer>
  );
};

export default AddNewTile;
