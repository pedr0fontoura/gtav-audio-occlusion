// Thanks to VPagani.

export function joaat(input: string, unsigned: boolean = false): number {
  let hash = 0;
  let len = input.length;

  const lowerCaseInput = input.toLowerCase();

  for (let i = 0; i < len; i++) {
    hash += lowerCaseInput.charCodeAt(i);
    hash += hash << 10;
    hash ^= hash >>> 6;
  }

  hash += hash << 3;
  hash ^= hash >>> 11;
  hash += hash << 15;

  return unsigned ? hash >>> 0 : hash;
}
