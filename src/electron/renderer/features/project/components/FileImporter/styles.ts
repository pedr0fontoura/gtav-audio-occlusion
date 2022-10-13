import styled from 'styled-components';

interface IContainerProps {
  isDraggingOver: boolean;
}

export const Container = styled.div<IContainerProps>`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  flex-grow: 1;

  padding: 12px 4px;

  border-radius: 4px;

  font-size: 14px;
  color: #fff;

  border: 2px dashed rgba(255, 255, 255);

  opacity: ${({ isDraggingOver }) => (isDraggingOver ? '1.0' : '0.2')};

  transition: ease-in-out 0.1s;

  overflow: hidden;

  & + & {
    margin-left: 16px;
  }

  > svg {
    flex-shrink: 0;
  }
`;

export const Text = styled.div`
  min-width: 0px;

  margin-right: 5px;

  flex-shrink: 1;
  overflow: hidden;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;

  background: none;
  outline: none;
  border: none;

  color: rgb(255, 255, 255);

  transition: ease-in-out 0.2s;

  &:hover {
    cursor: pointer;
    transform: scale(1.5);
  }

  > svg {
    margin-right: 10px;
  }
`;

export const CallToAction = styled.h1`
  margin-top: 16px;

  font-size: 1.5em;
  font-weight: bold;
`;

export const Description = styled.p``;
