import styled from 'styled-components';

import { Input } from '@/electron/renderer/components/Input';

export const SmallInput = styled(Input)`
  height: 80%;
  width: 20%;
  min-width: fit-content;

  background: ${({ theme }) => theme.colors.gray[950]};
`;
