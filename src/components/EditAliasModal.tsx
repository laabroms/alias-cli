import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';
import type { Alias } from '../aliases.js';

interface EditAliasModalProps {
  alias: Alias;
  onSave: (name: string, command: string) => void;
  onCancel: () => void;
}

export function EditAliasModal({ alias, onSave, onCancel }: EditAliasModalProps) {
  const [name, setName] = useState(alias.name);
  const [command, setCommand] = useState(alias.command);
  const [focusedField, setFocusedField] = useState<'name' | 'command'>('name');

  useInput((input, key) => {
    if (key.tab) {
      setFocusedField((prev) => (prev === 'name' ? 'command' : 'name'));
    } else if (key.escape) {
      onCancel();
    } else if (key.return && name && command) {
      onSave(name, command);
    }
  });

  return (
    <Box flexDirection="column" gap={1} padding={1}>
      <Text bold color="cyan">
        Edit Alias
      </Text>

      <Box gap={1}>
        <Text color={focusedField === 'name' ? 'cyan' : 'gray'}>Name:</Text>
        <Box width={30}>
          {focusedField === 'name' ? (
            <TextInput value={name} onChange={setName} />
          ) : (
            <Text>{name}</Text>
          )}
        </Box>
      </Box>

      <Box gap={1}>
        <Text color={focusedField === 'command' ? 'cyan' : 'gray'}>
          Command:
        </Text>
        <Box width={30}>
          {focusedField === 'command' ? (
            <TextInput value={command} onChange={setCommand} />
          ) : (
            <Text>{command}</Text>
          )}
        </Box>
      </Box>

      <Box marginTop={1} gap={2} justifyContent="center">
        <Text dimColor>[Tab] Switch field</Text>
        <Text dimColor>[Enter] Save</Text>
        <Text dimColor>[Esc] Cancel</Text>
      </Box>
    </Box>
  );
}
