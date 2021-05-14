const INT32_MAX = 2147483647;
const INT32_MIN = -2147483648;

export function convertToInt32(n: number): number {
  if (n > INT32_MIN && n < INT32_MAX) {
    return n;
  }

  return n & 0xffffffff;
}
