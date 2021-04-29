// This file belongs to pire-gta5

/**
 * FiveM: signed and not case sensitive (default)
 * AltV: unsigned and not case sensitive
 * RageMP: unsigned and not case sensistive
 */
 export function joaat(input: string, unsigned: boolean = false, cased: boolean = false): number {
  let hash = 0;
  let len = input.length;

  if (!cased)
      input = input.toLowerCase();

  for (let i = 0; i < len; i++) {
      hash += input.charCodeAt(i);
      hash += (hash << 10);
      hash ^= (hash >>> 6);
  }

  hash += (hash << 3);
  hash ^= (hash >>> 11);
  hash += (hash << 15);

  return unsigned ? hash >>> 0 : hash;
}
