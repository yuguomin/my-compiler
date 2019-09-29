"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InputToken_1 = require("./constant/InputToken");
const SimpleParser_1 = require("../syntaxAnalysis/SimpleParser");
const ProcessArgv_1 = require("./constant/ProcessArgv");
const readline_1 = __importDefault(require("readline"));
const ASTNodeType_1 = require("../syntaxAnalysis/enum/ASTNodeType");
const SpecialToken_1 = require("src/common/constant/SpecialToken");
class SimpleScript {
    constructor() {
        this.code = '';
        this.isVerbose = false;
        this.initREPL = () => {
            this.REPL = readline_1.default.createInterface({
                input: process.stdin,
                output: process.stdout
            });
        };
        this.isVerbose = process.argv.slice(2)[0] === ProcessArgv_1.VERBOSE_STATUS_ARGV;
        this.initREPL();
        this.startREPL();
    }
    startREPL() {
        if (this.isVerbose) {
            console.log('verbose mode');
        }
        console.log(`Let's test your script language~ Please input \n`);
        this.REPL.on('line', (input) => {
            if (input === InputToken_1.EXIT_REPL_TOKEN) {
                this.closeREPL();
            }
            this.code += input + '\n';
            if (input[input.length - 1] === InputToken_1.REPL_END_TOKEN) {
                this.parseScript();
            }
        });
    }
    parseScript() {
        const rootNode = new SimpleParser_1.SimpleParser(this.code).getRootNode();
        if (!rootNode) {
            console.log(`warning: Can't parse script.`);
            return;
        }
        this.evaluate(rootNode);
    }
    evaluate(node, indent = '') {
        console.log('-v', this.isVerbose);
        let result = 0;
        let child1 = null;
        let child2 = null;
        let value1 = 0;
        let value2 = 0;
        if (this.isVerbose) {
            console.log(indent + 'Calculating: ' + node.getType());
        }
        switch (node.getType()) {
            case ASTNodeType_1.ASTNodeType.Program:
                node.getChildren().forEach((child) => {
                    this.evaluate(child, indent + '\t');
                });
                break;
            case ASTNodeType_1.ASTNodeType.Additive:
                child1 = node.getChildren()[0];
                value1 = this.evaluate(child1, indent + '\t');
                child2 = node.getChildren()[1];
                value1 = this.evaluate(child2, indent + '\t');
                result = node.getText() === SpecialToken_1.SPECIAL_TOKEN.PLUS ?
                    value1 + value2 : value1 - value2;
                break;
            case ASTNodeType_1.ASTNodeType.Multiplicative:
                child1 = node.getChildren()[0];
                value1 = this.evaluate(child1, indent + '\t');
                child2 = node.getChildren()[1];
                value1 = this.evaluate(child2, indent + '\t');
                result = node.getText() === SpecialToken_1.SPECIAL_TOKEN.STAR ?
                    value1 * value2 : value1 / value2;
                break;
            case ASTNodeType_1.ASTNodeType.Identifier:
                // get Identifier value
                break;
            case ASTNodeType_1.ASTNodeType.NumberLiteral:
                result = Number(node.getText());
                break;
            case ASTNodeType_1.ASTNodeType.VariableDeclare:
                break;
            case ASTNodeType_1.ASTNodeType.AssignmentStmt:
                break;
        }
        return result;
    }
    closeREPL() {
        console.log('good bye~');
        this.REPL.close();
    }
}
exports.SimpleScript = SimpleScript;
new SimpleScript();
