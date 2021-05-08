export interface XMLEntry<Data, Item = void> {
  $: Data;
  Item: Item;
}

export interface XMLDataEntry<T> {
  $: T;
}

export * from './ymap';
export * from './ytyp';
export * from './ymt';
export * from './dat15';
export * from './dat151';
