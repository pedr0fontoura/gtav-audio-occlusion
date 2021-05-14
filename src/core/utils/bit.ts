export function isBitSet(value: number, bit: number): boolean {
  return ((value >> bit) & 1) > 0;
}
