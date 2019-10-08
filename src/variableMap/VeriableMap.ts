import { IVeriableMap } from './interface/IVeriableMap';

export class VeriableMap implements IVeriableMap {
  private veriableMap: object = {};

  public push(name: string, value: number | null) {
    this.veriableMap[name] = value;
  }

  public get(name: string) {
    return this.veriableMap[name];
  }

  public containsKey(name: string) {
    return this.veriableMap.hasOwnProperty(name);
  }
}