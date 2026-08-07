import { invoke } from "@tauri-apps/api/core";

export async function openUrl(
  url: string
) {
  await invoke("open_url", {
    url,
  });
}

export async function runCommand(
  command: string,
  shell?: "cmd" | "powershell" | "wsl"
) {
  await invoke("run_command", {
    command,
    shell,
  });
}