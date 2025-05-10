import browserSyncLib from 'browser-sync';
import chokidar from 'chokidar';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildAll } from './render.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const browserSync = browserSyncLib.create();

async function buildAndReload() {
  await buildAll();
  browserSync.reload();
}

await buildAll();

browserSync.init({
  server: 'dist',
  port: 3000,
  open: false,
  notify: true,
  files: ['dist/**/*'],
});

chokidar
  .watch([
    'exe/**/*.jinja',
    'exe/**/*.json',
    'src/scss/**/*.scss',
  ])
  .on('change', async (filePath) => {
    console.log(`↻ File changed: ${filePath}`);
    await buildAndReload();
  });
