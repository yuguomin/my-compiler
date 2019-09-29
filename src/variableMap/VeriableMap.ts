import { IVeriableMap } from './interface/IVeriableMap';

export class VeriableMap implements IVeriableMap {
  private veriableMap: any = {};

  public push(name: string, value: number) {
    this.veriableMap[name] = value;
  }

  public get(name: string) {
    if (this.veriableMap[name]) {
      return this.veriableMap[name];
    }
    return null;
  }
}