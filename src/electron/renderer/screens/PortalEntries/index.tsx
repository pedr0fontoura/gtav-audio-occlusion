import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';

import { PortalInfo } from '../../../../core/classes/audioOcclusion';

import { TableContainer } from './styles';

const PortalEntries = () => {
  const [portalEntries, setPortalEntries] = useState<PortalInfo[]>();

  useEffect(() => {
    (async () => {
      const _portalEntries: PortalInfo[] = await ipcRenderer.invoke('getPortalEntries');

      if (_portalEntries) {
        setPortalEntries(_portalEntries);
      }
    })();
  }, []);

  return (
    <>
      <h1>Portal Entries</h1>
      <TableContainer>
        <table>
          <thead>
            <tr>
              <th>Portal Index</th>
              <th>RoomIdx</th>
              <th>DestRoomIdx</th>
              <th>PortalIdx</th>
              <th>InteriorProxyHash</th>
              <th>DestInteriorHash</th>
              <th>Enabled</th>
            </tr>
          </thead>
          <tbody>
            {portalEntries && portalEntries.map(portalEntry => (
              <tr key={portalEntry.infoIdx}>
                <td>{portalEntry.index}</td>
                <td>{portalEntry.roomIdx}</td>
                <td>{portalEntry.destRoomIdx}</td>
                <td>{portalEntry.portalIdx}</td>
                <td>{portalEntry.interiorProxyHash}</td>
                <td>{portalEntry.destInteriorHash}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={true}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>
    </>
  );
};

export default PortalEntries;
