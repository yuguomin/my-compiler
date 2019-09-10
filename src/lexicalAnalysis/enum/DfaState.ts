export enum DfaState {
  Initial,
  Id,
  Id_variable1,
  Id_variable2,
  Id_variable3,
  Assignment,
  NSC,
  SC,
  NumberLiteral,
  GE,
  GT,
  LT,
  LE,
  Plus, Minus, Star, Slash,
  Semicolon,
  LeftParen,
  RightParen
}