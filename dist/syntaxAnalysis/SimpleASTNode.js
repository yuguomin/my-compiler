"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SimpleASTNode {
    constructor(nodeType, text) {
        this.parentNode = null;
        this.childrenNodes = [];
        this.nodeType = null;
        this.text = null;
        this.getParent = () => {
            return this.parentNode;
        };
        this.getChildren = () => {
            return this.childrenNodes;
        };
        this.getType = () => {
            return this.nodeType;
        };
        this.getText = () => {
            return this.text;
        };
        this.nodeType = nodeType;
        this.text = text;
    }
}
exports.SimpleASTNode = SimpleASTNode;
