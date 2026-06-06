export type ActionType =
  | "open_app"
  | "open_url"
  | "open_folder"
  | "wait";

export interface Action {
  type: ActionType;

  value: string;

  delay?: number;
}