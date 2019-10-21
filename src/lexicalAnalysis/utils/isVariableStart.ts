import { isAlpha } from '../../common/utils/stringVerify';
import { SPECIAL_TOKEN } from '../../common/constant/SpecialToken';

export const isVariableStart: (ch: string) => boolean = (ch) => {
  return isAlpha(ch) || [SPECIAL_TOKEN.DOLLAR_SIGN, SPECIAL_TOKEN.UNDER_LINE].includes(ch);
}