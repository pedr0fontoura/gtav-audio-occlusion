import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
`;

export const TableContainer = styled.section`
  margin-top: 8px;

  flex-shrink: 0;
  flex-grow: 1;

  overflow-y: auto;

  table {
    width: 100%;

    border-spacing: 0 8px;

    th {
      padding: 0px 16px;
      color: rgb(255, 255, 255);
      font-weight: 600;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
    }

    td {
      padding: 16px 0px 16px 16px;
      font-size: 16px;
      font-weight: normal;
      color: rgb(255, 255, 255);
    }

    td:first-child {
      border-radius: 8px 0 0 8px;
    }

    td:last-child {
      border-radius: 0 8px 8px 0;
    }

    tr:nth-child(even) {
      background: rgba(0, 0, 0, 0.1);
    }
  }
`;

export const RemoveBtn = styled.button`
  outline: none;
  background: none;
  border: none;

  color: #fff;

  &:hover {
    cursor: pointer;
  }
`;
