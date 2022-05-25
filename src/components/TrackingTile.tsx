import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import TimerDisplay from './TimerDisplay';

export const TileContainer = styled.div`
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

interface TrackingTileProps {
  // category: string;
  activity: string;
}

const TrackingTile = ({ activity }: TrackingTileProps): JSX.Element => {
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(0);
  const [lastTimeStamp, setTimeStamp] = useState(0);

  const onClickTile = useCallback(() => {
    if (lastTimeStamp) {
      setTimeStamp(0);
      setTime(time + Date.now() - lastTimeStamp);
      setTimer(time + Date.now() - lastTimeStamp);
    } else {
      setTimeStamp(Date.now());
    }
  }, [lastTimeStamp, time]);

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
    </TileContainer>
  );
};

export default TrackingTile;
