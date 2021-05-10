import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';

import AudioGameData, { InteriorRoom } from '../../../../core/classes/audioGameData';

import { Container, TableContainer } from './styles';

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
      ipcRenderer.send('updateAudioGameData', { InteriorRooms: interiorRooms });
    }
  }, [interiorRooms]);

  useEffect(() => {
    (async () => {
      const audioGameData: AudioGameData = await ipcRenderer.invoke('getAudioGameData');

      if (audioGameData) {
        setInteriorRooms(audioGameData.InteriorRooms);
      }
    })();
  }, []);

  return (
    <Container>
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
                  <td>{interiorRoom.MloRoom}</td>
                  <td>
                    <input type="number" value={interiorRoom.Unk02} />
                  </td>
                  <td>
                    <input type="number" value={interiorRoom.Unk03} />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={interiorRoom.Unk04}
                      onChange={e =>
                        updateInteriorRooms(index, { Unk04: parseFloat(e.target.value) })
                      }
                      min={0}
                      max={1}
                      step={0.1}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={interiorRoom.Unk05}
                      onChange={e =>
                        updateInteriorRooms(index, { Unk05: parseFloat(e.target.value) })
                      }
                      min={0}
                      max={1}
                      step={0.1}
                    />
                  </td>
                  <td>{interiorRoom.Unk06}</td>
                  <td>
                    <input type="number" value={interiorRoom.Unk07} />
                  </td>
                  <td>
                    <input type="number" value={interiorRoom.Unk08} />
                  </td>
                  <td>
                    <input type="number" value={interiorRoom.Unk09} />
                  </td>
                  <td>
                    <input type="number" value={interiorRoom.Unk10} />
                  </td>
                  <td>
                    <input type="number" value={interiorRoom.Unk11} />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={interiorRoom.Unk12}
                      onChange={e =>
                        updateInteriorRooms(index, { Unk12: parseInt(e.target.value) })
                      }
                      min={0}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </TableContainer>
    </Container>
  );
};

export default Rooms;
