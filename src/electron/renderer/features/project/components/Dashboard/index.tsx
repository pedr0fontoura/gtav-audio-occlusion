import React, { useEffect, useMemo } from 'react';
import { FaPlusCircle, FaTimes } from 'react-icons/fa';

import { Container } from '../../../../components/Screen';

import { useProject } from '../../context';

import { CreateModal } from '../CreateModal';
import { ProjectFileImporter } from '../ProjectFileImporter';

import { Interior } from './components/Interior';

import { Content, Header, HeaderLeft, ProjectTitle, HeaderRight, Button, Interiors } from './styles';

export const Dashboard = () => {
  const { state, fetchProject, closeProject } = useProject();

  const options = useMemo(
    () => [
      {
        icon: FaTimes,
        label: 'Close project',
        onClick: closeProject,
      },
    ],
    [],
  );

  useEffect(() => {
    fetchProject();
  }, []);

  return (
    <>
      <CreateModal />
      <Container>
        {state && (
          <Content>
            <Header>
              <HeaderLeft>
                <ProjectTitle>
                  "{state.name}"
                  <span>
                    {state.interiors.length} {state.interiors.length > 1 ? 'Interiors' : 'Interior'} added
                  </span>
                </ProjectTitle>
              </HeaderLeft>
              <HeaderRight>
                {options.map(option => (
                  <Button type="button" onClick={option.onClick}>
                    {option.icon && <option.icon />}
                    {option.label}
                  </Button>
                ))}
              </HeaderRight>
            </Header>
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
        )}
        {!state && <ProjectFileImporter />}
      </Container>
    </>
  );
};
