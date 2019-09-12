import { ASTNodeType } from "../enum/ASTNodeType";

export interface IASTNode {
  getParent(): IASTNode | null;
  getChildren(): IASTNode[];
  getType(): ASTNodeType | null;
  getText(): string | null;
}