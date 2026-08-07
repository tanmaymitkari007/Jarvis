use std::os::windows::process::CommandExt;

use tauri::{Emitter, Manager};

use tauri_plugin_global_shortcut::Builder as GlobalShortcutBuilder;

#[tauri::command]
fn open_url(url: String) -> Result<(), String> {
    open::that(url)
        .map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
fn run_command(
    command: String,
    shell: Option<String>,
) -> Result<(), String> {
    use std::process::Command;

    const CREATE_NO_WINDOW: u32 = 0x08000000;

    let shell = shell.unwrap_or_else(|| "cmd".to_string());

    match shell.as_str() {
        "cmd" => {
            Command::new("cmd")
                .args(["/C", &command])
                .creation_flags(CREATE_NO_WINDOW)
                .spawn()
                .map_err(|e| e.to_string())?;
        }

        "powershell" => {
            Command::new("powershell")
                .args(["-Command", &command])
                .creation_flags(CREATE_NO_WINDOW)
                .spawn()
                .map_err(|e| e.to_string())?;
        }

        "wsl" => {
            Command::new("wsl")
                .args([
                    "--",
                    "bash",
                    "-c",
                    &command,
                ])
                .creation_flags(CREATE_NO_WINDOW)
                .spawn()
                .map_err(|e| e.to_string())?;
        }

        _ => {
            return Err(format!(
                "Unknown shell: {}",
                shell
            ));
        }
    }

    Ok(())
}

#[tauri::command]
fn show_launcher(
    window: tauri::WebviewWindow,
) -> Result<(), String> {
    window
        .show()
        .map_err(|e| e.to_string())?;

    window
        .set_focus()
        .map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
fn hide_launcher(
    window: tauri::WebviewWindow,
) -> Result<(), String> {
    window
        .hide()
        .map_err(|e| e.to_string())?;

    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(
            GlobalShortcutBuilder::new()
                .with_shortcuts(["`"])
                .unwrap()
                .with_handler(|app, _shortcut, _event| {
                    if let Some(window) =
                        app.get_webview_window("main")
                    {
                        let _ = window.show();
                        let _ = window.set_focus();

                        let _ = window.emit(
                            "show-launcher",
                            (),
                        );
                    }
                })
                .build(),
        )
        .setup(|app| {
            let window =
                app.get_webview_window("main").unwrap();

            window.hide().unwrap();

            Ok(())
        })
        .invoke_handler(
            tauri::generate_handler![
                open_url,
                run_command,
                show_launcher,
                hide_launcher
            ],
        )
        .run(tauri::generate_context!())
        .expect(
            "error while running tauri application",
        );
}