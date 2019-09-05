"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SimpleLexer_1 = require("./lexicalAnalysis/SimpleLexer");
const testLexer = new SimpleLexer_1.SimpleLexer('asd >= 123');
const data = new SimpleLexer_1.SimpleLexer('asdddd = 123');
testLexer.dump();
data.getTokens();
