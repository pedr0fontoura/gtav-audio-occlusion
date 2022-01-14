import { Big } from 'big.js';

declare global {
  interface Vector3 {
    x: Big;
    y: Big;
    z: Big;
  }
}
