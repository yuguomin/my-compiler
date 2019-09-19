import { ASTNodeType } from "../enum/ASTNodeType";

export interface IASTNode {
  getParent(): IASTNode | null;
  setParent(IASTNode): void;
  getChildren(): IASTNode[];
  getType(): ASTNodeType | null;
  getText(): string | null;
}