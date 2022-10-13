import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaHome, FaDoorOpen, FaShareAlt, FaCubes, FaProjectDiagram, FaWrench } from 'react-icons/fa';

import { Container, TopSection, BottomSection, SectionLink } from './styles';

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <Container>
      <TopSection>
        <SectionLink to="/" current={pathname}>
          <FaHome size={18} />
          Home
        </SectionLink>
        <SectionLink to="/#" current={pathname}>
          <FaDoorOpen size={18} />
          Portals
        </SectionLink>
        <SectionLink to="/#" current={pathname}>
          <FaCubes size={18} />
          Entities
        </SectionLink>
        <SectionLink to="/#" current={pathname}>
          <FaShareAlt size={18} />
          Nodes
        </SectionLink>
        <SectionLink to="/#" current={pathname}>
          <FaProjectDiagram size={18} />
          Rooms
        </SectionLink>
      </TopSection>
      <BottomSection>
        <SectionLink to="/#" current={pathname}>
          <FaWrench size={18} />
          Settings
        </SectionLink>
      </BottomSection>
    </Container>
  );
};

export default Sidebar;
