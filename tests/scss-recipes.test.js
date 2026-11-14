import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { compile, compileString } from 'sass';
import { getRecipeDefinitions } from '../src/composables/scssRecipeSource.js';
const recipes = JSON.parse(readFileSync('src/data/scssRecipes.json', 'utf8'));
const options = {
  importers: [
    {
      findFileUrl(url) {
        return url.startsWith('@/') ? pathToFileURL(resolve('src', url.slice(2))) : null;
      }
    }
  ]
};
function inventory(directory) {
  const files = {};
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = directory + '/' + entry.name;
    if (entry.isDirectory()) Object.assign(files, inventory(path));
    else if (path.endsWith('.scss')) files[path] = readFileSync(path, 'utf8');
  }
  return files;
}
const files = inventory('src/assets/styles');
test('76 real SCSS recipes match compiled CSS and cover every remaining SCSS menu', () => {
  assert.equal(recipes.length, 76);
  assert.equal(new Set(recipes.map((recipe) => recipe.id)).size, 76);
  for (const topic of [
    'tokens',
    'responsive',
    'typography',
    'layout',
    'states',
    'loops',
    'modules',
    'practice-source',
    'practice-tokens',
    'practice-functions',
    'practice-mixins'
  ]) {
    assert.ok(recipes.filter((recipe) => recipe.topics.includes(topic)).length >= 8, topic);
    assert.ok(
      readFileSync('src/views/scss/' + topic + '.vue', 'utf8').includes(`topic="${topic}"`)
    );
  }
  for (const recipe of recipes) {
    assert.equal(compile('.' + recipe.file, options).css, recipe.css, recipe.id);
    assert.equal(recipe.steps.length, 3);
    assert.ok(
      recipe.steps.every((step) => step.length > 50),
      recipe.id
    );
    assert.ok(recipe.pitfall.length > 35 && recipe.html.includes('recipe-demo'), recipe.id);
  }
});
test('recipe API source resolves facades, prefixed forwards, variables and local definitions', () => {
  for (const recipe of recipes) {
    const definitions = getRecipeDefinitions(files, recipe.file);
    for (const member of definitions)
      assert.ok(files[member.file].includes(member.code), recipe.id + ': ' + member.label);
    if (/\b(?:ui|fn|mix|brand|public)\./.test(files[recipe.file.slice(1)]))
      assert.ok(definitions.length > 0, recipe.id);
  }
  const find = (id) => getRecipeDefinitions(files, recipes.find((recipe) => recipe.id === id).file);
  assert.ok(
    find('module-prefix').some(
      (member) => member.label === 'brand.brand-surface' && member.code.includes('@mixin surface')
    )
  );
  assert.ok(
    find('module-public').some(
      (member) => member.label === 'public.$radius' && member.code.includes('$radius:')
    )
  );
  assert.ok(
    find('fn-units').some(
      (member) => member.label === 'ui.strip-unit' && member.code.includes('@function strip-unit')
    )
  );
  assert.ok(find('loop-condition').some((member) => member.label === '@mixin recipe-action'));
});
test('Practice exports 15 token groups, 16 functions and 24 mixins with unchanged defaults', () => {
  const tokens = readFileSync('src/assets/styles/practice/_tokens.scss', 'utf8');
  const functions = readFileSync('src/assets/styles/practice/_functions.scss', 'utf8');
  const mixins = readFileSync('src/assets/styles/practice/_mixins.scss', 'utf8');
  assert.equal([...tokens.matchAll(/^\$[\w-]+:/gm)].length, 15);
  assert.equal([...functions.matchAll(/^@function /gm)].length, 16);
  const names = [...mixins.matchAll(/^@mixin ([\w-]+)/gm)].map((match) => match[1]);
  assert.equal(names.length, 24);
  const usage = recipes.map((recipe) => files[recipe.file.slice(1)]).join('\n');
  for (const name of names) assert.ok(usage.includes('@include ui.' + name), name);
  const compileSource = (body) =>
    compileString("@use 'practice' as ui;\n" + body, { loadPaths: ['src/assets/styles'] }).css;
  assert.equal(compileSource(''), '');
  assert.match(
    compileSource('.test { padding: ui.space(3); font-size: ui.rem(24px); }'),
    /padding: 12px;[\s\S]*font-size: 1.5rem/
  );
  for (const value of [
    'ui.rem("bad")',
    'ui.em(10px,0px)',
    'ui.strip-unit("px")',
    'ui.token(ui.$spacing, missing)',
    'ui.alpha(var(--primary),.5)',
    'ui.alpha(#fff,2)'
  ])
    assert.throws(() => compileSource(`.test { padding: ${value}; }`));
  for (const value of ['ui.truncate(0)', 'ui.truncate(2.5)', 'ui.safe-area(center)'])
    assert.throws(() => compileSource(`.test { @include ${value}; }`));
});
