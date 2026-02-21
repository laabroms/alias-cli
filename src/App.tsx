import React, { useState, useEffect } from 'react';
import { Box, Text, useInput, useApp } from 'ink';
import { loadAliases, saveAliases, type Alias, getShellConfigPath } from './aliases.js';
import { Logo } from './components/Logo.js';
import { LogoCompact } from './components/LogoCompact.js';
import { AliasList } from './components/AliasList.js';
import { AddAliasModal } from './components/AddAliasModal.js';
import { EditAliasModal } from './components/EditAliasModal.js';
import { DeleteConfirmModal } from './components/DeleteConfirmModal.js';

type Mode = 'list' | 'add' | 'edit' | 'delete';

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
    } else if (input === 'q') {
      if (hasChanges) {
        const configPath = getShellConfigPath();
        console.log('\n');
        console.log('✨ Changes saved!');
        console.log('');
        console.log('To apply your new aliases, run:');
        console.log(`  \x1b[36msource ${configPath}\x1b[0m`);
        console.log('');
      }
      exit();
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
            <Text dimColor>•</Text>
            <Text>
              <Text bold color="gray">[↑/↓]</Text>
              <Text dimColor> navigate</Text>
            </Text>
          </Box>
        </>
      )}
    </Box>
  );
}
