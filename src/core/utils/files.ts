import fs from 'fs/promises';

export const doesFileExist = async (filePath: string): Promise<boolean> => {
  try {
    await fs.access(filePath);

    return true;
  } catch {
    return false;
  }
};
