import fs from 'fs/promises';
import { dialog, FileFilter } from 'electron';

export const doesFileExist = async (filePath: string): Promise<boolean> => {
  try {
    await fs.access(filePath);

    return true;
  } catch {
    return false;
  }
};

export const sanitizePath = (value: string): string =>
  value
    .replace(/\s+/g, '-') // Remove white-spaces
    .replace(/[^a-z0-9\-_]/gi, '') // Remove special characters
    .toLowerCase();

export const selectFiles = async (filters?: FileFilter[]): Promise<string[]> => {
  const selection = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters,
  });

  if (selection.canceled) return [];

  return selection.filePaths;
};

export const selectDirectory = async (filters?: FileFilter[]): Promise<string[]> => {
  const selection = await dialog.showOpenDialog({
    properties: ['openDirectory', 'createDirectory'],
    filters,
  });

  if (selection.canceled) return [];

  return selection.filePaths;
};
