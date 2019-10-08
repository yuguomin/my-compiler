export interface IVeriableMap {
  push(name: string, value: number | null): void;
  get(name: string): number;
  containsKey(name: string): boolean;
}