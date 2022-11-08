import styled from 'styled-components';
import { lighten } from 'polished';

import { Container } from '@/electron/renderer/components/Page';

export const StyledContainer = styled(Container)`
  justify-content: center;
  align-items: center;

  color: ${({ theme }) => lighten(0.2, theme.colors.gray[800])};

  a {
    text-decoration: none;
    color: ${({ theme }) => lighten(0.5, theme.colors.gray[800])};
    font-weight: 600;

    transition: 0.1s;

    &:hover {
      color: #fff;
    }
  }
`;

export const Image = styled.img`
  object-fit: cover;

  filter: grayscale(1);

  opacity: 0.2;
`;

export const Text = styled.p`
  font-size: 1.2rem;
`;
