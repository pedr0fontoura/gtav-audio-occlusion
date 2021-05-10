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
    border-radius: 4px;
    border: 2px solid rgba(255, 255, 255, 0.1);

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

  input[type='number'] {
    width: 64px;

    padding: 8px;

    border-radius: 4px;

    color: #fff;
    font-size: 16px;

    background: rgba(0, 0, 0, 0.4);
    outline: none;
    border: none;
  }

  input[type='checkbox'] {
    height: 24px;
    width: 24px;
  }
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
