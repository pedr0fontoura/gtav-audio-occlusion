import React, { createContext, useState, useContext, useCallback } from 'react';

import { CreateProjectModalState } from './types';

interface IProjectProvider {
  children: React.ReactNode;
}

interface IProjectContext {
  createModalState: CreateProjectModalState;
  setCreateModalOpen: (open: boolean) => void;
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

  const setCreateModalOpen = (open: boolean) => {
    setCreateModalState(state => ({ ...state, open }));
  };

  return { createModalState, setCreateModalOpen };
};

export const ProjectProvider = ({ children }: IProjectProvider) => {
  const auth = useProjectProvider();

  return <projectContext.Provider value={auth}>{children}</projectContext.Provider>;
};

export const useProject = () => {
  const context = useContext(projectContext);

  if (!context) {
    throw new Error('useProject must be used within an ProjectProvider');
  }

  return context;
};
