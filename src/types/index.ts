export interface XMLEntry<Data, Item = void> {
  $: Data;
  Item: Item;
}

export interface XMLDataEntry<T> {
  $: T;
}