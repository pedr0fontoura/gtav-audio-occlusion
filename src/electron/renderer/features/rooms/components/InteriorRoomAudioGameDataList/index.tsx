import React from 'react';

import { TableContainer, Table } from '@/electron/renderer/components/Table';

import { useInterior } from '@/electron/renderer/features/interior';

import { parseHexToString } from '@/electron/renderer/utils';

import { InputWrapper, MediumInput, SmallInput } from './styles';

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
              <td>
                <InputWrapper>
                  <MediumInput value={interiorRoomAudioGameData.zone} type="text" />
                </InputWrapper>
              </td>
              <td>
                <InputWrapper>
                  <SmallInput value={interiorRoomAudioGameData.unk02} type="number" />
                </InputWrapper>
              </td>
              <td>
                <InputWrapper>
                  <SmallInput value={interiorRoomAudioGameData.unk03} type="number" />
                </InputWrapper>
              </td>
              <td>
                <InputWrapper>
                  <SmallInput value={interiorRoomAudioGameData.reverb} type="number" min={0} max={1} step={0.1} />
                </InputWrapper>
              </td>
              <td>
                <InputWrapper>
                  <SmallInput value={interiorRoomAudioGameData.echo} type="number" min={0} max={1} step={0.1} />
                </InputWrapper>
              </td>
              <td>
                <InputWrapper>
                  <MediumInput value={interiorRoomAudioGameData.sound} type="text" />
                </InputWrapper>
              </td>
              <td>
                <InputWrapper>
                  <SmallInput value={interiorRoomAudioGameData.unk07} type="number" />
                </InputWrapper>
              </td>
              <td>
                <InputWrapper>
                  <SmallInput value={interiorRoomAudioGameData.unk08} type="number" />
                </InputWrapper>
              </td>
              <td>
                <InputWrapper>
                  <SmallInput value={interiorRoomAudioGameData.unk09} type="number" />
                </InputWrapper>
              </td>
              <td>
                <InputWrapper>
                  <SmallInput value={interiorRoomAudioGameData.unk10} type="number" />
                </InputWrapper>
              </td>
              <td>
                <InputWrapper>
                  <SmallInput value={interiorRoomAudioGameData.unk11} type="number" />
                </InputWrapper>
              </td>
              <td>
                <InputWrapper>
                  <SmallInput value={interiorRoomAudioGameData.unk12} type="number" />
                </InputWrapper>
              </td>
              <td>
                <InputWrapper>
                  <MediumInput value={interiorRoomAudioGameData.unk13} type="text" />
                </InputWrapper>
              </td>
              <td>{interiorRoomAudioGameData.soundSet}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};
