/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTest.ts'],
    coverage: {
      all: true,
      include: ["src/**/*"],
      exclude: [
        "node_modules",
        "build",
        "dist",
        "vite.config.ts",
        "plugin",
        "**/*spec.ts",
        "**/*test.ts",
        "**/*stories.tsx",
        "src/stories",
      ],
      provider: "istanbul",
      reporter: ["json", "html", "text", "text-summary"],
    },
  }
})
