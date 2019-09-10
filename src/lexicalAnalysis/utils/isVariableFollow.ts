import { isAlpha, isDigit } from "../../common/utils/stringVerify";
import { SPECIAL_TOKEN } from "../contants/lexicalAnalysis";

export const isVariableFollow: (char: string) => boolean = (char) => {
  return isAlpha(char) || isDigit(char) || [SPECIAL_TOKEN.DOLLAR_SIGN, SPECIAL_TOKEN.UNDER_LINE].includes(char);
}