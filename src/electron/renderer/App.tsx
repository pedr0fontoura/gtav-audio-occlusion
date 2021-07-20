import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';

import { GlobalStyle } from './styles/GlobalStyles';
import colors from './styles/colors';

import Sidebar from './components/Sidebar';
import Console from './components/Console';

const Container = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  background: ${colors.bgColor};
`;

const HorizontalContainer = styled.div`
  flex-grow: 1;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  overflow-y: auto;
`;

const RoutesContainer = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;

  padding: 16px;

  h1 {
    margin-bottom: 16px;
  }

  overflow-y: auto;
`;

const App = () => {
  return (
    <Container>
      <Router>
        <HorizontalContainer>
          <Sidebar />
          <RoutesContainer>
            <Routes />
          </RoutesContainer>
        </HorizontalContainer>
      </Router>
      <Console />
    </Container>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
