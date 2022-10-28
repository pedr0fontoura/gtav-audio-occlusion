import React from 'react';
import { useLocation } from 'react-router-dom';

import { getActiveRoutes, RouteSidebarPosition } from '../../../../routes';

import { Container, TopSection, BottomSection, SectionLink } from './styles';

export const Sidebar = () => {
  const { pathname } = useLocation();

  const routes = getActiveRoutes();

  const topRoutes = routes.filter(route => route.sidebarPosition === RouteSidebarPosition.Top);
  const bottomRoutes = routes.filter(route => route.sidebarPosition === RouteSidebarPosition.Bottom);

  return (
    <Container>
      <TopSection>
        {topRoutes.map(route => (
          <SectionLink key={route.path} to={route.path} current={pathname}>
            <route.icon size={18} />
            {route.label}
          </SectionLink>
        ))}
      </TopSection>
      <BottomSection>
        {bottomRoutes.map(route => (
          <SectionLink key={route.path} to={route.path} current={pathname}>
            <route.icon size={18} />
            {route.label}
          </SectionLink>
        ))}
      </BottomSection>
    </Container>
  );
};
