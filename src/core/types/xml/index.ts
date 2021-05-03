export interface XMLEntry<Data, Item = void> {
  $: Data;
  Item: Item;
}

export interface XMLDataEntry<T> {
  $: T;
}

export * from './ymap';
export * from './ymt';
export * from './ytyp';
