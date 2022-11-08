import React from 'react';

import { SerializedInteriorRoomAudioGameData } from '@/electron/common/types/audioGameData';

import { TableContainer, Table } from '@/electron/renderer/components/Table';

import { useInterior } from '@/electron/renderer/features/interior';

import { parseHexToString } from '@/electron/renderer/utils';

import { updateInteriorRoomAudioGameData } from '../../index';

import { InputWrapper, MediumInput, SmallInput } from './styles';

export const InteriorRoomAudioGameDataList = (): JSX.Element => {
  const { interior, fetchInterior } = useInterior();

  if (!interior) {
    return null;
  }

  const { identifier, interiorRoomAudioGameDataList } = interior;

  const update = async (roomIndex: number, data: Partial<SerializedInteriorRoomAudioGameData>): Promise<void> => {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key];

        if (isNaN(value)) return;
      }
    }

    await updateInteriorRoomAudioGameData(identifier, roomIndex, data);

    await fetchInterior();
  };

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
                  <MediumInput
                    value={interiorRoomAudioGameData.zone}
                    type="text"
                    onChange={e => update(index, { zone: e.target.value })}
                  />
                </InputWrapper>
              </td>
              <td>
                <InputWrapper>
                  <SmallInput
                    value={interiorRoomAudioGameData.unk02}
                    type="number"
                    onChange={e => update(index, { unk02: Number(e.target.value) })}
                  />
                </InputWrapper>
              </td>
              <td>
                <InputWrapper>
                  <SmallInput
                    value={interiorRoomAudioGameData.unk03}
                    type="number"
                    step={0.05}
                    onChange={e => update(index, { unk03: Number(e.target.value) })}
                  />
                </InputWrapper>
              </td>
              <td>
                <InputWrapper>
                  <SmallInput
                    value={interiorRoomAudioGameData.reverb}
                    type="number"
                    min={0}
                    max={1}
                    step={0.1}
                    onChange={e => update(index, { reverb: Number(e.target.value) })}
                  />
                </InputWrapper>
              </td>
              <td>
                <InputWrapper>
                  <SmallInput
                    value={interiorRoomAudioGameData.echo}
                    type="number"
                    min={0}
                    max={1}
                    step={0.1}
                    onChange={e => update(index, { echo: Number(e.target.value) })}
                  />
                </InputWrapper>
              </td>
              <td>
                <InputWrapper>
                  <MediumInput
                    value={interiorRoomAudioGameData.sound}
                    type="text"
                    onChange={e => update(index, { sound: e.target.value })}
                  />
                </InputWrapper>
              </td>
              <td>
                <InputWrapper>
                  <SmallInput
                    value={interiorRoomAudioGameData.unk07}
                    type="number"
                    onChange={e => update(index, { unk07: Number(e.target.value) })}
                  />
                </InputWrapper>
              </td>
              <td>
                <InputWrapper>
                  <SmallInput
                    value={interiorRoomAudioGameData.unk08}
                    type="number"
                    onChange={e => update(index, { unk08: Number(e.target.value) })}
                  />
                </InputWrapper>
              </td>
              <td>
                <InputWrapper>
                  <SmallInput
                    value={interiorRoomAudioGameData.unk09}
                    type="number"
                    onChange={e => update(index, { unk09: Number(e.target.value) })}
                  />
                </InputWrapper>
              </td>
              <td>
                <InputWrapper>
                  <SmallInput
                    value={interiorRoomAudioGameData.unk10}
                    type="number"
                    step={0.1}
                    onChange={e => update(index, { unk10: Number(e.target.value) })}
                  />
                </InputWrapper>
              </td>
              <td>
                <InputWrapper>
                  <SmallInput
                    value={interiorRoomAudioGameData.unk11}
                    type="number"
                    onChange={e => update(index, { unk11: Number(e.target.value) })}
                  />
                </InputWrapper>
              </td>
              <td>
                <InputWrapper>
                  <SmallInput
                    value={interiorRoomAudioGameData.unk12}
                    type="number"
                    onChange={e => update(index, { unk12: Number(e.target.value) })}
                  />
                </InputWrapper>
              </td>
              <td>
                <InputWrapper>
                  <MediumInput
                    value={interiorRoomAudioGameData.unk13}
                    type="text"
                    onChange={e => update(index, { unk13: e.target.value })}
                  />
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
