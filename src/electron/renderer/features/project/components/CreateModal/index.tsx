import React from 'react';
import { FaTimes } from 'react-icons/fa';

import { useProject } from '../../context';

import {
  Dialog,
  Portal,
  Overlay,
  Content,
  Header,
  Title,
  Close,
  Form,
  Group,
  Entry,
  Input,
  TextInput,
  FileInput,
  FilePath,
  SelectFileButton,
  CreateButton,
} from './styles';

export const CreateModal = () => {
  const { createModalState: state, setCreateModalOpen } = useProject();

  return (
    <Dialog open={state.open}>
      <Portal>
        <Overlay />
        <Content>
          <Header>
            <Title>New project</Title>
            <Close asChild onClick={() => setCreateModalOpen(false)}>
              <FaTimes size={18} />
            </Close>
          </Header>
          <Form>
            <Group>
              <Entry>
                <label>Project name:</label>
                <Input>
                  <TextInput type="text" placeholder="Project name" />
                </Input>
              </Entry>
            </Group>
            <Group>
              <Entry>
                <label>Interior name:</label>
                <Input>
                  <TextInput type="text" placeholder="Interior name" />
                </Input>
              </Entry>
              <Entry>
                <label>#map path:</label>
                <Input>
                  <FileInput>
                    <FilePath>{state.mapDataFile}</FilePath>
                    <SelectFileButton type="button">Select file</SelectFileButton>
                  </FileInput>
                </Input>
              </Entry>
              <Entry>
                <label>#typ path:</label>
                <Input>
                  <FileInput>
                    <FilePath>{state.mapTypesFile}</FilePath>
                    <SelectFileButton type="button">Select file</SelectFileButton>
                  </FileInput>
                </Input>
              </Entry>
            </Group>
            <CreateButton type="button">Create project</CreateButton>
          </Form>
        </Content>
      </Portal>
    </Dialog>
  );
};
