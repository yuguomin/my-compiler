import { SimpleLexer } from "./lexicalAnalysis/SimpleLexer";

const testLexer = new SimpleLexer();
const data = testLexer.tokenize('asd = 123');