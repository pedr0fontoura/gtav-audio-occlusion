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

export const RemoveInteriorButton = styled.button`
  color: ${({ theme }) => theme.colors.rose[600]};
  text-decoration: underline;

  border: none;
  background: none;

  transition: color 0.1s;

  &:hover {
    color: ${({ theme }) => theme.colors.rose[700]};
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  h3 {
    font-size: 1em;
    font-weight: 500;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

export const Table = styled.table`
  width: 100%;

  border-collapse: collapse;

  tr > * {
    padding: 0 8px;
  }

  th {
    height: 32px;

    border: none;
    margin: none;

    font-size: 0.8em;
    font-weight: 500;

    background: ${({ theme }) => theme.colors.gray[700]};

    text-align: start;

    &:nth-child(1) {
      border-radius: 8px 0 0 0;
    }

    &:nth-last-child(1) {
      border-radius: 0 8px 0 0;
    }
  }

  td {
    height: 40px;

    font-size: 0.8em;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.gray[400]};

    background: ${({ theme }) => theme.colors.gray[900]};
  }

  tr {
    &:nth-last-child(1) {
      td {
        &:nth-child(1) {
          border-radius: 0 0 0 8px;
        }

        &:nth-last-child(1) {
          border-radius: 0 0 8px 0;
        }
      }
    }
  }
`;
