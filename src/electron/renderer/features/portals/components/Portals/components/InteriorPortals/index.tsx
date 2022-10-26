import React from 'react';

import { SerializedInterior } from '@/electron/common/types/interior';

import { Table } from '@/electron/renderer/components/Table';

import { Container, Header, Title, Content } from './styles';

type InteriorPortalsProps = {
  index: number;
  interior: SerializedInterior;
};

export const InteriorPortals = ({ index, interior }: InteriorPortalsProps) => {
  const { identifier, naOcclusionInteriorMetadata } = interior;

  const { portalInfoList } = naOcclusionInteriorMetadata;

  return (
    <Container>
      <Header>
        <Title>
          <span>{index + 1}.</span>"{interior.identifier}"
        </Title>
      </Header>
      <Content>
        <Table>
          <tr>
            <th>Index</th>
            <th>Room from</th>
            <th>Room to</th>
            <th>Interior from</th>
            <th>Interior to</th>
          </tr>
          {portalInfoList.map((portalInfo, portalInfoIndex) => (
            <tr>
              <td>{portalInfoIndex}</td>
              <td>{portalInfo.roomIdx}</td>
              <td>{portalInfo.destRoomIdx}</td>
              <td>{portalInfo.interiorProxyHash}</td>
              <td>{portalInfo.destInteriorHash}</td>
            </tr>
          ))}
        </Table>
      </Content>
    </Container>
  );
};
