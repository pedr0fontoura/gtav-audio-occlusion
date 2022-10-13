import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';

import { GlobalStyle } from './styles/global';

import Sidebar from './components/Sidebar';

import { ApplicationRoutes } from './routes';

const Container = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  background: ${({ theme }) => theme.colors.gray[800]};
`;

const HorizontalContainer = styled.div`
  flex-grow: 1;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  overflow-y: auto;
`;

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Router>
          <HorizontalContainer>
            <Sidebar />
            <ApplicationRoutes />
          </HorizontalContainer>
        </Router>
      </Container>
    </>
  );
};
