import React from 'react';

import { Container, Header, Content } from '@/electron/renderer/components/Page';

import { useSettings } from '../../context';

import { SettingsEntry, SettingsCheckbox } from './styles';

const HEADER_TITLE = 'Settings';

export const Settings = (): JSX.Element => {
  const { settings } = useSettings();

  return (
    <Container>
      <Header title={HEADER_TITLE} />
      <Content>
        <SettingsEntry>
          <SettingsCheckbox checked={settings.bulkEditPortalEntities} />
          <label>Bulk edit portal entities</label>
        </SettingsEntry>
      </Content>
    </Container>
  );
};
