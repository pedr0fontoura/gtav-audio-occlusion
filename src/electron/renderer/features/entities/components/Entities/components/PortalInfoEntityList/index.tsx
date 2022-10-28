import React from 'react';

import { SerializedNaOcclusionPortalInfoMetadata } from '@/electron/common/types/naOcclusionInteriorMetadata';

import { Table } from '@/electron/renderer/components/Table';

import { Container, Content } from './styles';

type PortalInfoEntityListProps = {
  data: SerializedNaOcclusionPortalInfoMetadata[];
};

export const PortalInfoEntityList = ({ data }: PortalInfoEntityListProps) => {
  const renderEntities = (): React.ReactNode[] => {
    const rows = [];

    let renderedPortals = 0;

    data.forEach((portalInfo, portalInfoIndex) => {
      const { portalEntityList } = portalInfo;

      if (!portalEntityList.length) return;

      renderedPortals++;

      const isEven = (renderedPortals + 1) % 2 === 0;
      const rowSpan = portalEntityList.length;

      portalEntityList.forEach((portalEntity, portalEntityIndex) => {
        const { linkType, maxOcclusion, entityModelName, entityModelHashKey, isDoor, isGlass } = portalEntity;

        const isFirstEntity = portalEntityIndex === 0;

        rows.push(
          <tr key={`${portalInfoIndex}:${portalEntityIndex}`} className={isEven ? 'even' : 'odd'}>
            {isFirstEntity && <td rowSpan={rowSpan}>{portalInfoIndex}</td>}
            <td>{entityModelName ?? entityModelHashKey}</td>
            <td>{maxOcclusion}</td>
            <td>{isDoor.toString()}</td>
            <td>{isGlass.toString()}</td>
          </tr>,
        );
      });
    });

    return rows;
  };

  return (
    <Container>
      <Content>
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
      </Content>
    </Container>
  );
};
