import React from 'react';
import { FaFileDownload } from 'react-icons/fa';

import { isErr, unwrapResult } from '@/electron/common';
import { InteriorAPI } from '@/electron/common/types/interior';

import { useInterior } from '@/electron/renderer/features/interior';

import { Container, Section, SectionHeader, Horizontal, Entry, Path, Button } from './styles';

const { API } = window;

export const InteriorDashboard = (): JSX.Element => {
  const { interior } = useInterior();

  if (!interior) {
    return null;
  }

  const { identifier, mapDataFilePath, mapTypesFilePath } = interior;

  const writeNaOcclusionInteriorMetadata = async (): Promise<void> => {
    const result: Result<string, string> = await API.invoke(
      InteriorAPI.WRITE_NA_OCCLUSION_INTERIOR_METADATA,
      identifier,
    );

    if (isErr(result)) {
      console.warn(unwrapResult(result));
    }

    const filePath = unwrapResult(result);

    console.log(filePath);
  };

  const writeDat151 = async (): Promise<void> => {
    const result: Result<string, string> = await API.invoke(InteriorAPI.WRITE_DAT151, identifier);

    if (isErr(result)) {
      console.warn(unwrapResult(result));
    }

    const filePath = unwrapResult(result);

    console.log(filePath);
  };

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
          <Button onClick={writeNaOcclusionInteriorMetadata}>
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
          <Button onClick={writeDat151}>
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
