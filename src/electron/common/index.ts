// Reference: https://antman-does-software.com/stop-catching-errors-in-typescript-use-the-either-type-to-make-your-code-predictable

export type UnwrapResult = <T, U>(e: Result<T, U>) => NonNullable<T | U>;

export const unwrapResult: UnwrapResult = <T, U>({ err, ok }: Result<T, U>) => {
  if (ok !== undefined && err !== undefined) {
    throw new Error(
      `Received both err and ok values at runtime when opening an Either\nerr: ${JSON.stringify(
        err,
      )}\nok: ${JSON.stringify(ok)}`,
    );
    /*
     We're throwing in this function because this can only occur at runtime if something 
     happens that the TypeScript compiler couldn't anticipate. That means the application
     is in an unexpected state and we should terminate immediately.
    */
  }

  if (err !== undefined) {
    return err as NonNullable<T>; // Typescript is getting confused and returning this type as `T | undefined` unless we add the type assertion
  }

  if (ok !== undefined) {
    return ok as NonNullable<U>;
  }

  throw new Error(`Received no err or ok values at runtime when opening a Result`);
};

export const isErr = <T, U>(e: Result<T, U>): e is Err<T> => {
  return e.err !== undefined;
};

export const isOk = <T, U>(e: Result<T, U>): e is Ok<U> => {
  return e.ok !== undefined;
};

export const err = <T>(value: T): Err<T> => ({ err: value });

export const ok = <U>(value: U): Ok<U> => ({ ok: value });
