import React, { createContext, useState, useContext } from 'react';

import { CreateProjectModalState } from './types';

interface IProjectProvider {
  children: React.ReactNode;
}

interface IProjectContext {
  createModalState: CreateProjectModalState;
  setCreateModalOpen: (open: boolean) => void;
  setCreateModalName: (name: string) => void;
  setCreateModalInterior: (interior: string) => void;
  setCreateModalMapDataFile: (mapDataFile: string) => void;
  setCreateModalMapTypesFile: (mapTypesFile: string) => void;
}

const createModalinitialState: CreateProjectModalState = {
  open: false,
  name: '',
  path: '',
  interior: '',
  mapDataFile: 'C:/User/Documents/filename.ymap.xml',
  mapTypesFile: 'C:/User/Documents/filename.ytyp.xml',
};

const projectContext = createContext<IProjectContext>({} as IProjectContext);

const useProjectProvider = (): IProjectContext => {
  const [createModalState, setCreateModalState] = useState<CreateProjectModalState>(createModalinitialState);

  const setCreateModalOpen = (open: boolean): void => {
    setCreateModalState(state => ({ ...state, open }));
  };

  const setCreateModalName = (name: string): void => {
    setCreateModalState(state => ({ ...state, name }));
  };

  const setCreateModalInterior = (interior: string): void => {
    setCreateModalState(state => ({ ...state, interior }));
  };

  const setCreateModalMapDataFile = (mapDataFile: string): void => {
    setCreateModalState(state => ({ ...state, mapDataFile }));
  };

  const setCreateModalMapTypesFile = (mapTypesFile: string): void => {
    setCreateModalState(state => ({ ...state, mapTypesFile }));
  };

  return {
    createModalState,
    setCreateModalOpen,
    setCreateModalName,
    setCreateModalInterior,
    setCreateModalMapDataFile,
    setCreateModalMapTypesFile,
  };
};

export const ProjectProvider = ({ children }: IProjectProvider) => {
  const project = useProjectProvider();

  return <projectContext.Provider value={project}>{children}</projectContext.Provider>;
};

export const useProject = () => {
  const context = useContext(projectContext);

  if (!context) {
    throw new Error('useProject must be used within an ProjectProvider');
  }

  return context;
};
