import React from 'react';
import { Box, Text } from 'ink';
import type { Alias } from '../aliases.js';

interface AliasListProps {
  aliases: Alias[];
  selectedIndex: number;
}

export function AliasList({ aliases, selectedIndex }: AliasListProps) {
  if (aliases.length === 0) {
    return (
      <Box padding={2} justifyContent="center">
        <Text dimColor>No aliases found. Press [a] to add one.</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" gap={0}>
      {aliases.map((alias, index) => {
        const isSelected = index === selectedIndex;
        return (
          <Box key={alias.name} gap={1}>
            <Text color={isSelected ? 'cyan' : 'gray'}>
              {isSelected ? '>' : ' '}
            </Text>
            <Text bold={isSelected} color={isSelected ? 'white' : 'gray'}>
              {alias.name}
            </Text>
            <Text color="gray">=</Text>
            <Text color={isSelected ? 'green' : 'gray'}>
              {alias.command}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
}
