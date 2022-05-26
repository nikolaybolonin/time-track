import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { activities } from '../utils/const';
import { CloseButton, Tile, TileContainer } from './TrackingTile';

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Input = styled.input`
  margin: 2px;
  margin-bottom: 12px;
`;

export const Label = styled.label`
  font-size: 14px;
  line-height: 14px;
`;

export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  cursor: pointer;
  font-size: 30px;
  line-height: 30px;

  &:hover {
    color: red;
  }
`;

interface AddNewTileProps {
  addNewTile: (tileData: Tile) => void;
}

const defaultTile = {
  category: activities.selftime,
  activity: 'Coding',
  time: 0,
  lastTimeStamp: 0,
};

const fields = Object.keys(defaultTile) as (keyof typeof defaultTile)[];

export const AddNewTile = ({ addNewTile }: AddNewTileProps): JSX.Element => {
  const [active, setActive] = useState(false);
  const [tile, updateTile] = useState(defaultTile as Tile);

  const onClickTile = useCallback(() => {
    if (!active) {
      setActive(true);
      // eslint-disable-next-line no-console
      console.log('test');
    }
  }, [active]);

  const onClickX = useCallback(() => {
    setActive(false);
  }, []);

  const onChangeInputValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { target } = event;
      const { id, value } = target;

      const formattedValue =
        typeof defaultTile[id as keyof typeof defaultTile] === 'number'
          ? +value
          : value;

      updateTile({
        ...tile,
        [id]: formattedValue,
      });
    },
    [tile],
  );

  const onAdd = useCallback(() => {
    return addNewTile(tile as Tile);
  }, [addNewTile, tile]);

  return (
    <TileContainer onClick={onClickTile}>
      {active ? (
        <>
          <InputsContainer>
            {fields.map(propName => (
              <>
                <Label htmlFor={propName}>{propName}</Label>
                <Input
                  id={propName}
                  key={propName}
                  placeholder={propName}
                  defaultValue={defaultTile[propName]}
                  onChange={onChangeInputValue}
                />
              </>
            ))}
            <Button onClick={onAdd}>Add</Button>
          </InputsContainer>

          <CloseButton onClick={onClickX}>x</CloseButton>
        </>
      ) : (
        'Add New Tracker'
      )}
    </TileContainer>
  );
};

export default AddNewTile;
