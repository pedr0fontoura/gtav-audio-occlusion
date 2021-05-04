import styled, { css } from 'styled-components';

interface IContainerProps {
  isFileSelected: boolean;
  isDraggingOver: boolean;
}

export const Container = styled.div<IContainerProps>`
  width: 100%;

  display: flex;
  align-items: center;

  padding: 12px 4px;

  border-radius: 4px;

  font-size: 14px;
  color: #fff;

  ${({ isDraggingOver, isFileSelected }) => {
    if (isFileSelected) {
      return css`
        border: 2px dashed transparent;
      `;
    }

    if (isDraggingOver) {
      return css`
        border: 2px dashed rgba(255, 255, 255);
      `;
    }

    return css`
      border: 2px dashed rgba(255, 255, 255, 0.5);
    `;
  }}

  opacity: ${({ isDraggingOver, isFileSelected }) =>
    isDraggingOver || isFileSelected ? '1.0' : '0.7'};
  transition: ease-in-out 0.1s;

  overflow: hidden;

  & + div {
    margin-top: 8px;
  }

  > svg {
    margin-right: 10px;
    flex-shrink: 0;
  }
`;

export const Text = styled.div`
  min-width: 0px;

  margin-right: 5px;

  flex-shrink: 1;
  overflow: hidden;
`;

export const RemoveButton = styled.button`
  background: none;
  outline: none;
  border: none;

  margin-left: auto;
  color: #fff;

  flex-shrink: 0;

  &:hover {
    cursor: pointer;
  }
`;
