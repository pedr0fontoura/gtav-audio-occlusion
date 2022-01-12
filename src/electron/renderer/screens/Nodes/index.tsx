import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';

import Node from '../../../../core/classes/audioOcclusion/node';

import { TableContainer, LinksWrapper, LinkContainer } from './styles';

const Nodes = () => {
  const [nodes, setNodes] = useState<Node[]>();

  const updateLink = (nodeIndex: number, edgeIndex: number, activate: boolean) => {
    setNodes(
      nodes.map(node => {
        if (nodeIndex !== node.index) return node;

        if (!activate) {
          return {
            ...node,
            inactiveEdges: [...node.inactiveEdges, edgeIndex],
          };
        } else {
          return {
            ...node,
            inactiveEdges: node.inactiveEdges.filter(inactiveEdge => inactiveEdge !== edgeIndex),
          };
        }
      }),
    );
  };

  useEffect(() => {
    if (nodes) {
      ipcRenderer.send('updateAudioOcclusion', { nodes });
    }
  }, [nodes]);

  useEffect(() => {
    (async () => {
      const nodes: Node[] = await ipcRenderer.invoke('getNodes');

      if (nodes) {
        setNodes(nodes);
      }
    })();
  }, []);

  return (
    <>
      <h1>Nodes</h1>
      <TableContainer>
        <table>
          <thead>
            <tr>
              <th>Node</th>
              <th>Links</th>
            </tr>
          </thead>
          <tbody>
            {nodes &&
              nodes.map(node => (
                <tr key={node.index}>
                  <td>Room {node.index}</td>
                  <LinksWrapper>
                    {node.edges.map(edge => (
                      <LinkContainer key={edge.index}>
                        {edge.index}
                        <input
                          type="checkbox"
                          checked={!node.inactiveEdges.includes(edge.index)}
                          onChange={e => updateLink(node.index, edge.index, e.target.checked)}
                        />
                      </LinkContainer>
                    ))}
                  </LinksWrapper>
                </tr>
              ))}
          </tbody>
        </table>
      </TableContainer>
    </>
  );
};

export default Nodes;
