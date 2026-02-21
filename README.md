# Alias CLI

> Interactive terminal UI for managing shell aliases

[![npm version](https://img.shields.io/npm/v/@laabroms/alias-cli.svg)](https://www.npmjs.com/package/@laabroms/alias-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Built with [Ink](https://github.com/vadimdemedes/ink) — React for CLIs.

<!-- ![Demo](demo.gif) -->

## Features

- ✨ **Interactive TUI** — keyboard-driven, no mouse needed
- 📝 **Add/Edit/Delete** aliases with clean modal dialogs
- 🔍 **Real-time search** — filter aliases as you type with arrow key navigation
- 🔍 **Live preview** — see your alias before saving
- 💾 **Auto-backup** — creates `.zshrc.backup` before changes
- 🎯 **Visual focus** — clearly see which field you're editing
- 🎨 **Color-coded UI** — easy to scan and navigate
- 📦 **Zero config** — works with `.zshrc` or `.bashrc` out of the box

## Installation

### Quick Install (bash)

```bash
curl -fsSL https://raw.githubusercontent.com/laabroms/alias-cli/main/install.sh | bash
```

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
- `d` or `Del` — Delete selected alias
- `/` — Search/filter aliases
- `c` — Clear search filter
- `q` — Quit

**Search Mode:**
- Type to filter aliases in real-time
- `↑/↓` — Navigate filtered results
- `Enter` — Edit selected alias
- `Esc` — Close search

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
7. Run the printed command to reload: `source ~/.zshrc`
8. Use it: `gc "feat: add new feature"`

**Optional:** Set up [auto-reload](SETUP.md) so step 7 happens automatically!

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

### Auto-Reload (Optional)

For automatic alias reloading when you quit, see [SETUP.md](SETUP.md) for a simple one-time shell function setup.

Without setup, you'll need to manually run the printed `source` command after making changes.

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

- [ ] Import/export alias sets
- [ ] Syntax highlighting for commands
- [ ] Multi-select delete
- [ ] Alias categories/tags
- [ ] Support for `.bash_aliases` and other config files

## Contributing

PRs welcome! Please open an issue first to discuss what you'd like to change.

## License

MIT © [Lucas Aabroms](https://github.com/laabroms)
