import React, { useState, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';
import { loadAliases, saveAliases, type Alias } from './aliases.js';
import { AliasList } from './components/AliasList.js';
import { AddAliasModal } from './components/AddAliasModal.js';
import { EditAliasModal } from './components/EditAliasModal.js';
import { DeleteConfirmModal } from './components/DeleteConfirmModal.js';

type Mode = 'list' | 'add' | 'edit' | 'delete';

export function App() {
  const [aliases, setAliases] = useState<Alias[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mode, setMode] = useState<Mode>('list');
  const [searchQuery, setSearchQuery] = useState('');

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
    } else if (input === 'd' && filteredAliases.length > 0) {
      setMode('delete');
    } else if (input === 'q') {
      process.exit(0);
    }
  });

  const handleAdd = (name: string, command: string) => {
    const newAlias: Alias = { name, command };
    const updated = [...aliases, newAlias];
    setAliases(updated);
    saveAliases(updated);
    setMode('list');
  };

  const handleEdit = (name: string, command: string) => {
    const selected = filteredAliases[selectedIndex];
    const updated = aliases.map((a) =>
      a.name === selected.name ? { name, command } : a
    );
    setAliases(updated);
    saveAliases(updated);
    setMode('list');
  };

  const handleDelete = () => {
    const selected = filteredAliases[selectedIndex];
    const updated = aliases.filter((a) => a.name !== selected.name);
    setAliases(updated);
    saveAliases(updated);
    setSelectedIndex(Math.max(0, selectedIndex - 1));
    setMode('list');
  };

  const handleCancel = () => {
    setMode('list');
  };

  return (
    <Box flexDirection="column" padding={1}>
      <Box borderStyle="round" borderColor="cyan" flexDirection="column" padding={1}>
        <Box justifyContent="space-between" paddingX={1}>
          <Text bold color="cyan">
            Alias Manager
          </Text>
          <Text dimColor>[q] Quit</Text>
        </Box>

        {mode === 'list' && (
          <>
            <AliasList
              aliases={filteredAliases}
              selectedIndex={selectedIndex}
            />
            <Box marginTop={1} justifyContent="center" gap={2}>
              <Text dimColor>[a] Add</Text>
              <Text dimColor>[e] Edit</Text>
              <Text dimColor>[d] Delete</Text>
            </Box>
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
    </Box>
  );
}
