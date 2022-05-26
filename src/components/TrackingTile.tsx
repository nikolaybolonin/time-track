import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

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

  /* & > * {
    width: 100%;
  } */
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
  opacity: 0.9;
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
`;

export const ResetButton = styled(CloseButton)`
  top: auto;
  bottom: 0.4em;
`;

export type Tile = {
  id: string;
  category?: string;
  activity?: string;
  time?: number;
  lastTimeStamp?: number;
};

interface TrackingTileProps extends Tile {
  updateTile: (tileData: Tile) => void;
  removeTile?: (tileData: Tile) => void;
}

export const TrackingTile = ({
  id,
  category,
  activity,
  updateTile,
  removeTile,
  ...props
}: TrackingTileProps): JSX.Element => {
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
      removeTile && removeTile({ id });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [removeTile],
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
      <Category>{category}</Category>
      <Heading>{activity}</Heading>

      {/* <span>{time}</span> */}
      <TimerDisplay active={!!lastTimeStamp}>{timer}</TimerDisplay>
      {/* <span>{lastTimeStamp}</span> */}

      {removeTile && <CloseButton onClick={onClickX}>X</CloseButton>}
      <ResetButton onClick={onClickR}>R</ResetButton>
    </TileContainer>
  );
};

export default TrackingTile;
