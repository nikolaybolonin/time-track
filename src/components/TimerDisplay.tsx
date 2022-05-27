import React from 'react';
import styled from 'styled-components';

import { formatTime, getTime } from '../utils/utils';

interface IProps {
  active: boolean;
  empty: boolean;
}

export const StyledTime = styled.div<IProps>`
  width: 100%;
  text-align: center;
  color: ${({ active, empty }) => (active ? 'red' : empty ? 'white' : 'lime')};
`;

interface TimerDisplayProps {
  children: number;
  active: boolean;
}

const TimerDisplay = ({ children, active }: TimerDisplayProps): JSX.Element => {
  const { miliseconds, seconds, minutes, hours } = getTime(children);

  return (
    <StyledTime active={active} empty={!children}>
      {formatTime(miliseconds, seconds, minutes, hours)}
    </StyledTime>
  );
};

export default TimerDisplay;
