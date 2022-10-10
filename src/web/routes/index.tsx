import React from 'react';

import { Routes, Route } from 'react-router-dom';

import { Dashboard } from '../features/project';

import Nodes from '../screens/Nodes';
import PortalEntries from '../screens/PortalEntries';
import PortalsEntities from '../screens/PortalsEntities';
import Rooms from '../screens/Rooms';

export const ApplicationRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/portalEntries" element={<PortalEntries />} />
    <Route path="/nodes" element={<Nodes />} />
    <Route path="/portalsEntities" element={<PortalsEntities />} />
    <Route path="/rooms" element={<Rooms />} />
  </Routes>
);
