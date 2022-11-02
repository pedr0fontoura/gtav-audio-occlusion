import React, { createContext, useState, useEffect, useContext } from 'react';

import { isErr, unwrapResult } from '@/electron/common';

import { InteriorAPI } from '@/electron/common/types/interior';
import type { SerializedInterior } from '@/electron/common/types/interior';

type InteriorProviderProps = {
  identifier: string;
  children: React.ReactNode;
};

interface IInteriorContext {
  interior: SerializedInterior;

  fetchInterior: () => Promise<void>;
}

const { API } = window;

const interiorContext = createContext<IInteriorContext>({} as IInteriorContext);

const useInteriorProvider = (identifier: string): IInteriorContext => {
  const [interior, setInterior] = useState<SerializedInterior>();

  const fetchInterior = async (): Promise<void> => {
    const result: Result<string, SerializedInterior | undefined> = await API.invoke(
      InteriorAPI.GET_INTERIOR,
      identifier,
    );

    if (isErr(result)) {
      return console.warn(unwrapResult(result));
    }

    const interior = unwrapResult(result);
    if (!interior) return;

    setInterior(interior);
  };

  useEffect(() => {
    fetchInterior();
  }, []);

  return { interior, fetchInterior };
};

export const InteriorProvider = ({ identifier, children }: InteriorProviderProps): JSX.Element => {
  const interior = useInteriorProvider(identifier);

  return <interiorContext.Provider value={interior}>{children}</interiorContext.Provider>;
};

export const useInterior = (): IInteriorContext => {
  const context = useContext(interiorContext);

  if (!context) {
    throw new Error('useInterior must be used within an InteriorProvider');
  }

  return context;
};
