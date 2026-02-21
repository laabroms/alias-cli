import React, { useState, useEffect } from 'react';
import { Box, Text, useInput, useApp } from 'ink';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { loadAliases, saveAliases, type Alias, getShellConfigPath } from './aliases.js';
import { Logo } from './components/Logo.js';
import { LogoCompact } from './components/LogoCompact.js';
import { AliasList } from './components/AliasList.js';
import { AddAliasModal } from './components/AddAliasModal.js';
import { EditAliasModal } from './components/EditAliasModal.js';
import { DeleteConfirmModal } from './components/DeleteConfirmModal.js';
import { SearchModal } from './components/SearchModal.js';

type Mode = 'list' | 'add' | 'edit' | 'delete' | 'search';

export function App() {
  const { exit } = useApp();
  const [aliases, setAliases] = useState<Alias[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mode, setMode] = useState<Mode>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const loaded = loadAliases();
    setAliases(loaded);
  }, []);

  const filteredAliases = searchQuery
    ? aliases.filter(
        (a) =>
          a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.command.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : aliases;

  useInput((input, key) => {
    if (mode !== 'list') return;

    if (key.upArrow) {
      setSelectedIndex((prev) => Math.max(0, prev - 1));
    } else if (key.downArrow) {
      setSelectedIndex((prev) => Math.min(filteredAliases.length - 1, prev + 1));
    } else if (input === 'a') {
      setMode('add');
    } else if (input === 'e' && filteredAliases.length > 0) {
      setMode('edit');
    } else if ((input === 'd' || key.delete) && filteredAliases.length > 0) {
      setMode('delete');
    } else if (input === '/') {
      setMode('search');
    } else if (input === 'c' && searchQuery) {
      handleClearSearch();
    } else if (input === 'q') {
      if (hasChanges) {
        const configPath = getShellConfigPath();
        const reloadFile = path.join(os.homedir(), '.alias-cli-reload');
        const fileName = configPath.replace(os.homedir(), '~');
        
        // Write reload marker for wrapper function
        try {
          fs.writeFileSync(reloadFile, configPath, 'utf-8');
        } catch (e) {
          // Ignore write errors
        }
        
        exit();
        
        // Print reload instructions
        console.log('\n\x1b[32m✨ Changes saved!\x1b[0m\n');
        console.log('\x1b[33mTo apply your aliases:\x1b[0m\n');
        console.log(`  \x1b[36;1msource ${fileName}\x1b[0m\n`);
        console.log('\x1b[2m💡 Tip: For auto-reload on quit, see SETUP.md\x1b[0m\n');
      } else {
        exit();
      }
    }
  });

  const handleAdd = (name: string, command: string) => {
    const newAlias: Alias = { name, command };
    const updated = [...aliases, newAlias];
    setAliases(updated);
    saveAliases(updated);
    setHasChanges(true);
    setMode('list');
  };

  const handleEdit = (name: string, command: string) => {
    const selected = filteredAliases[selectedIndex];
    const updated = aliases.map((a) =>
      a.name === selected.name ? { name, command } : a
    );
    setAliases(updated);
    saveAliases(updated);
    setHasChanges(true);
    setMode('list');
  };

  const handleDelete = () => {
    const selected = filteredAliases[selectedIndex];
    const updated = aliases.filter((a) => a.name !== selected.name);
    setAliases(updated);
    saveAliases(updated);
    setHasChanges(true);
    setSelectedIndex(Math.max(0, selectedIndex - 1));
    setMode('list');
  };

  const handleCancel = () => {
    setMode('list');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedIndex(0);
    setMode('list');
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setMode('list');
  };

  return (
    <Box flexDirection="column" paddingX={2} paddingY={1}>
      {/* Logo - big on main screen, compact in modals */}
      {mode === 'list' ? <Logo /> : <LogoCompact />}

      {/* Header */}
      <Box justifyContent="space-between" marginBottom={1}>
        <Box gap={1}>
          <Text bold color="magenta">⚡</Text>
          <Text bold color="white">Alias Manager</Text>
          <Text dimColor>({aliases.length} aliases)</Text>
        </Box>
        <Text dimColor>[q] quit</Text>
      </Box>

      {/* Separator */}
      <Box marginBottom={1}>
        <Text color="gray">{'─'.repeat(80)}</Text>
      </Box>

      {/* Main Content */}
      <Box
        borderStyle="round"
        borderColor="gray"
        flexDirection="column"
        paddingX={2}
        paddingY={1}
        minHeight={12}
      >
        {mode === 'list' && (
          <>
            <AliasList
              aliases={filteredAliases}
              selectedIndex={selectedIndex}
            />
          </>
        )}

        {mode === 'add' && (
          <AddAliasModal onSave={handleAdd} onCancel={handleCancel} />
        )}

        {mode === 'edit' && filteredAliases[selectedIndex] && (
          <EditAliasModal
            alias={filteredAliases[selectedIndex]}
            onSave={handleEdit}
            onCancel={handleCancel}
          />
        )}

        {mode === 'delete' && filteredAliases[selectedIndex] && (
          <DeleteConfirmModal
            alias={filteredAliases[selectedIndex]}
            onConfirm={handleDelete}
            onCancel={handleCancel}
          />
        )}

        {mode === 'search' && (
          <SearchModal onSearch={handleSearch} onCancel={handleCancel} />
        )}
      </Box>

      {/* Footer */}
      {mode === 'list' && (
        <>
          <Box marginTop={1}>
            <Text color="gray">{'─'.repeat(80)}</Text>
          </Box>
          <Box marginTop={1} justifyContent="center" gap={3}>
            <Text>
              <Text bold color="green">[a]</Text>
              <Text dimColor> add</Text>
            </Text>
            <Text>
              <Text bold color="blue">[e]</Text>
              <Text dimColor> edit</Text>
            </Text>
            <Text>
              <Text bold color="red">[d/Del]</Text>
              <Text dimColor> delete</Text>
            </Text>
            <Text>
              <Text bold color="cyan">[/]</Text>
              <Text dimColor> search</Text>
            </Text>
            {searchQuery && (
              <Text>
                <Text bold color="yellow">[c]</Text>
                <Text dimColor> clear</Text>
              </Text>
            )}
            <Text dimColor>•</Text>
            <Text>
              <Text bold color="gray">[↑/↓]</Text>
              <Text dimColor> navigate</Text>
            </Text>
          </Box>
          {searchQuery && (
            <Box marginTop={1} justifyContent="center">
              <Text dimColor>Filtering: </Text>
              <Text color="cyan">"{searchQuery}"</Text>
              <Text dimColor> ({filteredAliases.length} matches)</Text>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
