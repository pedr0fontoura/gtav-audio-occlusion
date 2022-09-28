import { Node } from '../../classes/node';

import { naOcclusionPathNodeMetadata } from './naOcclusionPathNodeMetadata';

export const findPathNode = (
  pathNodeList: naOcclusionPathNodeMetadata[],
  nodeFrom: Node,
  nodeTo: Node,
  pathType: number,
): naOcclusionPathNodeMetadata => {
  return pathNodeList.find(
    pathNode =>
      pathNode.nodeFrom.index === nodeFrom.index &&
      pathNode.nodeTo.index === nodeTo.index &&
      pathNode.pathType === pathType,
  );
};

export const addPathNodeToList = (
  pathNodeList: naOcclusionPathNodeMetadata[],
  pathNode: naOcclusionPathNodeMetadata,
): void => {
  pathNodeList.push(pathNode);
};

export const hasPathAlreadyBeenFound = (
  pathNodeList: naOcclusionPathNodeMetadata[],
  nodeFrom: Node,
  nodeTo: Node,
): boolean => {
  return !!pathNodeList.find(
    pathNode =>
      pathNode.nodeFrom.index === nodeFrom.index && pathNode.nodeTo.index === nodeTo.index && pathNode.pathType === 3,
  );
};
