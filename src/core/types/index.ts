import { Big } from 'big.js';

export * as XML from './xml';

declare global {
  interface Vector3 {
    x: BigInt;
    y: BigInt;
    z: BigInt;
  }
}
