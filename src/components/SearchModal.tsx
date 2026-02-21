import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';

interface SearchModalProps {
  onSearch: (query: string) => void;
  onCancel: () => void;
  matchCount?: number;
  onNavigate?: (direction: 'up' | 'down') => void;
  onSelect?: () => void;
}

export function SearchModal({ onSearch, onCancel, matchCount, onNavigate, onSelect }: SearchModalProps) {
  const [query, setQuery] = useState('');

  const handleChange = (value: string) => {
    setQuery(value);
    onSearch(value); // Filter on every keystroke
  };

  useInput((input, key) => {
    if (key.escape) {
      onCancel();
    } else if (key.return) {
      if (matchCount && matchCount > 0 && onSelect) {
        onSelect(); // Open edit view for selected item
      } else {
        onCancel(); // Just close modal if no matches
      }
    } else if (key.upArrow && onNavigate) {
      onNavigate('up');
    } else if (key.downArrow && onNavigate) {
      onNavigate('down');
    }
  });

  return (
    <Box flexDirection="column" gap={1}>
      {/* Title */}
      <Box marginBottom={1}>
        <Text bold color="cyan">🔍 Search Aliases</Text>
      </Box>

      {/* Search Field */}
      <Box flexDirection="column">
        <Box marginBottom={0}>
          <Text bold color="cyan">Search:</Text>
        </Box>
        <Box
          borderStyle="round"
          borderColor="cyan"
          paddingX={1}
          width={50}
        >
          <TextInput
            value={query}
            onChange={handleChange}
            placeholder="Type to filter aliases..."
          />
        </Box>
      </Box>

      {/* Match count */}
      {query && matchCount !== undefined && (
        <Box marginTop={1} justifyContent="center">
          <Text color="cyan">{matchCount}</Text>
          <Text dimColor> {matchCount === 1 ? 'match' : 'matches'}</Text>
        </Box>
      )}

      {/* Footer */}
      <Box marginTop={1} justifyContent="center" gap={2}>
        <Text>
          <Text bold color="green">[Enter]</Text>
          <Text dimColor> select</Text>
        </Text>
        <Text dimColor>•</Text>
        <Text>
          <Text bold color="yellow">[Esc]</Text>
          <Text dimColor> close</Text>
        </Text>
        <Text dimColor>•</Text>
        <Text>
          <Text bold color="cyan">[↑/↓]</Text>
          <Text dimColor> navigate</Text>
        </Text>
        <Text dimColor>•</Text>
        <Text>
          <Text bold color="gray">[q]</Text>
          <Text dimColor> quit</Text>
        </Text>
      </Box>
    </Box>
  );
}
