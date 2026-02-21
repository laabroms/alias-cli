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
    <Box flexDirection="column" gap={1} padding={1}>
      <Text bold color="red">
        Delete Alias
      </Text>

      <Box flexDirection="column" marginY={1}>
        <Text>
          Are you sure you want to delete{' '}
          <Text bold color="cyan">
            {alias.name}
          </Text>
          ?
        </Text>
        <Text dimColor>Command: {alias.command}</Text>
      </Box>

      <Box gap={2} justifyContent="center">
        <Text color="red">[y] Yes</Text>
        <Text dimColor>[n] No</Text>
        <Text dimColor>[Esc] Cancel</Text>
      </Box>
    </Box>
  );
}
