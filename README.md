# Alias CLI

Interactive terminal UI for managing shell aliases (`.zshrc` / `.bashrc`).

Built with [Ink](https://github.com/vadimdemedes/ink) — React for CLIs.

## Features

- ✨ **Interactive TUI** — keyboard-driven, no mouse needed
- 📝 **Add/Edit/Delete** aliases with modal dialogs
- 🔍 **Live navigation** — arrow keys to browse, Enter to select
- 💾 **Auto-backup** — creates `.zshrc.backup` before changes
- 🎯 **Clean UI** — color-coded, focused design

## Installation

```bash
cd alias-cli
npm install
```

## Usage

### Run the CLI

```bash
npm run dev
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

## How It Works

1. **Loads** aliases from your `.zshrc` or `.bashrc`
2. **Displays** them in an interactive list
3. **Saves** changes back to your shell config
4. **Backups** the original file before writing

All aliases are written to the end of your shell config with a comment:
```bash
# Aliases managed by alias-cli
alias gs="git status"
alias gp="git push origin main"
```

## Project Structure

```
src/
├── cli.tsx                    # Entry point
├── App.tsx                    # Main app component
├── aliases.ts                 # File I/O (read/write .zshrc)
└── components/
    ├── AliasList.tsx          # List view
    ├── AddAliasModal.tsx      # Add new alias
    ├── EditAliasModal.tsx     # Edit existing alias
    └── DeleteConfirmModal.tsx # Confirm deletion
```

## Tech Stack

- **Ink** — React renderer for CLIs
- **ink-text-input** — Text input component
- **TypeScript** — Type safety
- **tsx** — TypeScript execution

## Future Ideas

- Search/filter aliases (`/` key)
- Import/export alias sets
- Syntax highlighting for commands
- Multi-select delete
- Alias categories/tags
- Shell reload after save

## License

MIT
