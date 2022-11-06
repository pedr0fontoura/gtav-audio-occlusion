import styled, { css } from 'styled-components';
import { lighten } from 'polished';

type TableProps = {
  alternatedRowColors?: boolean;
};

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;

  overflow-x: auto;

  border-radius: 8px;
`;

export const Table = styled.table<TableProps>`
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

    ${({ alternatedRowColors = true }) =>
      alternatedRowColors &&
      css`
        &:nth-child(odd) {
          td {
            background: ${({ theme }) => lighten(0.01, theme.colors.gray[900])};
          }
        }
      `}
  }

  tr.odd {
    td {
      background: ${({ theme }) => lighten(0.01, theme.colors.gray[900])};
    }
  }
`;
