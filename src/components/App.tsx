import React from 'react';
import styled from 'styled-components';

import TrackingTile from './TrackingTile';

export const Body = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  justify-content: center;
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

export const Header = styled.header`
  margin-bottom: 20px;
`;

export const Frame = styled.div`
  position: relative;
  width: min(100%, 600px);
  min-height: 100%;
  border: 1px solid white;
  box-sizing: border-box;

  padding: 5px;

  display: grid;
  grid-template-columns: minmax(50%, 100px) minmax(50%, 100px);
  grid-auto-rows: 1fr;

  &:before {
    content: '';
    width: 0;
    padding-bottom: 100%;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }
`;

export const TileWrapper = styled.div`
  background: rgba(0, 0, 0, 0.1);
  border: 4px white solid;
  margin: 5px;
  border-radius: 5%;
  transition: border 0.3s ease 0s;

  &:first-child {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }

  &:hover {
    border: 4px red solid;
  }
`;

const tiles = [
  {
    category: '1',
    activity: 'Coding',
  },
  {
    category: '2',
    activity: 'Working',
  },
  {
    category: '3',
    activity: 'Playing with dog',
  },
  {
    category: '3',
    activity: 'Walking with dog',
  },
  {
    category: '3',
    activity: 'Feeding the dog',
  },
  {
    category: '3',
    activity: 'Feeding the cat',
  },
  {
    category: '3',
    activity: 'Cleaning after the cat',
  },
];

const App = (): JSX.Element => {
  return (
    <Body>
      <Header>Timetracker</Header>
      <Frame>
        {tiles.map(data => (
          <TileWrapper key={data.activity}>
            <TrackingTile {...data} />
          </TileWrapper>
        ))}
      </Frame>
    </Body>
  );
};

export default App;
