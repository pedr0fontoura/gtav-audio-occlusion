export const parseHexToString = (value: number): string => {
  const stringifiedValue = value.toString(16);

  const paddedStringifiedValue = stringifiedValue.padEnd(8, '0');

  const upperCasePaddedStringifiedValue = paddedStringifiedValue.toUpperCase();

  return `0x${upperCasePaddedStringifiedValue}`;
};
