export interface XMLEntry<Data, Item = void> {
  $: Data;
  Item: Item;
}

export interface XMLDataEntry<T> {
  $: T;
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}
