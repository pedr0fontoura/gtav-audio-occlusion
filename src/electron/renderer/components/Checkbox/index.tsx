import React from 'react';
import { FaCheck } from 'react-icons/fa';

import { Root, Indicator } from './styles';
import type { RootProps } from './styles';

export const Checkbox = ({ ...props }: RootProps) => {
  return (
    <Root {...props}>
      <Indicator>
        <FaCheck />
      </Indicator>
    </Root>
  );
};
