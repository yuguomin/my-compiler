import { ISimpleToken } from "src/common/interface/ISimpleToken";

export class SimpleToken implements ISimpleToken {
  //Token类型
  public type = null;
  public text = '';

  public getType = () => {
    return this.type;
  }

  public getText = () => {
    return this.text;
  }
}