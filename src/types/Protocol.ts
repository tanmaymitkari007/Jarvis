import { Action } from "./Action";

export interface Protocol {
  name: string;

  aliases?: string[];

  actions: Action[];
}