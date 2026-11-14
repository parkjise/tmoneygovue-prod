import { resolveSourcePath } from '../data/codeSnippets/resolveSource.js';
import { getSassDeclaration } from './sassMixinSource.js';
// Follow only @forward when resolving a module's public API. @use dependencies are
// displayed as files, but their members are not automatically exported by the parent.
export function getRecipeDefinitions(files, entryFile) {
  const sources = Object.fromEntries(
    Object.entries(files).map(([name, source]) => ['/' + name.replace(/^\//, ''), source])
  );
  const root = '/' + entryFile.replace(/^\//, '');
  const source = sources[root] || '';
  const resolve = (from, target) =>
    resolveSourcePath(from, target, (file) => sources[file] !== undefined, true);
  const namespaces = new Map();
  for (const match of source.matchAll(/^@use\s+['"]([^'"]+)['"](?:\s+as\s+([\w-]+))?/gm)) {
    const file = resolve(root, match[1]);
    if (file) namespaces.set(match[2] || match[1].split('/').pop(), file);
  }
  function exported(file, kind, name, visited = new Set()) {
    const key = file + ':' + kind + ':' + name;
    if (visited.has(key)) return null;
    visited.add(key);
    const current = sources[file] || '';
    const code = getSassDeclaration(current, kind, name);
    if (code) return { file: file.slice(1), code };
    for (const match of current.matchAll(/^@forward\s+['"]([^'"]+)['"]([^;]*);/gm)) {
      let forwardedName = name;
      const prefix = /\bas\s+([\w-]+)\*/.exec(match[2])?.[1];
      if (prefix) {
        if (!name.startsWith(prefix)) continue;
        forwardedName = name.slice(prefix.length);
      }
      const target = resolve(file, match[1]);
      if (!target) continue;
      const result = exported(target, kind, forwardedName, visited);
      if (result) return result;
    }
    return null;
  }
  const references = [],
    seen = new Set();
  function add(namespace, name, kind) {
    const label = namespace
      ? namespace + '.' + (kind === 'variable' ? '$' : '') + name
      : (kind === 'variable' ? '$' : '@' + kind + ' ') + name;
    if (seen.has(label)) return;
    const found = namespace
      ? exported(namespaces.get(namespace), kind, name)
      : exported(root, kind, name);
    if (!found) return;
    seen.add(label);
    references.push({ label, kind, ...found });
  }
  for (const match of source.matchAll(/@include\s+([\w-]+)\.([\w-]+)/g))
    if (namespaces.has(match[1])) add(match[1], match[2], 'mixin');
  for (const match of source.matchAll(/\b([\w-]+)\.([\w-]+)\s*\(/g))
    if (namespaces.has(match[1])) add(match[1], match[2], 'function');
  for (const match of source.matchAll(/\b([\w-]+)\.\$([\w-]+)/g))
    if (namespaces.has(match[1])) add(match[1], match[2], 'variable');
  for (const match of source.matchAll(/^@(mixin|function)\s+([\w-]+)/gm))
    add('', match[2], match[1]);
  return references;
}
