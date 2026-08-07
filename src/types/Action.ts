export type ActionType =
  | "open_url"
  | "run_command"
  | "wait";

export type CommandShell =
  | "cmd"
  | "powershell"
  | "wsl";

export interface Action {
  type: ActionType;

  value: string;

  shell?: CommandShell;

  delay?: number;
}