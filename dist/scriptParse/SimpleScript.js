"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const InputToken_1 = require("./constant/InputToken");
const SimpleParser_1 = require("../syntaxAnalysis/SimpleParser");
class SimpleScript {
    constructor() {
        this.code = '';
        this.initREPL = () => {
            this.REPL = readline_1.default.createInterface({
                input: process.stdin,
                output: process.stdout
            });
        };
        this.initREPL();
        this.startREPL();
    }
    startREPL() {
        console.log(`Let's test your script language~ \nplease input \n`);
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
    closeREPL() {
        console.log('good bye~');
        this.REPL.close();
    }
    parseScript() {
        console.log('code', this.code);
        new SimpleParser_1.SimpleParser(this.code).dumpAST();
    }
}
exports.SimpleScript = SimpleScript;
new SimpleScript();
