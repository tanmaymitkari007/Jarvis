use tauri::{Manager, Emitter};

use tauri_plugin_global_shortcut::Builder as GlobalShortcutBuilder;

#[tauri::command]
fn open_url(url: String) -> Result<(), String> {
    open::that(url)
        .map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
fn open_vscode_workspace(
    path: String,
) -> Result<(), String> {
    std::process::Command::new(
        r"D:\Microsoft VS Code\bin\code.cmd"
    )
    .arg(path)
    .spawn()
    .map_err(|e| e.to_string())?;

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
                    ()
                );
            }
        })
        .build()
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
                open_vscode_workspace,
                show_launcher,
                hide_launcher
            ]
        )
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}