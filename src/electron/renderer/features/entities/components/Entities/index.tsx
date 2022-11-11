import React from 'react';

import { Container, Content, Header } from '@/electron/renderer/components/Page';

import { Interior } from '@/electron/renderer/features/interior';
import { useProject, NoProject } from '@/electron/renderer/features/project';

import { PortalInfoEntityList } from '../PortalInfoEntityList';

const HEADER_TITLE = 'Entities';

export const Entities = (): JSX.Element => {
  const { state } = useProject();

  if (!state) {
    return <NoProject />;
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
              <PortalInfoEntityList />
            </Interior>
          );
        })}
      </Content>
    </Container>
  );
};
