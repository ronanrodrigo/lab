import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);
const root = resolve(new URL('..', import.meta.url).pathname);
const dist = join(root, 'dist');
const excluded = new Set(['.git', '.github', 'node_modules', 'scripts', 'templates', 'dist']);

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(join(root, 'index.html'), join(dist, 'index.html'));
await cp(join(root, 'styles.css'), join(dist, 'styles.css'));
await cp(join(root, 'app.js'), join(dist, 'app.js'));
await run(process.execPath, [join(root, 'scripts', 'generate-projects.mjs'), `--output=${join(dist, 'projects.json')}`]);

const entries = await readdir(root, { withFileTypes: true });
for (const entry of entries) {
  if (!entry.isDirectory() || excluded.has(entry.name) || entry.name.startsWith('.')) continue;
  if (existsSync(join(root, entry.name, 'index.html'))) {
    await cp(join(root, entry.name), join(dist, entry.name), { recursive: true });
  }
}
console.log(`Build pronto em ${dist}`);
