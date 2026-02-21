import React, { useState, useEffect, useCallback } from "react";
import { Box, Text, useInput, useApp } from "ink";
import fs from "fs";
import path from "path";
import os from "os";
import {
  loadAliases,
  saveAliases,
  type Alias,
  getShellConfigPath,
} from "./aliases.js";
import { Logo } from "./components/Logo.js";
import { LogoCompact } from "./components/LogoCompact.js";
import { AliasList } from "./components/AliasList.js";
import { AddAliasModal } from "./components/AddAliasModal.js";
import { EditAliasModal } from "./components/EditAliasModal.js";
import { DeleteConfirmModal } from "./components/DeleteConfirmModal.js";
import { SearchModal } from "./components/SearchModal.js";

type Mode = "list" | "add" | "edit" | "delete" | "search";

export function App() {
  const { exit } = useApp();
  const [aliases, setAliases] = useState<Alias[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mode, setMode] = useState<Mode>("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const loaded = loadAliases();
    setAliases(loaded);
  }, []);

  const filteredAliases = searchQuery
    ? aliases.filter(
        (a) =>
          a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.command.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : aliases;

  useInput((input, key) => {
    if (mode !== "list") return;

    if (key.upArrow) {
      setSelectedIndex((prev) => Math.max(0, prev - 1));
    } else if (key.downArrow) {
      setSelectedIndex((prev) =>
        Math.min(filteredAliases.length - 1, prev + 1),
      );
    } else if (input === "a") {
      setMode("add");
    } else if ((input === "e" || key.return) && filteredAliases.length > 0) {
      setMode("edit");
    } else if ((input === "d" || key.delete) && filteredAliases.length > 0) {
      setMode("delete");
    } else if (input === "/") {
      setMode("search");
    } else if (input === "c" && searchQuery) {
      handleClearSearch();
    } else if (input === "q") {
      if (hasChanges) {
        const configPath = getShellConfigPath();
        const fileName = configPath.replace(os.homedir(), "~");
        const sourceCommand = `source ${fileName}`;

        // Check if auto-reload wrapper is already installed
        const configContent = fs.readFileSync(configPath, "utf-8");
        const hasAutoReload =
          configContent.includes("alias-cli()") &&
          configContent.includes("command alias-cli");

        exit();

        // Print reload instructions
        console.log("\n\x1b[32;1m✨ Changes saved!\x1b[0m\n");

        if (hasAutoReload) {
          console.log(
            "\x1b[2;32m⚡ Auto-reload is set up! Your aliases are now applied.\x1b[0m\n",
          );
        } else {
          console.log("\x1b[2m📋 To apply your aliases, run:\x1b[0m");
          console.log(`\x1b[7;36;1m ${sourceCommand} \x1b[0m\n`);

          // Try to copy to clipboard (macOS/Linux)
          try {
            const { execSync } = require("child_process");
            try {
              execSync(`echo '${sourceCommand}' | pbcopy`, { stdio: "ignore" });
              console.log("\x1b[2;32m✓ Copied to clipboard!\x1b[0m\n");
            } catch {
              execSync(`echo '${sourceCommand}' | xclip -selection clipboard`, {
                stdio: "ignore",
              });
              console.log("\x1b[2;32m✓ Copied to clipboard!\x1b[0m\n");
            }
          } catch {
            // Clipboard not available
          }

          console.log(
            "\x1b[2m⚡ Want aliases to auto-reload when you quit? Run this once:\x1b[0m\n",
          );
          console.log(
            `\x1b[7;36m echo '\\nalias-cli() { command alias-cli; ${sourceCommand}; }' >> ${fileName} && ${sourceCommand} \x1b[0m\n`,
          );
        }
      } else {
        exit();
      }
    }
  });

  const handleAdd = useCallback(
    (name: string, command: string) => {
      const newAlias: Alias = { name, command };
      const updated = [...aliases, newAlias];
      setAliases(updated);
      saveAliases(updated);
      setHasChanges(true);
      setMode("list");
    },
    [aliases, setAliases, saveAliases, setHasChanges, setMode],
  );

  const handleEdit = useCallback(
    (name: string, command: string) => {
      const selected = filteredAliases[selectedIndex];
      const updated = aliases.map((a) =>
        a.name === selected.name ? { name, command } : a,
      );
      setAliases(updated);
      saveAliases(updated);
      setHasChanges(true);
      setMode("list");
    },
    [aliases, selectedIndex, setAliases, saveAliases, setHasChanges, setMode],
  );

  const handleDelete = useCallback(() => {
    const selected = filteredAliases[selectedIndex];
    const updated = aliases.filter((a) => a.name !== selected.name);
    setAliases(updated);
    saveAliases(updated);
    setHasChanges(true);
    setSelectedIndex(Math.max(0, selectedIndex - 1));
    setMode("list");
  }, [aliases, selectedIndex, setAliases, saveAliases, setHasChanges, setMode]);

  const handleCancel = useCallback(() => {
    setMode("list");
  }, [setMode]);

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      setSelectedIndex(0);
      // Keep mode as 'search' to continue showing modal
    },
    [setSearchQuery, setSelectedIndex],
  );

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
    setMode("list");
  }, [setSearchQuery, setMode]);

  const handleNavigate = useCallback(
    (direction: "up" | "down") => {
      if (direction === "up") {
        setSelectedIndex((prev) => Math.max(0, prev - 1));
      } else {
        setSelectedIndex((prev) =>
          Math.min(filteredAliases.length - 1, prev + 1),
        );
      }
    },
    [filteredAliases.length],
  );

  const handleSelectFromSearch = useCallback(() => {
    if (filteredAliases.length > 0) {
      setMode("edit");
    }
  }, [filteredAliases.length]);

  return (
    <Box flexDirection="column" paddingX={2} paddingY={1}>
      {/* Logo - big on main screen, compact in modals */}
      {mode === "list" ? <Logo /> : <LogoCompact />}

      {/* Header */}
      <Box marginBottom={1}>
        <Box gap={1}>
          <Text bold color="magenta">
            ⚡
          </Text>
          <Text bold color="white">
            Alias Manager
          </Text>
          <Text dimColor>({aliases.length} aliases)</Text>
        </Box>
      </Box>

      {/* Separator */}
      <Box marginBottom={1}>
        <Text color="gray">{"─".repeat(80)}</Text>
      </Box>

      {/* Main Content */}
      {/* Search Modal (overlay) */}
      {mode === "search" && (
        <Box marginBottom={1}>
          <SearchModal
            onSearch={handleSearch}
            onCancel={handleCancel}
            matchCount={filteredAliases.length}
            onNavigate={handleNavigate}
            onSelect={handleSelectFromSearch}
          />
        </Box>
      )}

      <Box
        borderStyle="round"
        borderColor="gray"
        flexDirection="column"
        paddingX={2}
        paddingY={1}
        minHeight={12}
      >
        {(() => {
          switch (mode) {
            case "list":
            case "search":
              return (
                <AliasList
                  aliases={filteredAliases}
                  selectedIndex={selectedIndex}
                  isSearchMode={mode === "search"}
                />
              );
            case "add":
              return (
                <AddAliasModal
                  onSave={handleAdd}
                  onCancel={handleCancel}
                  existingAliases={aliases}
                />
              );
            case "edit":
              return filteredAliases[selectedIndex] ? (
                <EditAliasModal
                  alias={filteredAliases[selectedIndex]}
                  onSave={handleEdit}
                  onCancel={handleCancel}
                />
              ) : null;
            case "delete":
              return filteredAliases[selectedIndex] ? (
                <DeleteConfirmModal
                  alias={filteredAliases[selectedIndex]}
                  onConfirm={handleDelete}
                  onCancel={handleCancel}
                />
              ) : null;
            default:
              return null;
          }
        })()}
      </Box>

      {/* Footer */}
      {mode === "list" && (
        <>
          <Box marginTop={1}>
            <Text color="gray">{"─".repeat(80)}</Text>
          </Box>
          <Box marginTop={1} justifyContent="center" gap={3}>
            <Text>
              <Text bold color="green">
                [a]
              </Text>
              <Text dimColor> add</Text>
            </Text>
            <Text>
              <Text bold color="blue">
                [e]
              </Text>
              <Text dimColor> edit</Text>
            </Text>
            <Text>
              <Text bold color="red">
                [d/Del]
              </Text>
              <Text dimColor> delete</Text>
            </Text>
            <Text>
              <Text bold color="cyan">
                [/]
              </Text>
              <Text dimColor> search</Text>
            </Text>
            {searchQuery && (
              <Text>
                <Text bold color="yellow">
                  [c]
                </Text>
                <Text dimColor> clear</Text>
              </Text>
            )}
            <Text dimColor>•</Text>
            <Text>
              <Text bold color="gray">
                [↑/↓]
              </Text>
              <Text dimColor> navigate</Text>
            </Text>
            <Text dimColor>•</Text>
            <Text>
              <Text bold color="gray">
                [q]
              </Text>
              <Text dimColor> quit</Text>
            </Text>
          </Box>
          {searchQuery && (
            <Box marginTop={1} justifyContent="center">
              <Text dimColor>Filtering: </Text>
              <Text color="cyan">"{searchQuery}"</Text>
              <Text dimColor> ({filteredAliases.length} matches)</Text>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
