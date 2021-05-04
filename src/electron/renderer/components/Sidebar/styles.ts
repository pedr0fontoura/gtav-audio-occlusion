import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 20%;

  padding: 8px;

  background: #15121e;
  border-right: 2px solid #322d41;
`;

export const Section = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  h1 {
    font-size: 24px;
    margin-bottom: 16px;
  }

  & + div {
    margin-top: 20px;
  }
`;

export const SectionLink = styled.a`
  width: 100%;

  padding: 12px;

  border-radius: 4px;

  font-size: 16px;

  transition: ease-in-out 0.1s;

  &:hover {
    background: rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }
`;
