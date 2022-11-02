import React from 'react';

import { Container, Content, Header } from '@/electron/renderer/components/Page';

import { Interior } from '@/electron/renderer/features/interior';
import { useProject } from '@/electron/renderer/features/project';

import { PortalInfoEntityList } from '../PortalInfoEntityList';

const HEADER_TITLE = 'Entities';

export const Entities = (): JSX.Element => {
  const { state } = useProject();

  if (!state) {
    return null;
  }

  const headerOptionalText = `"${state.name}"`;

  return (
    <Container>
      <Header title={HEADER_TITLE} optionalText={headerOptionalText} />
      <Content>
        {state.interiors.map((interior, index) => {
          const { identifier } = interior;

          return (
            <Interior key={identifier} index={index} name={identifier}>
              <Content>
                <PortalInfoEntityList />
              </Content>
            </Interior>
          );
        })}
      </Content>
    </Container>
  );
};
