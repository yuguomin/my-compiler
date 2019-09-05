"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SimpleLexer_1 = require("./lexicalAnalysis/SimpleLexer");
const testLexer = new SimpleLexer_1.SimpleLexer();
const data = testLexer.tokenize('asd = 123');
