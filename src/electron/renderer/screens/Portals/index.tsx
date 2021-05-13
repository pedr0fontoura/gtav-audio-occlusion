import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';

import AudioOcclusion, { PortalEntity } from '../../../../core/classes/audioOcclusion';

import { Container, TableContainer } from './styles';

const Portals = () => {
  const [portalsEntities, setPortalsEntities] = useState<PortalEntity[][]>();

  const updatePortalsEntities = (
    pPortalIdx: number,
    pEntityIdx: number,
    data: { [key in keyof PortalEntity]?: any },
  ): void => {
    setPortalsEntities(
      portalsEntities.map((portalEntity, portalIdx) => {
        if (pPortalIdx !== portalIdx) return portalEntity;

        return portalEntity.map((entity, entityIdx) => {
          if (pEntityIdx !== entityIdx) return entity;

          return {
            ...entity,
            ...data,
          };
        });
      }),
    );

    ipcRenderer.send('updatePortalEntity', pPortalIdx, pEntityIdx, data);
  };

  useEffect(() => {
    (async () => {
      const audioOcclusion: AudioOcclusion = await ipcRenderer.invoke('getAudioOcclusion');

      if (audioOcclusion) {
        setPortalsEntities(audioOcclusion.portalsEntities);
      }
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
                    <td>{entity.linkType}</td>
                    <td>
                      <input
                        type="number"
                        value={entity.maxOcclusion}
                        step={0.1}
                        min={0}
                        max={1}
                        onChange={e =>
                          updatePortalsEntities(portalIdx, entityIdx, {
                            maxOcclusion: parseFloat(e.target.value),
                          })
                        }
                      />
                    </td>
                    <td>{entity.hash_E3674005}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={entity.isDoor}
                        onChange={e =>
                          updatePortalsEntities(portalIdx, entityIdx, {
                            isDoor: e.target.checked,
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={entity.isGlass}
                        onChange={e =>
                          updatePortalsEntities(portalIdx, entityIdx, {
                            isGlass: e.target.checked,
                          })
                        }
                      />
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
