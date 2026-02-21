import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';

interface AddAliasModalProps {
  onSave: (name: string, command: string) => void;
  onCancel: () => void;
}

export function AddAliasModal({ onSave, onCancel }: AddAliasModalProps) {
  const [name, setName] = useState('');
  const [command, setCommand] = useState('');
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

  const isFocusedName = focusedField === 'name';
  const isFocusedCommand = focusedField === 'command';

  return (
    <Box flexDirection="column" gap={1}>
      {/* Title */}
      <Box marginBottom={1}>
        <Text bold color="green">➕ Add New Alias</Text>
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
            <TextInput value={name} onChange={setName} placeholder="e.g., gc" />
          ) : (
            <Text color={name ? 'white' : 'gray'}>
              {name || 'e.g., gc'}
            </Text>
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
            <TextInput
              value={command}
              onChange={setCommand}
              placeholder="e.g., git add . && git commit -m"
            />
          ) : (
            <Text color={command ? 'white' : 'gray'}>
              {command || 'e.g., git add . && git commit -m'}
            </Text>
          )}
        </Box>
      </Box>

      {/* Preview */}
      {name && command && (
        <Box marginTop={1} flexDirection="column">
          <Text dimColor>Preview:</Text>
          <Box paddingX={2}>
            <Text color="cyan">{name}</Text>
            <Text color="gray"> = </Text>
            <Text color="green">"{command}"</Text>
          </Box>
        </Box>
      )}

      {/* Footer */}
      <Box marginTop={1} justifyContent="center" gap={2}>
        <Text>
          <Text bold color="cyan">[Tab]</Text>
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
