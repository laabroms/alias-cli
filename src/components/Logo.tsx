import React from 'react';
import { Box, Text } from 'ink';

export function Logo() {
  return (
    <Box flexDirection="column" alignItems="center" marginBottom={1}>
      <Text bold color="magenta">
        █████╗ ██╗     ██╗ █████╗ ███████╗
      </Text>
      <Text bold color="magenta">
        ██╔══██╗██║     ██║██╔══██╗██╔════╝
      </Text>
      <Text bold color="cyan">
        ███████║██║     ██║███████║███████╗
      </Text>
      <Text bold color="cyan">
        ██╔══██║██║     ██║██╔══██║╚════██║
      </Text>
      <Text bold color="blue">
        ██║  ██║███████╗██║██║  ██║███████║
      </Text>
      <Text bold color="blue">
        ╚═╝  ╚═╝╚══════╝╚═╝╚═╝  ╚═╝╚══════╝
      </Text>
      <Text dimColor>manage your shell aliases with style</Text>
    </Box>
  );
}
