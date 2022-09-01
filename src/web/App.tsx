import React from 'react';
import ReactDOM from 'react-dom/client';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';

import { ApplicationRoutes } from './routes';

import { GlobalStyle } from './styles/global';
import { theme } from './styles/theme';

import Sidebar from './components/Sidebar';

const Container = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  background: ${({ theme }) => theme.colors.background.primary};
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
    <ThemeProvider theme={theme}>
      <Container>
        <Router>
          <HorizontalContainer>
            <Sidebar />
            <RoutesContainer>
              <ApplicationRoutes />
            </RoutesContainer>
          </HorizontalContainer>
        </Router>
      </Container>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
);
