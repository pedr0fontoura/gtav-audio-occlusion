import styled, { css } from 'styled-components';

interface ITableSection {
  disabled?: boolean;
}

export const Container = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;

  h1 {
    margin-bottom: 16px;
  }
`;

export const TableContainer = styled.section`
  height: 100%;
  width: 100%;

  margin-top: 16px;

  table {
    width: 100%;

    margin-top: 8px;

    border-spacing: 0px;
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px;

    tr > th {
      padding: 8px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      text-align: left;
    }

    tr > td {
      padding: 8px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    tr:last-child > td {
      border: none;
    }

    tr:nth-child(even) {
      background: rgba(0, 0, 0, 0.2);
    }
  }
`;

export const OutputSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  > button {
    margin-top: 8px;

    font-size: 16px;
    color: #fff;

    background: none;
    border: none;
    outline: none;

    opacity: 0.7;

    &:hover {
      opacity: 1;
      cursor: pointer;
    }
  }
`;

export const TableSection = styled.div<ITableSection>`
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.2;
      pointer-events: none;
    `}

  margin-top: 24px;
`;

export const Button = styled.button`
  height: 30px;
  width: 30px;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  border: none;
  border-radius: 4px;

  outline: none;

  background: rgba(0, 0, 0, 0.5);

  color: #fff;

  transition: all ease-in-out 0.1s;

  &:hover {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.1);
  }

  & + & {
    margin-left: 8px;
  }
`;
