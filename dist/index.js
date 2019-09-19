"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SimpleLexer_1 = require("./lexicalAnalysis/SimpleLexer");
const SimpleParser_1 = require("./syntaxAnalysis/SimpleParser");
const assignmentToken = new SimpleLexer_1.SimpleLexer('var 1$asd_1<=>===123;');
const compareToken = new SimpleLexer_1.SimpleLexer('asdddd >= 123');
const calculateToken = new SimpleLexer_1.SimpleLexer('2 + 3 * 5 / 3 * ( 4 + 6 );');
// console.log('code:', assignmentToken.getCode());
// assignmentToken.dump();
// console.log('\ncode:', compareToken.getCode());
// compareToken.dump();
// console.log('\ncode:', calculateToken.getCode());
// calculateToken.dump();
const assignmentParser = new SimpleParser_1.SimpleParser('var $_asb = 1;');
assignmentParser.dumpAST();
