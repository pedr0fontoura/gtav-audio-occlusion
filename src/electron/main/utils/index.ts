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
