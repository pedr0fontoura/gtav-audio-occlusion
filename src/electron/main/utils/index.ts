import fs from 'fs/promises';

import { isErr, ok, unwrapResult } from '@/electron/common';

interface Serializable {
  serialize(): unknown;
}

export const forwardSerializedResult = (result: Result<string, Serializable>): Result<string, unknown> => {
  if (isErr(result)) {
    return result;
  }

  const value = unwrapResult(result);

  return ok(value ? value?.serialize() : value);
};

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
    .replace(/[^a-z0-9\-]/gi, '') // Remove special characters
    .toLowerCase();
