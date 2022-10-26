import React from 'react';

import { Routes, Route } from 'react-router-dom';

import { Dashboard as ProjectDashboard } from '../features/project';
import { Portals } from '../features/portals';

export const ApplicationRoutes = () => (
  <Routes>
    <Route path="/" element={<ProjectDashboard />} />
    <Route path="/portals" element={<Portals />} />
  </Routes>
);
