"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SimpleLexer_1 = require("./lexicalAnalysis/SimpleLexer");
const assignmentToken = new SimpleLexer_1.SimpleLexer('int asd1 = 123');
const compareToken = new SimpleLexer_1.SimpleLexer('asdddd >= 123');
// assignmentToken.dump();
compareToken.dump();
