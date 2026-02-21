# Alias CLI

> Interactive terminal UI for managing shell aliases

[![npm version](https://img.shields.io/npm/v/@laabroms/alias-cli.svg)](https://www.npmjs.com/package/@laabroms/alias-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Built with [Ink](https://github.com/vadimdemedes/ink) — React for CLIs.

<!-- ![Demo](demo.gif) -->

## Features

- ✨ **Interactive TUI** — keyboard-driven, no mouse needed
- 📝 **Add/Edit/Delete** aliases with clean modal dialogs
- 🔍 **Live preview** — see your alias before saving
- 💾 **Auto-backup** — creates `.zshrc.backup` before changes
- 🎯 **Visual focus** — clearly see which field you're editing
- 🎨 **Color-coded UI** — easy to scan and navigate
- 📦 **Zero config** — works with `.zshrc` or `.bashrc` out of the box

## Installation

### npm (global)

```bash
npm install -g @laabroms/alias-cli
```

### npx (no install)

```bash
npx @laabroms/alias-cli
```

### From source

```bash
git clone https://github.com/laabroms/alias-cli.git
cd alias-cli
npm install
npm run dev
```

## Usage

Run the CLI:

```bash
alias-cli
```

### Keyboard Shortcuts

**Main Screen:**
- `↑/↓` — Navigate aliases
- `a` — Add new alias
- `e` — Edit selected alias
- `d` — Delete selected alias
- `q` — Quit

**Add/Edit Modal:**
- `Tab` — Switch between Name and Command fields
- `Enter` — Save
- `Esc` — Cancel

**Delete Confirmation:**
- `y` or `Enter` — Confirm delete
- `n` or `Esc` — Cancel

## Example

Create a quick commit alias:

1. Run `alias-cli`
2. Press `a` to add
3. **Name:** `gc`
4. **Command:** `git add . && git commit -m`
5. Press `Enter` to save
6. Press `q` to quit
7. Paste the command (auto-copied to clipboard!) and press Enter
8. Use it: `gc "feat: add new feature"`

## How It Works

1. **Loads** aliases from your `.zshrc` or `.bashrc`
2. **Displays** them in an interactive list
3. **Saves** changes back to your shell config
4. **Backups** the original file before writing

All aliases are written to the end of your shell config with a comment:

```bash
# Aliases managed by alias-cli
alias gs="git status"
alias gc="git add . && git commit -m"
alias gp="git push origin main"
```

After making changes, the CLI automatically copies the `source` command to your clipboard — just paste and run!

## Requirements

- Node.js >= 18.0.0
- Terminal with ANSI color support

## Development

```bash
# Clone the repo
git clone https://github.com/laabroms/alias-cli.git
cd alias-cli

# Install dependencies
npm install

# Run in dev mode
npm run dev

# Build for production
npm run build

# Type check
npm run typecheck
```

## Tech Stack

- **Ink** — React renderer for CLIs
- **ink-text-input** — Text input component
- **TypeScript** — Type safety
- **tsup** — Fast bundler
- **tsx** — TypeScript execution

## Future Ideas

- [ ] Search/filter aliases (`/` key)
- [ ] Import/export alias sets
- [ ] Syntax highlighting for commands
- [ ] Multi-select delete
- [ ] Alias categories/tags
- [ ] Shell reload after save
- [ ] Support for `.bash_aliases` and other config files

## Contributing

PRs welcome! Please open an issue first to discuss what you'd like to change.

## License

MIT © [Lucas Aabroms](https://github.com/laabroms)
