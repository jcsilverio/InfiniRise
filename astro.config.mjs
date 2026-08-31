import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://infinirisestudios.com',
  outDir: 'dist',
  build: {
    format: 'file',
  },
});
