import { isAlpha } from "../../common/utils/stringVerify";
import { SPECIAL_TOKEN } from "../contants/lexicalAnalysis";

export const isVariableStart: (char: string) => boolean = (char) => {
  return isAlpha(char) || [SPECIAL_TOKEN.DOLLAR_SIGN, SPECIAL_TOKEN.UNDER_LINE].includes(char);
}