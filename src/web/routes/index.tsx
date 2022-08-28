import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Home from '../screens/Home';
import Nodes from '../screens/Nodes';
import PortalEntries from '../screens/PortalEntries';
import PortalsEntities from '../screens/PortalsEntities';
import Rooms from '../screens/Rooms';

export const ApplicationRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/portalEntries" element={<PortalEntries />} />
    <Route path="/nodes" element={<Nodes />} />
    <Route path="/portalsEntities" element={<PortalsEntities />} />
    <Route path="/rooms" element={<Rooms />} />
  </Routes>
);
