import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { defaultTile, Tile } from '../utils/const';

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

interface EditFormProps {
  tileData?: Tile;
  onSave: (tileData: Tile) => void;
}

const fields = Object.keys(defaultTile) as (keyof typeof defaultTile)[];

export const EditForm = ({ onSave, tileData }: EditFormProps): JSX.Element => {
  const initData = tileData || defaultTile;
  const [tile, updateTile] = useState(initData as Tile);

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

  const onClickButton = useCallback(() => {
    return onSave(tile as Tile);
  }, [onSave, tile]);

  const onClickWrapper: React.MouseEventHandler<Element> = useCallback(
    event => {
      event.stopPropagation();
    },
    [],
  );

  return (
    <InputsContainer onClick={onClickWrapper}>
      {fields.map(propName => (
        <>
          <Label htmlFor={propName}>{propName}</Label>
          <Input
            id={propName}
            key={propName}
            placeholder={propName}
            defaultValue={initData[propName]}
            onChange={onChangeInputValue}
          />
        </>
      ))}
      <Button onClick={onClickButton}>Save</Button>
    </InputsContainer>
  );
};

export default EditForm;
