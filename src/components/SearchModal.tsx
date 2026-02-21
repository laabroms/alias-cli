import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';

interface SearchModalProps {
  onSearch: (query: string) => void;
  onCancel: () => void;
  matchCount?: number;
}

export function SearchModal({ onSearch, onCancel, matchCount }: SearchModalProps) {
  const [query, setQuery] = useState('');

  const handleChange = (value: string) => {
    setQuery(value);
    onSearch(value); // Filter on every keystroke
  };

  useInput((input, key) => {
    if (key.escape) {
      onCancel();
    } else if (key.return) {
      onCancel(); // Just close modal, filter already applied
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
          <Text bold color="green">[Enter/Esc]</Text>
          <Text dimColor> close</Text>
        </Text>
      </Box>
    </Box>
  );
}
