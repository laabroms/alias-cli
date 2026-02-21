import React from 'react';
import { Box, Text } from 'ink';

export function LogoCompact() {
  return (
    <Box flexDirection="column" alignItems="center" marginBottom={1}>
      <Box>
        <Text bold color="magenta">▄▀█ </Text>
        <Text bold color="cyan">█░░ </Text>
        <Text bold color="blue">█ </Text>
        <Text bold color="magenta">▄▀█ </Text>
        <Text bold color="cyan">▄█▀</Text>
      </Box>
      <Box>
        <Text bold color="magenta">█▀█ </Text>
        <Text bold color="cyan">█▄▄ </Text>
        <Text bold color="blue">█ </Text>
        <Text bold color="magenta">█▀█ </Text>
        <Text bold color="cyan">░▀█</Text>
      </Box>
      <Text dimColor>manage your shell aliases</Text>
    </Box>
  );
}
