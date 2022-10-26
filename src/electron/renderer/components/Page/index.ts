import styled from 'styled-components';

export { Header } from './Header';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  padding: 16px;
`;

export const Content = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  margin-bottom: 8px;
`;
