import React from 'react';
import { Box, Text, useInput } from 'ink';
import type { Alias } from '../aliases.js';

interface DeleteConfirmModalProps {
  alias: Alias;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmModal({
  alias,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  useInput((input, key) => {
    if (input === 'y' || key.return) {
      onConfirm();
    } else if (input === 'n' || key.escape) {
      onCancel();
    }
  });

  return (
    <Box flexDirection="column" gap={1} alignItems="center">
      {/* Title */}
      <Box marginBottom={1}>
        <Text bold color="red">⚠️  Delete Alias</Text>
      </Box>

      {/* Warning */}
      <Box
        borderStyle="round"
        borderColor="red"
        paddingX={2}
        paddingY={1}
        flexDirection="column"
        alignItems="center"
      >
        <Text>
          Are you sure you want to delete{' '}
          <Text bold color="cyan">
            {alias.name}
          </Text>
          ?
        </Text>
        <Box marginTop={1} flexDirection="column" alignItems="center">
          <Text dimColor>Command:</Text>
          <Text color="gray">"{alias.command}"</Text>
        </Box>
      </Box>

      {/* Warning note */}
      <Box marginTop={1}>
        <Text dimColor italic>This action cannot be undone</Text>
      </Box>

      {/* Actions */}
      <Box marginTop={1} gap={3}>
        <Text>
          <Text bold color="red">[y]</Text>
          <Text dimColor> yes, delete</Text>
        </Text>
        <Text>
          <Text bold color="green">[n]</Text>
          <Text dimColor> no, cancel</Text>
        </Text>
        <Text>
          <Text bold color="gray">[Esc]</Text>
          <Text dimColor> cancel</Text>
        </Text>
      </Box>
    </Box>
  );
}
