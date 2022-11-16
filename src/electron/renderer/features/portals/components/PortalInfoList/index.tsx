import React from 'react';

import { TableContainer, Table } from '@/electron/renderer/components/Table';
import { Checkbox } from '@/electron/renderer/components/Checkbox';

import { useInterior } from '@/electron/renderer/features/interior';
import { updatePortalInfo } from '@/electron/renderer/features/portals';

export const PortalInfoList = (): JSX.Element => {
  const { interior, fetchInterior } = useInterior();

  if (!interior) {
    return null;
  }

  const portalInfoList = interior.naOcclusionInteriorMetadata.portalInfoList;

  const setPortalInfoEnabled = (portalInfoIndex: number, enabled: boolean): void => {
    updatePortalInfo(interior.identifier, portalInfoIndex, { enabled });
    fetchInterior();
  };

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Room from</th>
            <th>Room to</th>
            <th>Interior from</th>
            <th>Interior to</th>
            <th>Enabled</th>
          </tr>
        </thead>
        <tbody>
          {portalInfoList
            .sort((a, b) => a.portalIndex - b.portalIndex)
            .map(portalInfo => (
              <tr key={portalInfo.infoIndex}>
                <td>{portalInfo.portalIndex}</td>
                <td>{portalInfo.destRoomIdx}</td>
                <td>{portalInfo.roomIdx}</td>
                <td>{portalInfo.interiorProxyHash}</td>
                <td>{portalInfo.destInteriorHash}</td>
                <td>
                  <Checkbox
                    checked={portalInfo.enabled}
                    onClick={() => setPortalInfoEnabled(portalInfo.infoIndex, !portalInfo.enabled)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};
