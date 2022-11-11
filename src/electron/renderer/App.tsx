import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import styled from 'styled-components';

import { GlobalStyle } from './styles/global';

import { Sidebar } from './features/sidebar';

import { AppProvider } from './hooks';
import { ApplicationRoutes } from './routes';

const Container = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  background: ${({ theme }) => theme.colors.gray[800]};

  overflow: hidden;
`;

const HorizontalContainer = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
`;

export const App = (): JSX.Element => {
  return (
    <AppProvider>
      <GlobalStyle />
      <Router>
        <Container>
          <HorizontalContainer>
            <Sidebar />
            <ApplicationRoutes />
          </HorizontalContainer>
        </Container>
      </Router>
    </AppProvider>
  );
};
