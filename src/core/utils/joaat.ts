// Adapted from FxDK

export function joaat(key: string): number {
  key = key.toLowerCase();

  const hash = new Uint32Array(1);

  const chars = [...key];

  chars.forEach((_char, i) => {
    hash[0] += key.charCodeAt(i);
    hash[0] += hash[0] << 10;
    hash[0] ^= hash[0] >>> 6;
  });

  hash[0] += hash[0] << 3;
  hash[0] ^= hash[0] >>> 11;
  hash[0] += hash[0] << 15;

  return hash[0];
}
