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

export const CloseButton = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  top: 5px;
  right: 5px;
  overflow: visible;
`;

export type Tile = {
  id: string;
  // eslint-disable-next-line react/no-unused-prop-types
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
      <Heading>{activity}</Heading>

      {/* <span>{time}</span> */}
      <TimerDisplay active={!!lastTimeStamp}>{timer}</TimerDisplay>
      {/* <span>{lastTimeStamp}</span> */}

      {removeTile && <CloseButton onClick={onClickX}>x</CloseButton>}
    </TileContainer>
  );
};

export default TrackingTile;
