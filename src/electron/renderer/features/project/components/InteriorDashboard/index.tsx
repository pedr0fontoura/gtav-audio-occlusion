import React from 'react';
import { FaFileDownload } from 'react-icons/fa';

import { useInterior } from '@/electron/renderer/features/interior';

import { Container, Section, SectionHeader, Horizontal, Entry, Path, Button } from './styles';

export const InteriorDashboard = (): JSX.Element => {
  const { interior } = useInterior();

  if (!interior) {
    return null;
  }

  const { mapDataFilePath, mapTypesFilePath } = interior;

  return (
    <Container>
      <Section>
        <SectionHeader>
          <h2>Map info</h2>
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
          <h3>Path</h3>
          <Path>...</Path>
        </Entry>
      </Section>
      <Section>
        <SectionHeader>
          <h2>naOcclusionInteriorMetadata</h2>
          <Button>
            <FaFileDownload size={18} />
          </Button>
        </SectionHeader>
        <Entry>
          <h3>Path</h3>
          <Path>...</Path>
        </Entry>
      </Section>
      <Section>
        <SectionHeader>
          <h2>Audio Game Data</h2>
          <Button>
            <FaFileDownload size={18} />
          </Button>
        </SectionHeader>
        <Entry>
          <h3>Path</h3>
          <Path>...</Path>
        </Entry>
      </Section>
    </Container>
  );
};
