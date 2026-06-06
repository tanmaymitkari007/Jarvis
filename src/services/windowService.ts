import { invoke } from "@tauri-apps/api/core";

export async function showLauncher() {
  await invoke("show_launcher");
}

export async function hideLauncher() {
  await invoke("hide_launcher");
}