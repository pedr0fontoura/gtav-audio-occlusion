import React, { useEffect } from 'react';
import { FaPlusCircle } from 'react-icons/fa';

import { Container } from '../../../../components/Screen';

import { useProject } from '../../context';

import { CreateModal } from '../CreateModal';
import { ProjectFileImporter } from '../ProjectFileImporter';

import { Interior } from './components/Interior';

import { Content, Header, HeaderLeft, ProjectTitle, HeaderRight, AddMapButton, Interiors } from './styles';

export const Dashboard = () => {
  const { state, fetchProject } = useProject();

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
                  "{state.name}"<span>{state.interiors.length} Maps added</span>
                </ProjectTitle>
              </HeaderLeft>
              <HeaderRight>
                <AddMapButton>
                  <FaPlusCircle />
                  Add map
                </AddMapButton>
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
