import styled from 'styled-components';
import { lighten } from 'polished';

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
    &:nth-child(2n - 1) {
      td {
        background: ${({ theme }) => lighten(0.01, theme.colors.gray[900])};
      }
    }

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
