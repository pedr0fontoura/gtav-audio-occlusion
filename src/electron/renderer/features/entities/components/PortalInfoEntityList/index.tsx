import React from 'react';

import { TableContainer, Table } from '@/electron/renderer/components/Table';
import { Checkbox } from '@/electron/renderer/components/Checkbox';

import { useInterior } from '@/electron/renderer/features/interior';
import { updatePortalEntity } from '@/electron/renderer/features/entities';

import { SmallInput } from './styles';

const MAX_OCCLUSION_MIN = 0;
const MAX_OCCLUSION_MAX = 1;
const MAX_OCCLUSION_STEP = 0.1;

export const PortalInfoEntityList = (): JSX.Element => {
  const updateMaxOcclusion = (portalInfoIndex: number, entityIndex: number, maxOcclusion: string): void => {
    const parsedMaxOcclusion = Number(maxOcclusion);

    if (isNaN(parsedMaxOcclusion)) return;

    updatePortalEntity(portalInfoIndex, entityIndex, { maxOcclusion: parsedMaxOcclusion });
  };

  const updateIsDoor = (portalInfoIndex: number, entityIndex: number, isDoor: boolean): void => {
    updatePortalEntity(portalInfoIndex, entityIndex, { isDoor });
  };

  const updateIsGlass = (portalInfoIndex: number, entityIndex: number, isGlass: boolean): void => {
    updatePortalEntity(portalInfoIndex, entityIndex, { isGlass });
  };

  const { interior } = useInterior();

  if (!interior) {
    return null;
  }

  const portalInfoList = interior.naOcclusionInteriorMetadata.portalInfoList;

  const renderEntities = (): React.ReactNode[] => {
    const rows = [];

    let renderedPortals = 0;

    portalInfoList.forEach((portalInfo, portalInfoIndex) => {
      const { portalEntityList } = portalInfo;

      if (!portalEntityList.length) return;

      renderedPortals++;

      const isEven = (renderedPortals + 1) % 2 === 0;
      const rowSpan = portalEntityList.length;

      portalEntityList.forEach((portalEntity, portalEntityIndex) => {
        const { maxOcclusion, entityModelName, entityModelHashKey, isDoor, isGlass } = portalEntity;

        const isFirstEntity = portalEntityIndex === 0;

        rows.push(
          <tr key={`${portalInfoIndex}:${portalEntityIndex}`} className={isEven ? 'even' : 'odd'}>
            {isFirstEntity && <td rowSpan={rowSpan}>{portalInfoIndex}</td>}
            <td>{entityModelName ?? entityModelHashKey}</td>
            <td>
              <SmallInput
                value={maxOcclusion}
                type="number"
                min={MAX_OCCLUSION_MIN}
                max={MAX_OCCLUSION_MAX}
                step={MAX_OCCLUSION_STEP}
                onChange={e => updateMaxOcclusion(portalInfoIndex, portalEntityIndex, e.target.value)}
              />
            </td>
            <td>
              {<Checkbox checked={isDoor} onClick={() => updateIsDoor(portalInfoIndex, portalEntityIndex, !isDoor)} />}
            </td>
            <td>
              {
                <Checkbox
                  checked={isGlass}
                  onClick={() => updateIsGlass(portalInfoIndex, portalEntityIndex, !isGlass)}
                />
              }
            </td>
          </tr>,
        );
      });
    });

    return rows;
  };

  return (
    <TableContainer>
      <Table alternatedRowColors={false}>
        <thead>
          <tr>
            <th>Portal</th>
            <th>Model</th>
            <th>Max occlusion</th>
            <th>Is door</th>
            <th>Is glass</th>
          </tr>
        </thead>
        <tbody>{renderEntities()}</tbody>
      </Table>
    </TableContainer>
  );
};
