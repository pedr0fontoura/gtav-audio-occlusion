import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { GlobalStyle } from './styles/GlobalStyles';

import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const App = () => {
  return (
    <Container>
      <Sidebar />
      <Dashboard />
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
