import styled from 'styled-components';

export type ButtonProps = {
  expanded?: boolean;
};

export const Button = styled.button<ButtonProps>`
  height: 40px;

  display: flex;
  justify-content: ${({ expanded }) => (expanded ? 'flex-end' : 'flex-start')};
  align-items: center;

  margin-left: auto;
  padding: 16px;

  border-radius: 4px;
  border: none;

  color: ${({ expanded, theme }) => (expanded ? theme.colors.rose[600] : '#fff')};
  font-weight: 600;

  background: none;

  transition: ease-in-out 0.1s;

  margin-bottom: 32px;

  &:hover {
    opacity: 1;
  }
`;
