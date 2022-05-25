import React from 'react';
import styled from 'styled-components';

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

const App = (): JSX.Element => {
  return (
    <Body>
      <header className="App-header">Timetracker</header>
    </Body>
  );
};

export default App;
