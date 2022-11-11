import React from 'react';
import { FaCheck } from 'react-icons/fa';

import { Root, Indicator } from './styles';
import type { RootProps } from './styles';

export const Checkbox = ({ ...props }: RootProps): JSX.Element => {
  return (
    <Root {...props}>
      <Indicator className="checkbox-indicator">
        <FaCheck />
      </Indicator>
    </Root>
  );
};
