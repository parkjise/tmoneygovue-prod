import { resolveSourcePath } from './resolveSource';
// Import the actual files as text so live previews and displayed source cannot diverge.
const sources = import.meta.glob(
  [
    '/src/**/*.vue',
    '/src/composables/*.js',
    '/src/data/people.js',
    '/src/assets/styles/**/*.scss',
    '/src/data/*.json',
    '!/src/data/vuePracticeQuestions.json',
    '!/src/data/htmlSemanticPatterns.json',
    '!/src/views/html5/**/*.vue',
    '!/src/components/practice/**/*.vue',
    '!/src/views/vue-practice/**/*.vue'
  ],
  { query: '?raw', import: 'default', eager: true }
);
export function getExampleFiles(path, sourceFile = '') {
  const files = {};
  const visited = new Set();
  function collect(file) {
    if (!file || visited.has(file)) return;
    visited.add(file);
    const source = sources[file];
    if (source === undefined) return;
    files[file.replace(/^\/src\//, 'src/').replace(/^\/public\//, 'public/')] = source;
    for (const match of source.matchAll(/(?:from\s*|import\s*)['"]([^'"]+)['"]/g))
      collect(resolveSourcePath(file, match[1], (path) => sources[path] !== undefined));
    for (const match of source.matchAll(/@(?:use|forward)\s+['"]([^'"]+)['"]/g))
      collect(resolveSourcePath(file, match[1], (path) => sources[path] !== undefined, true));
  }
  if (sourceFile) {
    collect(sourceFile);
    if (sourceFile === '/src/assets/styles/_mixins.scss')
      collect('/src/assets/styles/_variables.scss');
    return files;
  }
  collect('/src/views' + path + '.vue');
  // These are the exact shared Sass dependencies required by the copied SFCs.
  for (const path of [
    '/src/assets/styles/_mixins.scss',
    '/src/assets/styles/_variables.scss',
    '/src/assets/styles/_reset.scss',
    '/src/assets/styles/main.scss'
  ])
    collect(path);
  if (visited.has('/src/composables/useToast.js')) collect('/src/components/common/BaseToast.vue');
  return files;
}
