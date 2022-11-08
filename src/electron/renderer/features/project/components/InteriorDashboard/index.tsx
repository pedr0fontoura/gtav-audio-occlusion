import React from 'react';

import { useInterior } from '@/electron/renderer/features/interior';

import { TableContainer, Table } from '@/electron/renderer/components/Table';

import { Container } from './styles';

export const InteriorDashboard = (): JSX.Element => {
  const { interior } = useInterior();

  if (!interior) {
    return null;
  }

  const { mapDataFilePath, mapTypesFilePath } = interior;

  return (
    <Container>
      <div>
        <p>Source</p>
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Path</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#map</td>
                <td>{mapDataFilePath}</td>
              </tr>
              <tr>
                <td>#typ</td>
                <td>{mapTypesFilePath}</td>
              </tr>
            </tbody>
          </Table>
        </TableContainer>
      </div>
      <div>
        <p>Generated</p>
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Path</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>naOcclusionInteriorMetadata</td>
                <td>C:/User/Documents/filename.ymap.xml</td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
};
