import React from 'react';

import { Routes, Route } from 'react-router-dom';

import { Dashboard } from '../features/project';

export const ApplicationRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
  </Routes>
);
