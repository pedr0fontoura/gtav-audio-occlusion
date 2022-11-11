import React, { useEffect, useMemo } from 'react';
import { FaTimes } from 'react-icons/fa';

import { Container, Header, Content } from '@/electron/renderer/components/Page';

import { Interior } from '@/electron/renderer/features/interior';

import { useProject } from '../../context';

import { CreateModal } from '../CreateModal';
import { ProjectFileImporter } from '../ProjectFileImporter';
import { InteriorDashboard } from '../InteriorDashboard';

export const Project = (): JSX.Element => {
  const { state, fetchProject, closeProject } = useProject();

  const options = useMemo(
    () => [
      {
        icon: <FaTimes />,
        label: 'Close project',
        onClick: closeProject,
      },
    ],
    [],
  );

  useEffect(() => {
    fetchProject();
  }, []);

  if (!state) {
    return (
      <>
        <CreateModal />
        <Container>
          <ProjectFileImporter />
        </Container>
      </>
    );
  }

  const headerTitle = `"${state.name}"`;
  const headerOptionalTitle = `${state.interiors.length} ${
    state.interiors.length > 1 ? 'Interiors' : 'Interior'
  } added`;

  return (
    <>
      <CreateModal />
      <Container>
        <Header title={headerTitle} optionalText={headerOptionalTitle} options={options} />
        <Content>
          {state.interiors.map((interior, index) => {
            const { identifier } = interior;

            return (
              <Interior key={identifier} index={index} name={identifier}>
                <InteriorDashboard />
              </Interior>
            );
          })}
        </Content>
      </Container>
    </>
  );
};
