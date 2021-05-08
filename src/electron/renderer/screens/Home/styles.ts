import styled from 'styled-components';

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

  overflow-y: auto;

  padding-right: 16px;

  table {
    width: 100%;

    border-spacing: 0px;

    tr > th {
      padding: 8px;
      text-align: left;
    }

    tr > td {
      padding: 16px 8px;
    }

    tr:nth-child(even) {
      background: rgba(0, 0, 0, 0.2);
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
