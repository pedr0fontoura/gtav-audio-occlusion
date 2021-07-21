import React, { useRef, useEffect } from 'react';

import { MessageTypes } from '../../types/message';

import { useConsole } from '../../hooks/useConsole';

import { Container, Message } from './styles';

const TYPE_COLOR_MAP: Record<MessageTypes, string> = {
  log: '#FFFFFF',
  warn: '#ebb60a',
  error: '#f00000ea',
};

const Console = () => {
  const { messages } = useConsole();

  const dummyBottomMessage = useRef<HTMLParagraphElement>(null);

  const scrollToBottom = (): void => {
    dummyBottomMessage.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Container>
      {messages.map(({ date, type, text }) => (
        <Message $color={TYPE_COLOR_MAP[type]}>
          <span>{date}</span>
          {text}
        </Message>
      ))}
      <p ref={dummyBottomMessage}></p>
    </Container>
  );
};

export default Console;
