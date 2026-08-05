import { readdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('..', import.meta.url));
const outputArgument = process.argv.find((argument) => argument.startsWith('--output='));
const output = outputArgument ? resolve(root, outputArgument.slice('--output='.length)) : join(root, 'projects.json');
const excluded = new Set(['.git', '.github', 'node_modules', 'scripts', 'templates', 'dist']);

const entries = await readdir(root, { withFileTypes: true });
const projectDirectories = entries
  .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.') && !excluded.has(entry.name))
  .filter((entry) => existsSync(join(root, entry.name, 'index.html')))
  .sort((a, b) => a.name.localeCompare(b.name));

const projects = [];
for (const directory of projectDirectories) {
  const slug = directory.name;
  const metadataPath = join(root, slug, 'project.json');
  let metadata = {};
  if (existsSync(metadataPath)) {
    try {
      metadata = JSON.parse(await readFile(metadataPath, 'utf8'));
    } catch (error) {
      console.warn(`Ignorando project.json inválido em ${slug}: ${error.message}`);
    }
  }
  projects.push({
    slug,
    name: metadata.name || slug,
    description: metadata.description || '',
    tags: Array.isArray(metadata.tags) ? metadata.tags : [],
    status: metadata.status || 'experimento'
  });
}

await writeFile(output, `${JSON.stringify(projects, null, 2)}\n`);
console.log(`Manifesto gerado: ${projects.length} projeto(s) em ${output}`);
