import React, { useEffect, useMemo } from 'react';
import { FaTimes } from 'react-icons/fa';

import { Container, Header } from '../../../../components/Page';

import { useProject } from '../../context';

import { CreateModal } from '../CreateModal';
import { ProjectFileImporter } from '../ProjectFileImporter';

import { Interior } from './components/Interior';

import { Content, Interiors } from './styles';

export const Dashboard = () => {
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
        <Content>
          <Header title={headerTitle} optionalText={headerOptionalTitle} options={options} />
          <Interiors>
            {state.interiors.map((interior, index) => (
              <Interior
                key={interior.identifier}
                index={index}
                identifier={interior.identifier}
                mapDataFilePath={interior.mapDataFilePath}
                mapTypesFilePath={interior.mapTypesFilePath}
                canRemove={state.interiors.length > 1}
              />
            ))}
          </Interiors>
        </Content>
      </Container>
    </>
  );
};
