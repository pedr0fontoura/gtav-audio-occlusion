import React from 'react';
import { FaSave } from 'react-icons/fa';

import { isErr, unwrapResult } from '@/electron/common';
import { InteriorAPI } from '@/electron/common/types/interior';

import { useInterior } from '@/electron/renderer/features/interior';

import { Container, Section, SectionHeader, Horizontal, Entry, Path, StyledButton } from './styles';

const { API } = window;

export const InteriorDashboard = (): JSX.Element => {
  const { interior, fetchInterior } = useInterior();

  if (!interior) {
    return null;
  }

  const {
    identifier,
    path,
    mapDataFilePath,
    mapTypesFilePath,
    naOcclusionInteriorMetadataPath,
    audioGameDataPath,
  } = interior;

  const writeNaOcclusionInteriorMetadata = async (): Promise<void> => {
    const result: Result<string, string> = await API.invoke(
      InteriorAPI.WRITE_NA_OCCLUSION_INTERIOR_METADATA,
      identifier,
    );

    if (isErr(result)) {
      console.warn(unwrapResult(result));
    }

    fetchInterior();
  };

  const writeDat151 = async (): Promise<void> => {
    const result: Result<string, string> = await API.invoke(InteriorAPI.WRITE_DAT151, identifier);

    if (isErr(result)) {
      console.warn(unwrapResult(result));
    }

    fetchInterior();
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
          <Path>{path}</Path>
        </Entry>
      </Section>
      <Section>
        <SectionHeader>
          <h2>naOcclusionInteriorMetadata</h2>
          <StyledButton onClick={writeNaOcclusionInteriorMetadata}>
            <FaSave size={12} />
            Save file
          </StyledButton>
        </SectionHeader>
        <Entry>
          <h3>Path</h3>
          <Path>{naOcclusionInteriorMetadataPath ?? '...'}</Path>
        </Entry>
      </Section>
      <Section>
        <SectionHeader>
          <h2>Audio Game Data</h2>
          <StyledButton onClick={writeDat151}>
            <FaSave size={12} />
            Save file
          </StyledButton>
        </SectionHeader>
        <Entry>
          <h3>Path</h3>
          <Path>{audioGameDataPath ?? '...'}</Path>
        </Entry>
      </Section>
    </Container>
  );
};
