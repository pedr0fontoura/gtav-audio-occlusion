import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { FaHome, FaDoorOpen, FaCubes, FaShareAlt, FaProjectDiagram, FaWrench } from 'react-icons/fa';

import { Dashboard as ProjectDashboard } from '../features/project';
import { Portals } from '../features/portals';
import { Entities } from '../features/entities';
import { Settings } from '../features/settings';
import { Rooms } from '../features/rooms';

export enum RouteSidebarPosition {
  Top,
  Bottom,
}

const ROUTES_CONFIG = [
  {
    path: '/',
    label: 'Home',
    icon: FaHome,
    element: <ProjectDashboard />,
    active: true,
    sidebarPosition: RouteSidebarPosition.Top,
  },
  {
    path: '/portals',
    label: 'Portals',
    icon: FaDoorOpen,
    element: <Portals />,
    active: true,
    sidebarPosition: RouteSidebarPosition.Top,
  },
  {
    path: '/entities',
    label: 'Entities',
    icon: FaCubes,
    element: <Entities />,
    active: true,
    sidebarPosition: RouteSidebarPosition.Top,
  },
  {
    path: '/nodes',
    label: 'Nodes',
    icon: FaShareAlt,
    element: null,
    active: false,
    sidebarPosition: RouteSidebarPosition.Top,
  },
  {
    path: '/rooms',
    label: 'Rooms',
    icon: FaProjectDiagram,
    element: <Rooms />,
    active: true,
    sidebarPosition: RouteSidebarPosition.Top,
  },
  {
    path: '/settings',
    label: 'Settings',
    icon: FaWrench,
    element: <Settings />,
    active: true,
    sidebarPosition: RouteSidebarPosition.Bottom,
  },
];

export const getActiveRoutes = (): typeof ROUTES_CONFIG[number][] => ROUTES_CONFIG.filter(route => route.active);

export const ApplicationRoutes = (): JSX.Element => {
  const routes = getActiveRoutes();

  return (
    <Routes>
      {routes.map(route => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};
