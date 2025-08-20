
export enum Step {
  Deconstruct = 1,
  Diagnose = 2,
  Develop = 3,
  Deliver = 4,
}

export interface PromptData {
  rawPrompt: string;
  coreTask: string;
  inputs: string;
  output: string;
  features: string;
}
