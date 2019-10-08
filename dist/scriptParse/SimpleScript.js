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
const SpecialToken_1 = require("../common/constant/SpecialToken");
const VeriableMap_1 = require("../variableMap/VeriableMap");
class SimpleScript {
    constructor() {
        this.code = '';
        this.isVerbose = false;
        this.veriableMap = new VeriableMap_1.VeriableMap();
        this.initREPL = () => {
            this.REPL = readline_1.default.createInterface({
                input: process.stdin,
                output: process.stdout
            });
        };
        this.getRealValue = (value) => {
            if (value === null) {
                return null;
            }
            return Number(value);
        };
        this.isVerbose = process.argv.slice(2)[0] === ProcessArgv_1.VERBOSE_STATUS_ARGV;
        this.initREPL();
        this.startREPL();
    }
    startREPL() {
        if (this.isVerbose) {
            console.log('verbose mode');
        }
        process.stdout.write(`Let's test your script language~ Please input \n\n>`);
        this.REPL.on('line', (input) => {
            if (input === InputToken_1.EXIT_REPL_TOKEN) {
                this.closeREPL();
                return;
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
        try {
            this.evaluate(rootNode);
        }
        catch (err) {
            console.log(err.message);
        }
        this.code = '';
        process.stdout.write('\r>');
    }
    evaluate(node, indent = '') {
        let result = null;
        let child1 = null;
        let child2 = null;
        let value1 = 0;
        let value2 = 0;
        let veriableName = '';
        let veriableValue = null;
        if (this.isVerbose) {
            console.log(indent + 'Calculating: ' + node.getType());
        }
        switch (node.getType()) {
            case ASTNodeType_1.ASTNodeType.Program:
                node.getChildren().forEach((child) => {
                    result = this.evaluate(child, indent + '\t');
                });
                break;
            case ASTNodeType_1.ASTNodeType.Additive:
                child1 = node.getChildren()[0];
                value1 = this.evaluate(child1, indent + '\t');
                child2 = node.getChildren()[1];
                value2 = this.evaluate(child2, indent + '\t');
                result = node.getText() === SpecialToken_1.SPECIAL_TOKEN.PLUS ?
                    value1 + value2 : value1 - value2;
                break;
            case ASTNodeType_1.ASTNodeType.Multiplicative:
                child1 = node.getChildren()[0];
                value1 = this.evaluate(child1, indent + '\t');
                child2 = node.getChildren()[1];
                value2 = this.evaluate(child2, indent + '\t');
                result = node.getText() === SpecialToken_1.SPECIAL_TOKEN.STAR ?
                    value1 * value2 : value1 / value2;
                break;
            case ASTNodeType_1.ASTNodeType.Identifier:
                // get Identifier value
                veriableName = node.getText() || '';
                if (this.veriableMap.containsKey(veriableName)) {
                    // TODO: this way will type change, if not number type, need dispose
                    result = this.getRealValue(this.veriableMap.get(veriableName));
                }
                else {
                    throw new Error(`unknown variable: ${veriableName}`);
                }
                break;
            case ASTNodeType_1.ASTNodeType.NumberLiteral:
                result = this.getRealValue(node.getText());
                break;
            case ASTNodeType_1.ASTNodeType.AssignmentStmt:
                veriableName = node.getText() || '';
                if (!this.veriableMap.containsKey(veriableName)) {
                    throw new Error(`unknown variable: ${veriableName}`);
                }
            case ASTNodeType_1.ASTNodeType.VariableDeclare:
                veriableName = node.getText() || '';
                if (node.getChildren().length > 0) {
                    const child = node.getChildren()[0];
                    result = this.evaluate(child, indent + '\t');
                    veriableValue = result;
                }
                this.veriableMap.push(veriableName, veriableValue);
                break;
        }
        if (this.isVerbose) {
            console.log(indent + 'Result: ' + result);
        }
        else if (['', '' + '\t'].includes(indent)) {
            if (node.getType() === ASTNodeType_1.ASTNodeType.VariableDeclare || node.getType() === ASTNodeType_1.ASTNodeType.AssignmentStmt) {
                console.log(node.getText() + ': ' + result);
            }
            else if (node.getType() !== ASTNodeType_1.ASTNodeType.Program) {
                console.log(result);
            }
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
