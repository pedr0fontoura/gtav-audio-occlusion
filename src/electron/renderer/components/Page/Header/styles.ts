import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;

  padding-bottom: 8px;
  margin-bottom: 8px;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[700]};
`;

export const Left = styled.div``;

export const Title = styled.h1`
  font-size: 1.2em;
  font-weight: 700;

  > span {
    margin-left: 16px;

    font-size: 0.7em;
    font-weight: 400;
    opacity: 0.9;
  }
`;

export const Right = styled.div`
  display: flex;
  gap: 8px;
`;

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
