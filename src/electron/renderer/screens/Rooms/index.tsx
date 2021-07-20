import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';

import AudioGameData, { InteriorRoom } from '../../../../core/classes/audioGameData';

import { TableContainer } from './styles';

const Rooms = () => {
  const [interiorRooms, setInteriorRooms] = useState<InteriorRoom[]>();

  const updateInteriorRooms = (roomIdx: number, data: { [key in keyof InteriorRoom]?: any }) => {
    setInteriorRooms(
      interiorRooms.map((interiorRoom, index) => {
        if (roomIdx !== index) return interiorRoom;

        return {
          ...interiorRoom,
          ...data,
        };
      }),
    );
  };

  useEffect(() => {
    if (interiorRooms) {
      ipcRenderer.send('updateAudioGameData', { interiorRooms: interiorRooms });
    }
  }, [interiorRooms]);

  useEffect(() => {
    (async () => {
      const audioGameData: AudioGameData = await ipcRenderer.invoke('getAudioGameData');

      if (audioGameData) {
        setInteriorRooms(audioGameData.interiorRooms);
      }
    })();
  }, []);

  return (
    <>
      <h1>Rooms</h1>
      <TableContainer>
        <table>
          <thead>
            <tr>
              <th>Index</th>
              <th>MloRoom</th>
              <th>Unk02</th>
              <th>Unk03</th>
              <th>Reverb</th>
              <th>Echo</th>
              <th>Unk06</th>
              <th>Unk07</th>
              <th>Unk08</th>
              <th>Unk09</th>
              <th>Unk10</th>
              <th>Unk11</th>
              <th>Unk12</th>
            </tr>
          </thead>
          <tbody>
            {interiorRooms &&
              interiorRooms.map((interiorRoom, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{interiorRoom.mloRoom}</td>
                  <td>{interiorRoom.unk02}</td>
                  <td>{interiorRoom.unk03}</td>
                  <td>
                    <input
                      type="number"
                      value={interiorRoom.unk04}
                      onChange={e => updateInteriorRooms(index, { unk04: parseFloat(e.target.value) })}
                      min={0}
                      max={1}
                      step={0.1}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={interiorRoom.unk05}
                      onChange={e => updateInteriorRooms(index, { unk05: parseFloat(e.target.value) })}
                      min={0}
                      max={1}
                      step={0.1}
                    />
                  </td>
                  <td>{interiorRoom.unk06}</td>
                  <td>{interiorRoom.unk07}</td>
                  <td>{interiorRoom.unk08}</td>
                  <td>{interiorRoom.unk09}</td>
                  <td>{interiorRoom.unk10}</td>
                  <td>{interiorRoom.unk11}</td>
                  <td>
                    <input
                      type="number"
                      value={interiorRoom.unk12}
                      onChange={e => updateInteriorRooms(index, { unk12: parseInt(e.target.value) })}
                      min={0}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </TableContainer>
    </>
  );
};

export default Rooms;
