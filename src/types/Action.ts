export type ActionType =
  | "open_url"
  | "run_command"
  | "wait";

export interface Action {
  type: ActionType;

  value: string;

  delay?: number;
}