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
      <Box
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        paddingY={3}
      >
        <Text color="gray">No aliases found</Text>
        <Text dimColor>Press [a] to create your first alias</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column">
      {aliases.map((alias, index) => {
        const isSelected = index === selectedIndex;
        return (
          <Box key={alias.name} paddingY={0}>
            <Box width={2}>
              <Text bold color={isSelected ? 'magenta' : 'gray'}>
                {isSelected ? '▶' : ' '}
              </Text>
            </Box>
            <Box width={15}>
              <Text
                bold={isSelected}
                color={isSelected ? 'cyan' : 'white'}
              >
                {alias.name}
              </Text>
            </Box>
            <Box width={2}>
              <Text color="gray">=</Text>
            </Box>
            <Box>
              <Text
                color={isSelected ? 'green' : 'gray'}
                wrap="truncate"
              >
                {alias.command}
              </Text>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
