import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';

import AudioOcclusion, { PortalEntity } from '../../../../core/classes/audioOcclusion';

import { TableContainer } from './styles';

const Portals = () => {
  const [portalsEntities, setPortalsEntities] = useState<PortalEntity[][]>();

  const updatePortalsEntities = (
    pPortalIdx: number,
    pEntityIdx: number,
    data: { [key in keyof PortalEntity]?: any },
  ): void => {
    const entityHash = portalsEntities[pPortalIdx][pEntityIdx].entityModelHashkey;

    if (data.maxOcclusion && isNaN(data.maxOcclusion)) {
      data.maxOcclusion = 0.0;
    }

    const updatedPortalsEntities = portalsEntities.map(portal => {
      return portal.map(entity => {
        if (entityHash !== entity.entityModelHashkey) return entity;

        return {
          ...entity,
          ...data,
        };
      });
    });

    setPortalsEntities(updatedPortalsEntities);

    ipcRenderer.send('updatePortalEntity', data);
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
    <>
      <h1>Portals Entities</h1>
      <TableContainer>
        <table>
          <thead>
            <tr>
              <th>Portal Index</th>
              <th>LinkType</th>
              <th>MaxOcclusion</th>
              <th>EntityModelHashkey</th>
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
                    <td>{((entity.entityModelHashkey)>>>0).toString(16)}</td>
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
    </>
  );
};

export default Portals;
