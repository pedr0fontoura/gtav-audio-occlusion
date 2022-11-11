import { Node } from './node';

export class Pair {
  public nodeFrom: Node;
  public nodeTo: Node;

  public isLimboPair: boolean;

  constructor(nodeFrom: Node, nodeTo: Node) {
    this.nodeFrom = nodeFrom;
    this.nodeTo = nodeTo;

    this.isLimboPair = nodeFrom.room.name === 'limbo' || nodeTo.room.name === 'limbo';
  }

  public static getPairs(nodes: Node[]): Pair[] {
    const pairs: Pair[] = [];

    for (const from of nodes) {
      for (const to of nodes) {
        if (from.index === to.index) continue;

        pairs.push(new Pair(from, to));
      }
    }

    return pairs;
  }
}
