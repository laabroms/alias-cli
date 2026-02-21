# Changelog

All notable changes to this project will be documented in this file.

## [0.1.4] - 2026-02-21

### Added
- Changelog

## [0.1.3] - 2026-02-21

### Added
- Enter key opens edit mode from dashboard
- Duplicate alias detection when adding
- Auto-reload detection in quit message
- Arrow key navigation while searching
- Enter to select alias from search results

### Fixed
- Duplicate `# Aliases managed by alias-cli` comments
- Shebang duplication in build output
- Save function no longer overwrites manual aliases

### Changed
- Simplified quit message with clearer styling
- Removed `[q] quit` from header, added to footer

## [0.1.2] - 2026-02-21

### Added
- Real-time search filtering (`/` key)
- Auto-copy `source` command to clipboard on quit
- Install script for bash (`install.sh`)
- GitHub Actions publish workflow

### Fixed
- Version check before publishing to avoid conflicts

## [0.1.1] - 2026-02-21

### Added
- ASCII art logo
- Compact logo for modals
- Delete key support for deleting aliases
- Smart exit with reload instructions

### Changed
- Improved UI design and visual hierarchy

## [0.1.0] - 2026-02-21

### Added
- Interactive TUI for managing shell aliases
- Add, edit, and delete aliases
- Live preview when creating aliases
- Auto-backup of shell config before changes
- Support for `.zshrc` and `.bashrc`
- Color-coded keyboard-driven UI
