import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';

interface SearchModalProps {
  onSearch: (query: string) => void;
  onCancel: () => void;
}

export function SearchModal({ onSearch, onCancel }: SearchModalProps) {
  const [query, setQuery] = useState('');

  useInput((input, key) => {
    if (key.escape) {
      onCancel();
    } else if (key.return) {
      onSearch(query);
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
            onChange={setQuery}
            placeholder="Type to filter aliases..."
          />
        </Box>
      </Box>

      <Box marginTop={1}>
        <Text dimColor>Search by name or command</Text>
      </Box>

      {/* Footer */}
      <Box marginTop={1} justifyContent="center" gap={2}>
        <Text>
          <Text bold color="green">[Enter]</Text>
          <Text dimColor> search</Text>
        </Text>
        <Text>
          <Text bold color="gray">[Esc]</Text>
          <Text dimColor> cancel</Text>
        </Text>
      </Box>
    </Box>
  );
}
