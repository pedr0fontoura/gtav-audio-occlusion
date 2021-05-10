import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { FaTimes } from 'react-icons/fa';

import AudioOcclusion, { PathNodeDirection } from '../../../../core/classes/audioOcclusion';

import { Container, TableContainer, Button } from './styles';

const PathNodes = () => {
  const [pathNodesDirections, setPathNodesDirections] = useState<PathNodeDirection[]>();

  const removePathNode = (index: number) => {
    setPathNodesDirections(value => value.filter((item, idx) => idx !== index));
  };

  useEffect(() => {
    if (pathNodesDirections) {
      ipcRenderer.send('updateAudioOcclusion', { pathNodesDirections: pathNodesDirections });
    }
  }, [pathNodesDirections]);

  useEffect(() => {
    (async () => {
      const audioOcclusion: AudioOcclusion = await ipcRenderer.invoke('getAudioOcclusion');

      if (audioOcclusion) {
        const { pathNodesDirections } = audioOcclusion;

        setPathNodesDirections(pathNodesDirections);
      }
    })();
  }, []);

  return (
    <Container>
      <h1>Path Nodes</h1>
      <TableContainer>
        <table>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Portal</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pathNodesDirections &&
              pathNodesDirections.map((pathNodeDirection, index) => (
                <tr key={index} id={`pathnode_${index}`}>
                  <td>Room {pathNodeDirection.from}</td>
                  <td>Room {pathNodeDirection.to}</td>
                  <td>{pathNodeDirection.portal}</td>
                  <td>
                    <Button onClick={() => removePathNode(index)}>
                      <FaTimes size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </TableContainer>
    </Container>
  );
};

export default PathNodes;
