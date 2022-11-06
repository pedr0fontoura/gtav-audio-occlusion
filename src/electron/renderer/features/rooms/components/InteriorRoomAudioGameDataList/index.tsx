import React from 'react';

import { TableContainer, Table } from '@/electron/renderer/components/Table';

import { useInterior } from '@/electron/renderer/features/interior';

import { parseHexToString } from '@/electron/renderer/utils';

export const InteriorRoomAudioGameDataList = (): JSX.Element => {
  const { interior } = useInterior();

  if (!interior) {
    return null;
  }

  const interiorRoomAudioGameDataList = interior.interiorRoomAudioGameDataList;

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Flags</th>
            <th>MloRoom</th>
            <th>Zone</th>
            <th>Unk02</th>
            <th>Unk03</th>
            <th>Reverb</th>
            <th>Echo</th>
            <th>Sound</th>
            <th>Unk07</th>
            <th>Unk08</th>
            <th>Unk09</th>
            <th>Unk10</th>
            <th>Unk11</th>
            <th>Unk12</th>
            <th>Unk13</th>
            <th>SoundSet</th>
          </tr>
        </thead>
        <tbody>
          {interiorRoomAudioGameDataList.map((interiorRoomAudioGameData, index) => (
            <tr key={index}>
              <td>{interiorRoomAudioGameData.name}</td>
              <td>{parseHexToString(interiorRoomAudioGameData.flags)}</td>
              <td>{interiorRoomAudioGameData.mloRoom}</td>
              <td>{interiorRoomAudioGameData.zone}</td>
              <td>{interiorRoomAudioGameData.unk02}</td>
              <td>{interiorRoomAudioGameData.unk03}</td>
              <td>{interiorRoomAudioGameData.reverb}</td>
              <td>{interiorRoomAudioGameData.echo}</td>
              <td>{interiorRoomAudioGameData.sound}</td>
              <td>{interiorRoomAudioGameData.unk07}</td>
              <td>{interiorRoomAudioGameData.unk08}</td>
              <td>{interiorRoomAudioGameData.unk09}</td>
              <td>{interiorRoomAudioGameData.unk10}</td>
              <td>{interiorRoomAudioGameData.unk11}</td>
              <td>{interiorRoomAudioGameData.unk12}</td>
              <td>{interiorRoomAudioGameData.unk13}</td>
              <td>{interiorRoomAudioGameData.soundSet}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};
