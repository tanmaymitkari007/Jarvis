# Jarvis

**Version:** v1.0.0
**Author:** Tanmay Mitkari
**Initial Release:** June 2026
**License:** MIT

---

## Overview

Jarvis is a lightweight desktop workflow launcher built with Tauri.

It allows you to execute custom workflows instantly using a global hotkey and simple JSON-defined protocols.

Instead of manually opening applications, folders, URLs, workspaces, and repetitive setups every day, Jarvis lets you launch complete workflows through a single command.

### Example

Press:

```text
`
```

Type:

```text
tlh
```

Press:

```text
Enter
```

Jarvis can:

* Open VS Code
* Open your project workspace
* Wait for startup
* Open a specific ChatGPT conversation
* Hide itself automatically

All through a single command.

---

## Features

* Global hotkey launcher
* Clean animated command panel
* Protocol-based workflow system
* JSON configuration
* Command aliases
* URL launching
* Command execution
* Delayed workflow steps
* Hidden background operation
* Windows startup support
* Lightweight Tauri application

---

## Supported Actions

### run_command

Executes any command through the Windows command processor.

Example:

```json
{
  "type": "run_command",
  "value": "notepad"
}
```

---

### open_url

Opens a URL using the system default browser.

Example:

```json
{
  "type": "open_url",
  "value": "https://chatgpt.com"
}
```

---

### wait

Pauses protocol execution.

Delay is specified in milliseconds.

Example:

```json
{
  "type": "wait",
  "delay": 1000
}
```

---

## Requirements

Install the following:

### Node.js

Recommended:

```text
v24+
```

### npm

Recommended:

```text
v11+
```

### Rust

Install Rust from:

https://rustup.rs

### Visual Studio Build Tools

Install:

* Desktop development with C++

Required for Tauri builds on Windows.

### Git

Required for cloning the repository.

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate into the project:

```bash
cd Jarvis
```

Install dependencies:

```bash
npm install
```

---

## Development Mode

Run:

```bash
npm run tauri dev
```

This launches Jarvis in development mode.

---

## Production Build

Build the executable:

```bash
npm run tauri build
```

After completion, the executable can be found inside:

```text
src-tauri/target/release/
```

---

## Global Hotkey

Current hotkey:

```text
`
```

Pressing the hotkey displays the Jarvis command panel.

---

## Startup Configuration

To launch Jarvis automatically when Windows starts:

### Step 1

Build the application:

```bash
npm run tauri build
```

### Step 2

Create a shortcut for:

```text
jarvis.exe
```

### Step 3

Press:

```text
Win + R
```

### Step 4

Type:

```text
shell:startup
```

### Step 5

Paste the shortcut into the Startup folder.

### Step 6

Restart Windows.

Jarvis will now start automatically in the background.

---

## Protocol System

Protocols are defined in:

```text
src/protocols/protocols.json
```

Each protocol contains:

* Name
* Aliases
* Actions

---

## Protocol Structure

Example:

```json
{
  "name": "Example Protocol",
  "aliases": [
    "ep"
  ],
  "actions": [
    {
      "type": "run_command",
      "value": "notepad"
    }
  ]
}
```

---

## Real Example

```json
{
  "name": "TAI-Learn HUB",
  "aliases": [
    "tlh",
    "prtc1"
  ],
  "actions": [
    {
      "type": "run_command",
      "value": "code D:/Python_programs"
    },
    {
      "type": "wait",
      "delay": 1000
    },
    {
      "type": "open_url",
      "value": "https://chatgpt.com"
    }
  ]
}
```

Usage:

```text
`
tlh
Enter
```

---

## Example Protocols

### Open Notepad

```json
{
  "name": "Notepad",
  "aliases": [
    "np"
  ],
  "actions": [
    {
      "type": "run_command",
      "value": "notepad"
    }
  ]
}
```

### Shutdown Computer

```json
{
  "name": "shutdown",
  "aliases": [
    "sd"
  ],
  "actions": [
    {
      "type": "run_command",
      "value": "shutdown /s /t 0"
    }
  ]
}
```

### Restart Computer

```json
{
  "name": "restart",
  "aliases": [
    "rs"
  ],
  "actions": [
    {
      "type": "run_command",
      "value": "shutdown /r /t 0"
    }
  ]
}
```

---

## Project Structure

```text
src/
├── components/
├── hooks/
├── protocols/
├── services/
├── styles/
├── types/
├── App.tsx
└── main.tsx

src-tauri/
├── src/
├── icons/
└── tauri.conf.json
```

---

## Roadmap

Future improvements under consideration:

* AI-powered protocol execution
* Local AI integration
* Natural language command interpretation
* Context-aware workflows
* Advanced automation actions

The goal is to keep Jarvis lightweight while gradually adding intelligent workflow capabilities.

---

## Troubleshooting

### Hotkey does not work

Ensure Jarvis is running.

Check Task Manager for:

```text
jarvis.exe
```

---

### Protocol not found

Verify:

* Protocol name exists
* Alias exists
* JSON syntax is valid

---

### Build fails

Ensure:

* Node.js is installed
* Rust is installed
* Visual Studio Build Tools are installed

---

### Startup does not work

Verify the Jarvis shortcut exists inside:

```text
shell:startup
```

---

## License

MIT License

Feel free to use, modify, and distribute this project.

---

## Acknowledgements

Built by Tanmay Mitkari as a personal workflow automation tool to eliminate repetitive setup steps and streamline daily development workflows.
