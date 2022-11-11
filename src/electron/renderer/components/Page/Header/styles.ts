import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;

  padding-bottom: 8px;
  margin-bottom: 8px;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[700]};
`;

export const Left = styled.div``;

export const Title = styled.h1`
  font-size: 1.2em;
  font-weight: 700;

  > span {
    margin-left: 16px;

    font-size: 0.7em;
    font-weight: 400;
    opacity: 0.9;
  }
`;

export const Right = styled.div`
  display: flex;
  gap: 8px;
`;
