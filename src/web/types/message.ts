export type MessageTypes = 'log' | 'warn' | 'error';

export interface ConsoleMessage {
  date: string;
  type: MessageTypes;
  text: string;
}
