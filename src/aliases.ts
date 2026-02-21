import fs from 'fs';
import path from 'path';
import os from 'os';

export interface Alias {
  name: string;
  command: string;
}

const SHELL_CONFIG_FILES = ['.zshrc', '.bashrc'];

export function getShellConfigPath(): string {
  const homeDir = os.homedir();
  
  // Check which shell config exists
  for (const file of SHELL_CONFIG_FILES) {
    const fullPath = path.join(homeDir, file);
    if (fs.existsSync(fullPath)) {
      return fullPath;
    }
  }
  
  // Default to .zshrc if none exist
  return path.join(homeDir, '.zshrc');
}

function parseAliases(content: string): Alias[] {
  const aliases: Alias[] = [];
  const lines = content.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Match: alias name='command' or alias name="command" or alias name=command
    const match = trimmed.match(/^alias\s+([^=]+)=['"]?(.+?)['"]?$/);
    if (match) {
      const [, name, command] = match;
      aliases.push({
        name: name.trim(),
        command: command.trim().replace(/^['"]|['"]$/g, ''),
      });
    }
  }
  
  return aliases;
}

function serializeAliases(aliases: Alias[]): string {
  return aliases
    .map((a) => `alias ${a.name}="${a.command}"`)
    .join('\n');
}

export function loadAliases(): Alias[] {
  try {
    const configPath = getShellConfigPath();
    const content = fs.readFileSync(configPath, 'utf-8');

    // Parse ALL aliases from the file
    const allAliases = parseAliases(content);

    // Filter out the alias-cli wrapper (it's a function, not a user alias)
    return allAliases.filter(a => a.name !== 'alias-cli');
  } catch (error) {
    console.error('Failed to load aliases:', error);
    return [];
  }
}

export function saveAliases(aliases: Alias[]): void {
  try {
    const configPath = getShellConfigPath();
    let content = '';

    // Read existing content
    if (fs.existsSync(configPath)) {
      content = fs.readFileSync(configPath, 'utf-8');
    }

    const lines = content.split('\n');
    const MARKER = '# Aliases managed by alias-cli';

    // Remove old alias lines and the marker (function definitions are safe - they don't start with 'alias ')
    const filteredLines = lines.filter((line) => {
      const trimmed = line.trim();
      return !trimmed.startsWith('alias ') && trimmed !== MARKER;
    });

    // Add new aliases at the end
    const newContent = [
      ...filteredLines,
      '',
      MARKER,
      serializeAliases(aliases),
    ].join('\n');

    // Backup original file
    const backupPath = `${configPath}.backup`;
    if (fs.existsSync(configPath)) {
      fs.copyFileSync(configPath, backupPath);
    }

    // Write new content
    fs.writeFileSync(configPath, newContent, 'utf-8');
  } catch (error) {
    console.error('Failed to save aliases:', error);
  }
}
