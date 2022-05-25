import React from 'react';
import styled from 'styled-components';

interface IProps {
  active: boolean;
  empty: boolean;
}

export const StyledTime = styled.div<IProps>`
  width: 100%;
  text-align: center;
  color: ${({ active, empty }) => (active ? 'red' : empty ? 'white' : 'lime')};
`;

function pad(num: number, size: number) {
  let numStr = num.toString();
  while (numStr.length < size) numStr = `0${numStr}`;
  return numStr;
}

interface TimerDisplayProps {
  children: number;
  active: boolean;
}

const TimerDisplay = ({ children, active }: TimerDisplayProps): JSX.Element => {
  const time = children / 1000;

  const hours = Math.floor(time / 3600);

  const minutesTime = time - hours * 3600;
  const minutes = Math.floor(minutesTime / 60);

  const seconds = Math.floor(minutesTime - minutes * 60);

  const miliseconds = Math.floor((children / 100) % 10);

  return (
    <StyledTime active={active} empty={!children}>{`${
      hours ? `${pad(hours, 2)}h ` : ''
    }${minutes ? `${pad(minutes, 2)}m ` : ''}${
      seconds || miliseconds
        ? `${pad(seconds, 2)}.${miliseconds || '0'}s `
        : '00.0s'
    }`}</StyledTime>
  );
};

export default TimerDisplay;
