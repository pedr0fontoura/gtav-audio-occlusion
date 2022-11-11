import React from 'react';

import { ProjectProvider } from '@/electron/renderer/features/project';
import { SettingsProvider } from '@/electron/renderer/features/settings';

export const AppProvider = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <SettingsProvider>
    <ProjectProvider>{children}</ProjectProvider>
  </SettingsProvider>
);
