export interface ISimpleScript {
  startREPL(): void;
  closeREPL(): void;
  parseScript(): void;
}