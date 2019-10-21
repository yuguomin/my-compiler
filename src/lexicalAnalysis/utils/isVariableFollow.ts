import { isAlpha, isDigit } from '../../common/utils/stringVerify';
import { SPECIAL_TOKEN } from '../../common/constant/SpecialToken';

export const isVariableFollow: (ch: string) => boolean = (ch) => {
  return isAlpha(ch) || isDigit(ch) || [SPECIAL_TOKEN.DOLLAR_SIGN, SPECIAL_TOKEN.UNDER_LINE].includes(ch);
}