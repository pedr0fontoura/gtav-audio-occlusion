import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

import { Container, Section, SectionLink } from './styles';

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <Container>
      <Section>
        <SectionLink to="/" current={pathname}>
          <FaHome size={20} />
          Home
        </SectionLink>
      </Section>
      <Section>
        <SectionLink to="/portalEntries" current={pathname}>
          Portals
        </SectionLink>
        <SectionLink to="/nodes" current={pathname}>
          Nodes
        </SectionLink>
        <SectionLink to="/portalsEntities" current={pathname}>
          Portals Entities
        </SectionLink>
        <SectionLink to="/rooms" current={pathname}>
          Rooms
        </SectionLink>
      </Section>
    </Container>
  );
};

export default Sidebar;
