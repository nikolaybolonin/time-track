import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { Tile } from '../utils/const';
import { EditForm } from './EditForm';
import TimerDisplay from './TimerDisplay';

export const TileContainer = styled.div`
  position: relative;
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const Heading = styled.h4`
  width: 100%;
  text-align: center;
`;

export const Category = styled.div`
  position: absolute;
  width: 100px;
  height: 0.7em;
  top: 0.5em;
  left: 0.5em;

  font-size: 0.7em;
  line-height: 0.7em;
  opacity: 0.8;
`;

export const CloseButton = styled.div`
  position: absolute;
  width: 1em;
  height: 1em;
  top: 0.4em;
  right: 0.1em;
  overflow: visible;

  font-size: 1em;
  line-height: 1em;
  display: flex;
  justify-content: center;
  align-content: center;
  opacity: 0.8;
`;

export const ResetButton = styled(CloseButton)`
  top: auto;
  bottom: 0.4em;
`;

export const EditButton = styled(ResetButton)`
  right: auto;
  left: 0.4em;
`;

interface TrackingTileProps {
  tileData: Tile;
  updateTile: (tileData: Tile) => void;
  removeTile?: (tileData: Tile) => void;
}

export const TrackingTile = ({
  tileData,
  updateTile,
  removeTile,
}: TrackingTileProps): JSX.Element => {
  const { id, category, activity, time, lastTimeStamp } = tileData;

  const [editMode, setEditMode] = useState(false);
  const [timer, setTimer] = useState(
    lastTimeStamp ? (time || 0) + Date.now() - lastTimeStamp : time || 0,
  );

  const onClickTile = useCallback(() => {
    if (lastTimeStamp) {
      updateTile({
        id,
        time: (time || 0) + Date.now() - lastTimeStamp,
        lastTimeStamp: 0,
      });
      setTimer((time || 0) + Date.now() - lastTimeStamp);
    } else {
      updateTile({
        id,
        lastTimeStamp: Date.now(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tileData, updateTile]);

  const onClickX: React.MouseEventHandler<Element> = useCallback(
    event => {
      event.stopPropagation();
      if (editMode) {
        setEditMode(false);
      } else {
        removeTile && removeTile({ id });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [editMode, removeTile],
  );

  const onClickE: React.MouseEventHandler<Element> = useCallback(
    event => {
      event.stopPropagation();
      if (!editMode) {
        setEditMode(true);
      }
    },
    [editMode],
  );

  const onClickSave = useCallback(
    (data: Tile) => {
      updateTile(data);

      if (lastTimeStamp) {
        setTimeout(() => {
          setTimer(data.time || 0);
        }, 100);
      } else {
        setTimer(data.time || 0);
      }

      setEditMode(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lastTimeStamp, updateTile],
  );

  const onClickR: React.MouseEventHandler<Element> = useCallback(
    event => {
      event.stopPropagation();

      updateTile({
        id,
        time: 0,
        lastTimeStamp: lastTimeStamp ? Date.now() : 0,
      });
      if (lastTimeStamp) {
        setTimeout(() => {
          setTimer(0);
        }, 100);
      } else {
        setTimer(0);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tileData, updateTile],
  );

  useEffect(() => {
    if (lastTimeStamp) {
      const interval = setInterval(() => {
        setTimer((time || 0) + Date.now() - lastTimeStamp);
      }, 100);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tileData]);

  return (
    <TileContainer onClick={onClickTile}>
      {editMode ? (
        <EditForm tileData={tileData} onSave={onClickSave} />
      ) : (
        <>
          <Category>{category}</Category>
          <Heading>{activity}</Heading>

          <TimerDisplay active={!!lastTimeStamp}>{timer}</TimerDisplay>

          <ResetButton onClick={onClickR}>R</ResetButton>
          <EditButton onClick={onClickE}>E</EditButton>
        </>
      )}

      <CloseButton onClick={onClickX}>X</CloseButton>
    </TileContainer>
  );
};

export default TrackingTile;
