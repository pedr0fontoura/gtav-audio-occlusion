import React from 'react';

import { Container, Content, Header } from '@/electron/renderer/components/Page';

import { useProject } from '../../../project';

import { InteriorPortals } from './components/InteriorPortals';

const HEADER_TITLE = 'Portals';

export const Portals = () => {
  const { state } = useProject();

  if (!state) {
    return null;
  }

  const headerOptionalText = `"${state.name}"`;

  return (
    <Container>
      <Header title={HEADER_TITLE} optionalText={headerOptionalText} />
      <Content>
        {state.interiors.map((interior, index) => (
          <InteriorPortals index={index} interior={interior} />
        ))}
      </Content>
    </Container>
  );
};
