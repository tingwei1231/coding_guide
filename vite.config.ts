import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'vendor', test: /node_modules/, priority: 20 },
            { name: 'code-tokens', test: /src[\\/]generated[\\/]code-tokens\.json/, priority: 10 },
          ],
        },
      },
    },
  },
});
