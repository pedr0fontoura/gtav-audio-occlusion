import styled from 'styled-components';
import { lighten, darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  font-size: 0.9em;

  border-radius: 8px;

  background: ${({ theme }) => lighten(0.02, theme.colors.gray[900])};

  h2 {
    font-size: 1.2em;
  }

  h3 {
    font-weight: 500;
    font-size: 1em;

    margin-bottom: 4px;
  }

  p {
    font-size: 0.9em;
    color: ${({ theme }) => theme.colors.gray[200]};
  }
`;

export const Section = styled.section`
  width: 100%;

  display: flex;
  flex-direction: column;

  gap: 16px;

  padding: 16px;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Button = styled.button`
  width: 32px;
  height: 32px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: none;

  color: #fff;

  background: none;

  transition: 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.rose[600]};
  }
`;

export const Horizontal = styled.div`
  width: 100%;

  display: flex;
  gap: 16px;
`;

export const Entry = styled.div`
  flex: 1 1;
  flex-direction: column;

  min-width: 0;
`;

export const Path = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
