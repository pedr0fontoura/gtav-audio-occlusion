import React from 'react';
import { FaTimes } from 'react-icons/fa';

import { isErr, isOk, unwrapResult } from '@/electron/common';
import { ProjectAPI } from '@/electron/common/types/project';

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

const { API } = window;

export const CreateModal = () => {
  const {
    createModalState: state,
    setCreateModalOpen,
    setCreateModalName,
    setCreateModalInterior,
    setCreateModalMapDataFile,
    setCreateModalMapTypesFile,
  } = useProject();

  const selectMapData = async (): Promise<void> => {
    const result: Result<string, string> = await API.invoke(ProjectAPI.SELECT_MAP_DATA_FILE);

    if (isErr(result)) {
      return console.warn(unwrapResult(result));
    }

    setCreateModalMapDataFile(unwrapResult(result));
  };

  const selectMapTypes = async (): Promise<void> => {
    const result: Result<string, string> = await API.invoke(ProjectAPI.SELECT_MAP_TYPES_FILE);

    if (isErr(result)) {
      return console.warn(unwrapResult(result));
    }

    setCreateModalMapTypesFile(unwrapResult(result));
  };

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
                  <TextInput
                    type="text"
                    placeholder="Project name"
                    value={state.name}
                    onChange={e => setCreateModalName(e.target.value)}
                  />
                </Input>
              </Entry>
            </Group>
            <Group>
              <Entry>
                <label>Interior name:</label>
                <Input>
                  <TextInput
                    type="text"
                    placeholder="Interior name"
                    value={state.interior}
                    onChange={e => setCreateModalInterior(e.target.value)}
                  />
                </Input>
              </Entry>
              <Entry>
                <label>#map path:</label>
                <Input>
                  <FileInput>
                    <FilePath>{state.mapDataFile}</FilePath>
                    <SelectFileButton type="button" onClick={selectMapData}>
                      Select file
                    </SelectFileButton>
                  </FileInput>
                </Input>
              </Entry>
              <Entry>
                <label>#typ path:</label>
                <Input>
                  <FileInput>
                    <FilePath>{state.mapTypesFile}</FilePath>
                    <SelectFileButton type="button" onClick={selectMapTypes}>
                      Select file
                    </SelectFileButton>
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
