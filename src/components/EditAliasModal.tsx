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
    if (key.tab || key.downArrow) {
      setFocusedField((prev) => (prev === 'name' ? 'command' : 'name'));
    } else if (key.upArrow) {
      setFocusedField((prev) => (prev === 'command' ? 'name' : 'command'));
    } else if (key.escape) {
      onCancel();
    } else if (key.return && name && command) {
      onSave(name, command);
    }
  });

  const isFocusedName = focusedField === 'name';
  const isFocusedCommand = focusedField === 'command';

  return (
    <Box flexDirection="column" gap={1}>
      {/* Title */}
      <Box marginBottom={1}>
        <Text bold color="blue">✏️  Edit Alias</Text>
      </Box>

      {/* Name Field */}
      <Box flexDirection="column">
        <Box marginBottom={0}>
          <Text bold color={isFocusedName ? 'cyan' : 'gray'}>
            {isFocusedName && '▶ '}Name:
          </Text>
        </Box>
        <Box
          borderStyle="round"
          borderColor={isFocusedName ? 'cyan' : 'gray'}
          paddingX={1}
          width={50}
        >
          {isFocusedName ? (
            <TextInput value={name} onChange={setName} />
          ) : (
            <Text color="white">{name}</Text>
          )}
        </Box>
      </Box>

      {/* Command Field */}
      <Box flexDirection="column">
        <Box marginBottom={0}>
          <Text bold color={isFocusedCommand ? 'cyan' : 'gray'}>
            {isFocusedCommand && '▶ '}Command:
          </Text>
        </Box>
        <Box
          borderStyle="round"
          borderColor={isFocusedCommand ? 'cyan' : 'gray'}
          paddingX={1}
          width={50}
        >
          {isFocusedCommand ? (
            <TextInput value={command} onChange={setCommand} />
          ) : (
            <Text color="white">{command}</Text>
          )}
        </Box>
      </Box>

      {/* Preview */}
      <Box marginTop={1} flexDirection="column">
        <Text dimColor>Preview:</Text>
        <Box paddingX={2}>
          <Text color="cyan">{name}</Text>
          <Text color="gray"> = </Text>
          <Text color="green">"{command}"</Text>
        </Box>
      </Box>

      {/* Footer */}
      <Box marginTop={1} justifyContent="center" gap={2}>
        <Text>
          <Text bold color="cyan">[↑/↓]</Text>
          <Text dimColor> switch</Text>
        </Text>
        <Text>
          <Text bold color="green">[Enter]</Text>
          <Text dimColor> save</Text>
        </Text>
        <Text>
          <Text bold color="gray">[Esc]</Text>
          <Text dimColor> cancel</Text>
        </Text>
      </Box>
    </Box>
  );
}
