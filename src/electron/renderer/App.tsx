import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';

import { GlobalStyle } from './styles/GlobalStyles';
import colors from './styles/colors';

import Sidebar from './components/Sidebar';

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  background: ${colors.bgColor};

  overflow: hidden;
`;

const RoutesWrapper = styled.div`
  height: 100vh;
  width: 100%;
  padding: 16px;
`;

const App = () => {
  return (
    <Container>
      <Router>
        <Sidebar />
        <RoutesWrapper>
          <Routes />
        </RoutesWrapper>
      </Router>
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
