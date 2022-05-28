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
  const { id, category, activity, ...props } = tileData;

  const [editMode, setEditMode] = useState(false);
  const [time, setTime] = useState(props.time || 0);
  const [timer, setTimer] = useState(
    props.lastTimeStamp
      ? (props.time || 0) + Date.now() - props.lastTimeStamp
      : props.time || 0,
  );
  const [lastTimeStamp, setTimeStamp] = useState(props.lastTimeStamp || 0);

  const onClickTile = useCallback(() => {
    if (lastTimeStamp) {
      setTimeStamp(0);
      setTime(time + Date.now() - lastTimeStamp);
      setTimer(time + Date.now() - lastTimeStamp);
    } else {
      setTimeStamp(Date.now());
    }
  }, [lastTimeStamp, time]);

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
      setTime(data.time || 0);
      if (lastTimeStamp) {
        const timestamp = data.lastTimeStamp || Date.now();
        setTimeStamp(0);
        setTimeout(() => {
          setTimer(data.time || 0);
          setTimeStamp(timestamp);
        }, 100);
      } else {
        setTimer(data.time || 0);
        setTimeStamp(data.lastTimeStamp || 0);
      }
      updateTile(data);
      setEditMode(false);
    },
    [lastTimeStamp, updateTile],
  );

  const onClickR: React.MouseEventHandler<Element> = useCallback(
    event => {
      event.stopPropagation();
      setTime(0);
      if (lastTimeStamp) {
        const timestamp = Date.now();
        setTimeStamp(0);
        setTimeout(() => {
          setTimer(0);
          setTimeStamp(timestamp);
        }, 100);
      } else {
        setTimer(0);
      }
      updateTile({ id, time: 0 });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lastTimeStamp, updateTile],
  );

  useEffect(() => {
    updateTile({ id, time, lastTimeStamp });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastTimeStamp, updateTile]);

  useEffect(() => {
    if (lastTimeStamp) {
      const interval = setInterval(() => {
        setTimer(time + Date.now() - lastTimeStamp);
      }, 100);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastTimeStamp]);

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
