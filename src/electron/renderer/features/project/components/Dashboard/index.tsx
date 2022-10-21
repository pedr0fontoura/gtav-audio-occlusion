import React from 'react';

import { Container, Title } from '../../../../components/Screen';

import { ProjectProvider } from '../../context';

import { CreateModal } from '../CreateModal';
import { ProjectFileImporter } from '../ProjectFileImporter';

export const Dashboard = () => {
  return (
    <ProjectProvider>
      <CreateModal />
      <Container>
        <Title>Dashboard</Title>
        <ProjectFileImporter />
      </Container>
    </ProjectProvider>
  );
};
