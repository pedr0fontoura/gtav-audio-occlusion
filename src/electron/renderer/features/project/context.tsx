import React, { createContext, useState, useContext } from 'react';

import { isErr, unwrapResult } from '@/electron/common';

import { ProjectAPI } from '@/electron/common/types/project';
import type { SerializedProject } from '@/electron/common/types/project';

import { ProjectState, CreateProjectModalState } from './types';

interface IProjectProvider {
  children: React.ReactNode;
}

interface IProjectContext {
  state: ProjectState;
  fetchProject: () => Promise<void>;
  createProject: () => Promise<void>;
  closeProject: () => Promise<void>;
  writeGeneratedFiles: () => Promise<void>;

  createModalState: CreateProjectModalState;
  setCreateModalOpen: (open: boolean) => void;
  setCreateModalName: (name: string) => void;
  setCreateModalInterior: (interior: string) => void;
  setCreateModalPath: (path: string) => void;
  setCreateModalMapDataFile: (mapDataFile: string) => void;
  setCreateModalMapTypesFile: (mapTypesFile: string) => void;
}

const { API } = window;

const createModalinitialState: CreateProjectModalState = {
  open: false,
  name: '',
  path: '...',
  interior: '',
  mapDataFilePath: '...',
  mapTypesFilePath: '...',
};

const projectContext = createContext<IProjectContext>({} as IProjectContext);

const useProjectProvider = (): IProjectContext => {
  const [state, setState] = useState<ProjectState>();
  const [createModalState, setCreateModalState] = useState<CreateProjectModalState>(createModalinitialState);

  const fetchProject = async (): Promise<void> => {
    const result: Result<string, SerializedProject | undefined> = await API.invoke(ProjectAPI.GET_CURRENT_PROJECT);

    if (isErr(result)) {
      return console.warn(unwrapResult(result));
    }

    const project = unwrapResult(result);

    if (!project) return;

    setState(project);
  };

  const createProject = async (): Promise<void> => {
    const { name, path, interior, mapDataFilePath, mapTypesFilePath } = createModalState;

    const result: Result<string, SerializedProject> = await API.invoke(ProjectAPI.CREATE_PROJECT, {
      name,
      path,
      interior: {
        name: interior,
        mapDataFilePath,
        mapTypesFilePath,
      },
    });

    if (isErr(result)) {
      return console.warn(unwrapResult(result));
    }

    await fetchProject();

    setCreateModalState(() => createModalinitialState);
  };

  const closeProject = async (): Promise<void> => {
    const result: Result<string, boolean> = await API.invoke(ProjectAPI.CLOSE_PROJECT);

    if (isErr(result)) {
      return console.warn(unwrapResult(result));
    }

    setState(undefined);
  };

  const writeGeneratedFiles = async (): Promise<void> => {
    const result: Result<string, boolean> = await API.invoke(ProjectAPI.WRITE_GENERATED_FILES);

    if (isErr(result)) {
      return console.warn(unwrapResult(result));
    }
  };

  const setCreateModalOpen = (open: boolean): void => {
    setCreateModalState(state => ({ ...state, open }));
  };

  const setCreateModalName = (name: string): void => {
    setCreateModalState(state => ({ ...state, name }));
  };

  const setCreateModalInterior = (interior: string): void => {
    setCreateModalState(state => ({ ...state, interior }));
  };

  const setCreateModalPath = (path: string): void => {
    setCreateModalState(state => ({ ...state, path }));
  };

  const setCreateModalMapDataFile = (mapDataFilePath: string): void => {
    setCreateModalState(state => ({ ...state, mapDataFilePath }));
  };

  const setCreateModalMapTypesFile = (mapTypesFilePath: string): void => {
    setCreateModalState(state => ({ ...state, mapTypesFilePath }));
  };

  return {
    state,
    fetchProject,
    createProject,
    closeProject,
    writeGeneratedFiles,

    createModalState,
    setCreateModalOpen,
    setCreateModalName,
    setCreateModalInterior,
    setCreateModalPath,
    setCreateModalMapDataFile,
    setCreateModalMapTypesFile,
  };
};

export const ProjectProvider = ({ children }: IProjectProvider): JSX.Element => {
  const project = useProjectProvider();

  return <projectContext.Provider value={project}>{children}</projectContext.Provider>;
};

export const useProject = (): IProjectContext => {
  const context = useContext(projectContext);

  if (!context) {
    throw new Error('useProject must be used within an ProjectProvider');
  }

  return context;
};
