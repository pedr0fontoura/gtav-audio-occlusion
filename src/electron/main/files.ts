import { dialog, FileFilter } from 'electron';

export const selectFiles = async (filters?: FileFilter[]): Promise<string[]> => {
  const selection = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters,
  });

  if (selection.canceled) return [];

  return selection.filePaths;
};