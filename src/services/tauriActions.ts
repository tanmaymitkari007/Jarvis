import { invoke } from "@tauri-apps/api/core";

export async function openUrl(
  url: string
) {
  await invoke("open_url", {
    url,
  });
}

export async function openVscodeWorkspace(
  path: string
) {
  await invoke(
    "open_vscode_workspace",
    {
      path,
    }
  );
}