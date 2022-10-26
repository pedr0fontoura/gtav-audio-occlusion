import React from 'react';

import { Container, Content, Header } from '@/electron/renderer/components/Page';
import { Interior } from '@/electron/renderer/components/Interior';

import { useProject } from '../../../project';

import { PortalInfoList } from './components/PortalInfoList';

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
        {state.interiors.map((interior, index) => {
          const { identifier, naOcclusionInteriorMetadata } = interior;
          const { portalInfoList } = naOcclusionInteriorMetadata;

          return (
            <Interior index={index} name={identifier}>
              <Content>
                <PortalInfoList data={portalInfoList} />
              </Content>
            </Interior>
          );
        })}
      </Content>
    </Container>
  );
};
