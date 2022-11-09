import styled from 'styled-components';

export const Button = styled.button`
  height: 24px;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 8px;

  border-radius: 8px;
  border: none;

  color: white;
  font-weight: 500;

  background: ${({ theme }) => theme.colors.rose[600]};

  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.rose[700]};
  }

  > svg {
    margin-right: 8px;
  }
`;
