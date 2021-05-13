import Node from './node';

export default class Pair {
  public nodeFrom: Node;
  public nodeTo: Node;

  public isLimboPair: boolean;

  constructor(nodeFrom: Node, nodeTo: Node) {
    this.nodeFrom = nodeFrom;
    this.nodeTo = nodeTo;

    this.isLimboPair = nodeFrom.name === 'limbo' || nodeTo.name === 'limbo';
  }

  public static getPairs(nodes: Node[]): Pair[] {
    const pairs: Pair[] = [];
    const inactiveNodes: Node[] = [];

    nodes.forEach(nodeFrom => {
      nodes.forEach(nodeTo => {
        if (inactiveNodes.some(inactiveNode => inactiveNode === nodeTo)) {
          return;
        }

        if (nodeFrom != nodeTo) {
          pairs.push(new Pair(nodeFrom, nodeTo));
          inactiveNodes.push(nodeFrom);
        }
      });
    });

    return pairs;
  }
}
