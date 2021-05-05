import styled from 'styled-components';
import { Link } from 'react-router-dom';

import colors from '../../styles/colors';

interface ISectionLinkProps {
  current: string;
}

export const Container = styled.div`
  height: 100vh;
  width: 15%;
  min-width: 250px;

  flex-shrink: 0;

  padding: 16px;

  background: ${colors.primaryColor};
  border-right: 2px solid ${colors.secondaryColor};
`;

export const Section = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  & + div {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid ${colors.secondaryColor};
  }
`;

export const SectionLink = styled(Link)<ISectionLinkProps>`
  width: 100%;

  display: flex;
  align-items: center;

  padding: 16px;

  border-radius: 8px;

  font-size: 14px;
  font-weight: 600;
  color: #fff;
  text-decoration: none;

  background: ${({ to, current }) => (to === current ? 'rgba(255, 255, 255, 0.1)' : 'transparent')};

  transition: ease-in-out 0.1s;

  &:hover {
    background: rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }

  & + & {
    margin-top: 8px;
  }

  > svg {
    margin-right: 8px;
  }
`;
