import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface ISectionLinkProps {
  current: string;
}

type ContainerProps = {
  expanded?: boolean;
};

export const Container = styled.div<ContainerProps>`
  height: 100%;
  width: 100%;
  max-width: ${({ expanded }) => (expanded ? '160px' : '68px')};

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-shrink: 0;

  padding: 16px 8px;

  background: ${({ theme }) => theme.colors.gray[900]};
  border-right: 2px solid ${({ theme }) => theme.colors.gray[900]};

  transition: all 0.2s;
`;

export const Section = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const TopSection = styled(Section)``;

export const BottomSection = styled(Section)`
  margin-top: auto;
`;

export const SectionLink = styled(Link)<ISectionLinkProps>`
  width: 100%;
  height: 40px;

  min-width: 0;

  display: flex;
  justify-content: start;
  align-items: center;
  gap: 16px;

  padding: 16px;

  border-radius: 4px;

  font-size: 14px;
  font-weight: 600;
  color: #fff;
  text-decoration: none;

  overflow: hidden;

  background: ${({ to, current, theme }) => (to === current ? theme.colors.rose[600] : 'transparent')};

  transition: ease-in-out 0.1s;

  &:hover {
    background: ${({ theme }) => theme.colors.rose[600]};
    cursor: pointer;

    opacity: 0.8;
  }

  & + & {
    margin-top: 8px;
  }

  > svg {
    flex-shrink: 0;
  }
`;
