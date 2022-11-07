import React from 'react';
import { Link } from 'react-router-dom';

import CableChewingSnail from '@/electron/renderer/assets/cablechewingsnail.png';

import { StyledContainer, Image, Text } from './styles';

export const NoProject = (): JSX.Element => {
  return (
    <StyledContainer>
      <Image src={CableChewingSnail} />
      <Text>
        Oops... It seems that you don't have a project. <Link to="/">Create one</Link> before snailying around!
      </Text>
    </StyledContainer>
  );
};
