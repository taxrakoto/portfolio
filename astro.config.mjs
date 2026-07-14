import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://devops-tahina.dev',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  }
});
