import React from 'react';
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpand } from 'react-icons/tb';

import { Button } from './styles';

type ExpandButtonProps = {
  expanded?: boolean;
  onClick: () => void;
};

export const ExpandButton = ({ ...props }: ExpandButtonProps): JSX.Element => (
  <Button {...props}>
    {props.expanded ? <TbLayoutSidebarLeftCollapse size={18} /> : <TbLayoutSidebarLeftExpand size={18} />}
  </Button>
);
