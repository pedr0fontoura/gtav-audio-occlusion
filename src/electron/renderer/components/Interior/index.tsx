import React from 'react';

import { Container, Header, Title } from './styles';

type InteriorProps = {
  index: number;
  name: string;
  children: React.ReactNode;
};

export const Interior = ({ index, name, children }: InteriorProps) => {
  return (
    <Container>
      <Header>
        <Title>
          <span>{index + 1}.</span>"{name}"
        </Title>
      </Header>
      {children}
    </Container>
  );
};
