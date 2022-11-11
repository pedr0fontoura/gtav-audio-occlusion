import { SerializedProject } from '@/electron/common/types/project';

export type ProjectState = SerializedProject;

export type CreateProjectModalState = {
  open: boolean;
  name: string;
  path: string;
  interior: string;
  mapDataFilePath: string;
  mapTypesFilePath: string;
};
