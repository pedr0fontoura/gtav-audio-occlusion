import styled from 'styled-components';

import { Checkbox } from '@/electron/renderer/components/Checkbox';

export const SettingsEntry = styled.div`
  display: flex;

  align-items: center;
  gap: 8px;

  > label {
    font-size: 16px;
  }
`;

export const SettingsCheckbox = styled(Checkbox)`
  height: 16px;
  width: 16px;

  .checkbox-indicator {
    font-size: 8px;
  }
`;
