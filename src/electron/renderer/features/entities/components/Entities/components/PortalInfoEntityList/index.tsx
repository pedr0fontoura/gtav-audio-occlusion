import React, { useMemo } from 'react';

import { SerializedNaOcclusionPortalInfoMetadata } from '@/electron/common/types/naOcclusionInteriorMetadata';

import { Table } from '@/electron/renderer/components/Table';

import { Container, Content } from './styles';

type PortalInfoEntityListProps = {
  data: SerializedNaOcclusionPortalInfoMetadata[];
};

export const PortalInfoEntityList = ({ data }: PortalInfoEntityListProps) => {
  const entities = useMemo(() => {
    return data.flatMap(portalInfo => portalInfo.portalEntityList);
  }, [data]);

  return (
    <Container>
      <Content>
        <Table>
          <tr>
            <th>Model</th>
            <th>Max occlusion</th>
            <th>Is door</th>
            <th>Is glass</th>
            <th>Link type</th>
          </tr>
          {entities.map(portalEntity => {
            const { linkType, maxOcclusion, entityModelName, entityModelHashKey, isDoor, isGlass } = portalEntity;

            return (
              <tr>
                <td>{entityModelName ?? entityModelHashKey}</td>
                <td>{maxOcclusion}</td>
                <td>{isDoor.toString()}</td>
                <td>{isGlass.toString()}</td>
                <td>{linkType}</td>
              </tr>
            );
          })}
        </Table>
      </Content>
    </Container>
  );
};
