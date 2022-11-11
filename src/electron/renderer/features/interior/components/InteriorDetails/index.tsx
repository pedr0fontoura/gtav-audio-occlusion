import React from 'react';

import { useInterior } from '@/electron/renderer/features/interior';

import { Container, Section, SectionHeader, Horizontal, Entry, Path } from './styles';

export const InteriorDetails = (): JSX.Element => {
  const { interior } = useInterior();

  if (!interior) {
    return null;
  }

  const { mapDataFilePath, mapTypesFilePath, path } = interior;

  return (
    <Container>
      <Section>
        <SectionHeader>
          <h2>Interior details</h2>
        </SectionHeader>
        <Horizontal>
          <Entry>
            <h3>Map data (#map)</h3>
            <Path>{mapDataFilePath}</Path>
          </Entry>
          <Entry>
            <h3>Map types (#typ)</h3>
            <Path>{mapTypesFilePath}</Path>
          </Entry>
        </Horizontal>
        <Entry>
          <h3>Target path</h3>
          <Path>{path}</Path>
        </Entry>
      </Section>
    </Container>
  );
};
