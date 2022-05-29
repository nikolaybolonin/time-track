import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { defaultTile, Tile } from '../utils/const';
import { getFormatedTime } from '../utils/utils';

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Input = styled.input`
  margin: 0.1em;
  margin-bottom: 0.5em;
  font-size: 0.7em;
  line-height: 0.7em;
`;

export const Label = styled.label`
  font-size: 0.7em;
  line-height: 0.7em;
`;

export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  cursor: pointer;
  font-size: 1em;
  line-height: 1em;

  &:hover {
    color: red;
  }
`;

interface EditFormProps {
  tileData?: Tile;
  onSave: (tileData: Tile) => void;
}

const fields = ['category', 'activity', 'time'] as const;

export const EditForm = ({ onSave, tileData }: EditFormProps): JSX.Element => {
  const initData = tileData || defaultTile;
  const [tile, updateTile] = useState(initData as Tile);
  const [time, updateTime] = useState(getFormatedTime(initData.time || 0));

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

      if (id === 'time') {
        updateTime(getFormatedTime(+value || 0));
      }
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

      <Label as="div">{time}</Label>

      <Button onClick={onClickButton}>Save</Button>
    </InputsContainer>
  );
};

export default EditForm;
