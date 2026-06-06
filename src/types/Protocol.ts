import { Action } from "./Action";

export interface Protocol {
  name: string;

  actions: Action[];
}