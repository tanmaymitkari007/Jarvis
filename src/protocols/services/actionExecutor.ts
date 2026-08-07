import { Action } from "../../types/Action";

import {
  openUrl,
  runCommand,
} from "./tauriActions";

export async function executeAction(
  action: Action
) {
  switch (action.type) {
    case "open_url":
      await openUrl(
        action.value
      );
      break;

    case "run_command":
      await runCommand(
        action.value,
        action.shell
      );
      break;

    case "wait":
      await new Promise(
        (resolve) =>
          setTimeout(
            resolve,
            action.delay ?? 1000
          )
      );
      break;

    default:
      console.warn(
        `Unknown action: ${action.type}`
      );
  }
}