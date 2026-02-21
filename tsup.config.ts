import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/cli.tsx'],
  format: ['esm'],
  dts: false,
  clean: true,
  shims: true,
  banner: {
    js: '#!/usr/bin/env node',
  },
});
