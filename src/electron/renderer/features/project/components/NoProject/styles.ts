import styled from 'styled-components';

import { Container } from '@/electron/renderer/components/Page';

export const StyledContainer = styled(Container)`
  justify-content: center;
  align-items: center;

  color: #fff;

  opacity: 0.2;

  a {
    text-decoration: none;
    color: #fff;
    font-weight: 600;

    display: inline-block;

    transition: 0.2s;

    &:hover {
      transform: translateY(-2px);
    }
  }
`;

export const Image = styled.img`
  object-fit: cover;

  filter: grayscale(1);
`;

export const Text = styled.p`
  font-size: 1.2rem;
`;
