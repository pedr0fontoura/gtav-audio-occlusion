import React, { createContext, useContext, useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';

import { MessageTypes, ConsoleMessage } from '../types/message';

interface ConsoleContext {
  messages: ConsoleMessage[];
  log: (text: string) => void;
  warn: (text: string) => void;
  error: (text: string) => void;
}

interface ConsoleProviderProps {
  children: React.ReactNode;
}

const consoleContext = createContext<ConsoleContext>({} as ConsoleContext);

function useConsoleProvider(): ConsoleContext {
  const [messages, setMessages] = useState<ConsoleMessage[]>([]);

  const addMessage = (process: 'main' | 'renderer', type: MessageTypes, rawText: string): void => {
    const date = new Date().toLocaleTimeString();

    const text = `[ ${process.toUpperCase()} ]: ${rawText}`;

    setMessages(state => [...state, { date, type, text }]);
  };

  useEffect(() => {
    ipcRenderer.on('consoleLog', (event, text) => {
      addMessage('main', 'log', text);
    });

    ipcRenderer.on('consoleWarn', (event, text) => {
      addMessage('main', 'warn', text);
    });

    ipcRenderer.on('consoleError', (event, text) => {
      addMessage('main', 'error', text);
    });

    log('Initialized');
  }, []);

  const log = (text: string): void => {
    addMessage('renderer', 'log', text);
  };

  const warn = (text: string): void => {
    addMessage('renderer', 'warn', text);
  };

  const error = (text: string): void => {
    addMessage('renderer', 'error', text);
  };

  return { messages, log, warn, error };
}

export function ConsoleProvider({ children }: ConsoleProviderProps) {
  const console = useConsoleProvider();

  return <consoleContext.Provider value={console}>{children}</consoleContext.Provider>;
}

export const useConsole = (): ConsoleContext => {
  const context = useContext(consoleContext);

  if (!context) {
    throw new Error('useConsole must be used within an ConsoleProvider');
  }

  return context;
};
