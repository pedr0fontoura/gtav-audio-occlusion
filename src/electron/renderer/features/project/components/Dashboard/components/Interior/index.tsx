import React from 'react';

import { Container, Header, Title, RemoveInteriorButton, Content, Table } from './styles';

type InteriorProps = {
  index: number;
  identifier: string;
  mapDataFilePath: string;
  mapTypesFilePath: string;
  canRemove?: boolean;
};

export const Interior = ({ index, identifier, mapDataFilePath, mapTypesFilePath, canRemove }: InteriorProps) => {
  return (
    <Container>
      <Header>
        <Title>
          <span>{index + 1}.</span>"{identifier}"
        </Title>
        {canRemove && <RemoveInteriorButton type="button">remove interior</RemoveInteriorButton>}
      </Header>
      <Content>
        <div>
          <h3>Source</h3>
          <Table>
            <tr>
              <th>Type</th>
              <th>Path</th>
            </tr>
            <tr>
              <td>#map</td>
              <td>{mapDataFilePath}</td>
            </tr>
            <tr>
              <td>#typ</td>
              <td>{mapTypesFilePath}</td>
            </tr>
          </Table>
        </div>
        <div>
          <h3>Generated</h3>
          <Table>
            <tr>
              <th>Type</th>
              <th>Path</th>
              <th>Action</th>
            </tr>
            <tr>
              <td>naOcclusionInteriorMetadata</td>
              <td>C:/User/Documents/filename.ymap.xml</td>
              <td></td>
            </tr>
          </Table>
        </div>
      </Content>
    </Container>
  );
};
