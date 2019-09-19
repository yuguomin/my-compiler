import { ASTNodeType } from "../enum/ASTNodeType";

export interface IASTNode {
  getParent(): IASTNode | null;
  setParent(parentNode: IASTNode): void;
  getChildren(): IASTNode[];
  append2Child(childrenNode: IASTNode): void;
  getType(): ASTNodeType | null;
  getText(): string | null;
}