"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SimpleLexer_1 = require("./lexicalAnalysis/SimpleLexer");
const assignmentToken = new SimpleLexer_1.SimpleLexer('int asd1 = 123');
const compareToken = new SimpleLexer_1.SimpleLexer('asdddd >= 123');
const calculateToken = new SimpleLexer_1.SimpleLexer('2 + 3 * 5 / 3 * ( 4 + 6 );');
console.log(assignmentToken.getCode());
assignmentToken.dump();
console.log('\n');
console.log(compareToken.getCode());
compareToken.dump();
console.log('\n');
console.log(calculateToken.getCode());
calculateToken.dump();
