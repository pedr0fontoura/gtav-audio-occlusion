import React from 'react';

import { Button } from '../../Button';

import { Container, Left, Title, Right } from './styles';

type Option = {
  icon?: React.ReactNode;
  label: string;
  onClick: () => Promise<void>;
};

type HeaderProps = {
  title: string;
  optionalText?: string;
  options?: Option[];
};

export const Header = ({ title, optionalText, options }: HeaderProps): JSX.Element => {
  return (
    <Container>
      <Left>
        <Title>
          {title}
          {optionalText && <span>{optionalText}</span>}
        </Title>
      </Left>
      <Right>
        {options &&
          options.map((option, index) => (
            <Button key={index} type="button" onClick={option.onClick}>
              {option.icon}
              {option.label}
            </Button>
          ))}
      </Right>
    </Container>
  );
};
