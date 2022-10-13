export type CreateProjectModalState = {
  open: boolean;
  name: string;
  path: string;
  interior: string;
  mapDataFile: string;
  mapTypesFile: string;
};

export type ProjectState = {
  modalState: CreateProjectModalState;
};
