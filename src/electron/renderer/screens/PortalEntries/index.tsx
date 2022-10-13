import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';

import { PortalInfo } from '@/core/classes/audioOcclusion';

import { TableContainer } from './styles';

const PortalEntries = () => {
  const [portalEntries, setPortalEntries] = useState<PortalInfo[]>();

  const updatePortalEntry = (index: number, enabled: boolean) => {
    const updatedPortalEntries = portalEntries.map(portalEntry => {
      if (portalEntry.infoIdx !== index) return portalEntry;

      return { ...portalEntry, enabled };
    });

    setPortalEntries(updatedPortalEntries);

    ipcRenderer.send('updatePortalEntry', index, enabled);
  };

  useEffect(() => {
    (async () => {
      const _portalEntries: PortalInfo[] = await ipcRenderer.invoke('getPortalEntries');

      if (_portalEntries) {
        _portalEntries.sort((a, b) => a.index - b.index);

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
              <th>RoomPortalIdx</th>
              <th>InteriorProxyHash</th>
              <th>DestInteriorHash</th>
              <th>Enabled</th>
            </tr>
          </thead>
          <tbody>
            {portalEntries &&
              portalEntries.map(portalEntry => (
                <tr key={portalEntry.infoIdx}>
                  <td>{portalEntry.index}</td>
                  <td>{portalEntry.roomIdx}</td>
                  <td>{portalEntry.destRoomIdx}</td>
                  <td>{portalEntry.roomPortalIdx}</td>
                  <td>{portalEntry.interiorProxyHash}</td>
                  <td>{portalEntry.destInteriorHash}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={portalEntry.enabled}
                      onChange={e => updatePortalEntry(portalEntry.infoIdx, e.target.checked)}
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
