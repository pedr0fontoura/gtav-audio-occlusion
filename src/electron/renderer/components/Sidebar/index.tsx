import React from 'react';

import FileUploader from './components/FileUploader';

import { Container, Section, SectionLink } from './styles';

const Sidebar = () => {
  return (
    <Container>
      <Section>
        <h1>Files</h1>
        <FileUploader text="Adicionar ymap" fileType="ymap" />
        <FileUploader text="Adicionar ytyp" fileType="ytyp" />
      </Section>
      <Section>
        <h1>Data</h1>
        <SectionLink>Portals</SectionLink>
        <SectionLink>Rooms</SectionLink>
      </Section>
    </Container>
  );
};

export default Sidebar;
