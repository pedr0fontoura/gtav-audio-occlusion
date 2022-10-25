import React from 'react';

import { ProjectProvider } from '../features/project';

export const AppProvider = ({ children }: { children: React.ReactNode }) => (
  <ProjectProvider>{children}</ProjectProvider>
);
