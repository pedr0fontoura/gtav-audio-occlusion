import React, { createContext, useState, useContext } from 'react';

type Settings = {
  bulkEditPortalEntities: boolean;
};

type SettingsProviderProps = {
  children: React.ReactNode;
};

type SettingsContext = {
  settings: Settings;
};

const INITIAL_SETTINGS: Settings = {
  bulkEditPortalEntities: true,
};

const settingsContext = createContext<SettingsContext>({} as SettingsContext);

const useSettingsProvider = (): SettingsContext => {
  const [settings, setSettings] = useState(INITIAL_SETTINGS);

  return { settings };
};

export const SettingsProvider = ({ children }: SettingsProviderProps): JSX.Element => {
  const settings = useSettingsProvider();

  return <settingsContext.Provider value={settings}>{children}</settingsContext.Provider>;
};

export const useSettings = (): SettingsContext => {
  const context = useContext(settingsContext);

  if (!context) {
    throw new Error('useSettings must be used within an SettingsProvider');
  }

  return context;
};
