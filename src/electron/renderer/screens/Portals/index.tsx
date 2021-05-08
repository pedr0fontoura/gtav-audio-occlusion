import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';

import AudioOcclusion, { PortalEntity } from '../../../../core/classes/audioOcclusion';

import { Container, TableContainer } from './styles';

const Portals = () => {
  const [portalsEntities, setPortalsEntities] = useState<PortalEntity[][]>();

  useEffect(() => {
    (async () => {
      const audioOcclusion: AudioOcclusion = await ipcRenderer.invoke('getAudioOcclusion');

      setPortalsEntities(audioOcclusion.PortalsEntities);
    })();
  }, []);

  return (
    <Container>
      <h1>Portals</h1>
      <TableContainer>
        <table>
          <thead>
            <tr>
              <th>Index</th>
              <th>LinkType</th>
              <th>MaxOcclusion</th>
              <th>hash_E3674005</th>
              <th>IsDoor</th>
              <th>IsGlass</th>
            </tr>
          </thead>
          <tbody>
            {portalsEntities &&
              portalsEntities.map((portalEntities, portalIdx) =>
                portalEntities.map((entity, entityIdx) => (
                  <tr key={entityIdx}>
                    <td>{portalIdx}</td>
                    <td>{entity.LinkType}</td>
                    <td>
                      <input type="number" value={entity.MaxOcclusion} />
                    </td>
                    <td>{entity.hash_E3674005}</td>
                    <td>
                      <input type="checkbox" checked={entity.IsDoor} />
                    </td>
                    <td>
                      <input type="checkbox" checked={entity.IsGlass} />
                    </td>
                  </tr>
                )),
              )}
          </tbody>
        </table>
      </TableContainer>
    </Container>
  );
};

export default Portals;
