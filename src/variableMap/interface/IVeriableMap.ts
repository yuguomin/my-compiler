export interface IVeriableMap {
  push(name: string, value: number): void;
  get(name: string): number;
  containsKey(name: string): boolean;
}