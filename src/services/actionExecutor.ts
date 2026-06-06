import { Action } from "../types/Action";
import { openUrl } from "./tauriActions";

import {
  openVscodeWorkspace,
} from "./tauriActions";

export async function executeAction(
  action: Action
) {
  switch (action.type) {
    case "open_app":
      console.log(
        `[OPEN APP] ${action.value}`
      );
      break;

    case "open_url":
     await openUrl(action.value);
     break;

    case "open_folder":
      console.log(
        `[OPEN FOLDER] ${action.value}`
      );
      break;

    case "wait":
      await new Promise((resolve) =>
        setTimeout(
          resolve,
          action.delay ?? 1000
        )
      );
      break;

    case "open_vscode_workspace":
      await openVscodeWorkspace(
        action.value
      );
      break;

    default:
      console.warn(
        `Unknown action: ${action.type}`
      );
  }
}