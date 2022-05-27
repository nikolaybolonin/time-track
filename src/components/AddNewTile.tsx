import React, { useCallback, useState } from 'react';

import { EditForm } from './EditForm';
import { CloseButton, Tile, TileContainer } from './TrackingTile';

interface AddNewTileProps {
  addNewTile: (tileData: Tile) => void;
}

export const AddNewTile = ({ addNewTile }: AddNewTileProps): JSX.Element => {
  const [active, setActive] = useState(false);

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
          <EditForm onSave={addNewTile} />

          <CloseButton onClick={onClickX}>x</CloseButton>
        </>
      ) : (
        'Add New Tracker'
      )}
    </TileContainer>
  );
};

export default AddNewTile;
