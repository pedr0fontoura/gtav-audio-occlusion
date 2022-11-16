import React from 'react';

import { Container, Header, Content } from '@/electron/renderer/components/Page';

import { useSettings } from '../../context';

import { SettingsEntry, SettingsCheckbox } from './styles';

const HEADER_TITLE = 'Settings';

export const Settings = (): JSX.Element => {
  const { settings, updateSettings } = useSettings();

  if (!settings) {
    return null;
  }

  const { bulkEditPortalEntities, writeDebugInfoToXML } = settings;

  return (
    <Container>
      <Header title={HEADER_TITLE} />
      <Content>
        <SettingsEntry>
          <SettingsCheckbox
            checked={bulkEditPortalEntities}
            onClick={() => updateSettings({ bulkEditPortalEntities: !bulkEditPortalEntities })}
          />
          <label>Bulk edit portal entities</label>
        </SettingsEntry>
        <SettingsEntry>
          <SettingsCheckbox
            checked={writeDebugInfoToXML}
            onClick={() => updateSettings({ writeDebugInfoToXML: !writeDebugInfoToXML })}
          />
          <label>Write debug information to the generated XML</label>
        </SettingsEntry>
      </Content>
    </Container>
  );
};
