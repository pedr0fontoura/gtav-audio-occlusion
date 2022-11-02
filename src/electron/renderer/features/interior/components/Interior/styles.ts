import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  gap: 16px;

  margin-bottom: 16px;
`;

export const Title = styled.h2`
  font-weight: 700;
  font-size: 1.1em;

  > span {
    margin-right: 8px;
  }
`;
