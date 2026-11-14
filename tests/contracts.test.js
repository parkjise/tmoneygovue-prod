import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { parse, compileScript } from '@vue/compiler-sfc';
import { menuGroups, menuItems } from '../src/data/menuData.js';
import { extractBlock } from '../src/data/codeSnippets/blocks.js';
test('Every menu has a unique route and a compilable script-setup SFC', () => {
  assert.equal(new Set(menuGroups.map((group) => group.title)).size, menuGroups.length);
  for (const group of menuGroups.filter((group) => group.direct))
    assert.equal(group.children.length, 1);
  assert.equal(menuItems.length, 79);
  assert.equal(new Set(menuItems.map((i) => i.path)).size, 79);
  for (const item of menuItems) {
    const path = 'src/views' + item.path + '.vue';
    assert.ok(existsSync(path), path);
    const { descriptor, errors } = parse(readFileSync(path, 'utf8'), { filename: path });
    assert.equal(errors.length, 0, path);
    assert.ok(descriptor.scriptSetup, path);
    assert.ok(descriptor.template, path);
    assert.equal(descriptor.styles[0].lang, 'scss', path);
    assert.equal(descriptor.styles[0].scoped, true, path);
    compileScript(descriptor, { id: item.path });
  }
});
test('Source extraction retains nested slots and template loops', () => {
  const source = readFileSync('src/views/vue-syntax/communication.vue', 'utf8');
  const template = extractBlock(source, 'template');
  assert.ok(template.includes('#header'));
  assert.ok(template.includes('#default'));
  assert.ok(template.endsWith('</section>'));
  assert.ok(extractBlock(source, 'script').includes('ProfileEditor'));
  assert.ok(extractBlock(source, 'style').includes('@use'));
  assert.equal(extractBlock('export const x=1', 'template'), '');
});

test('Sass source resolution follows module entries, partials and built-ins', async () => {
  const { resolveSourcePath } = await import('../src/data/codeSnippets/resolveSource.js');
  const hasSource = (path) => existsSync('.' + path) && statSync('.' + path).isFile();
  assert.equal(
    resolveSourcePath('/src/views/scss/mixins.vue', '@/assets/styles/practice', hasSource, true),
    '/src/assets/styles/practice/_index.scss'
  );
  assert.equal(
    resolveSourcePath('/src/assets/styles/practice/_index.scss', 'mixins', hasSource, true),
    '/src/assets/styles/practice/_mixins.scss'
  );
  assert.equal(
    resolveSourcePath('/src/assets/styles/practice/_mixins.scss', 'functions', hasSource, true),
    '/src/assets/styles/practice/_functions.scss'
  );
  assert.equal(
    resolveSourcePath('/src/assets/styles/practice/_functions.scss', 'sass:math', hasSource, true),
    null
  );
});

test('Sass functions compile lengths and report invalid arguments', async () => {
  const { compileString } = await import('sass');
  const options = { loadPaths: ['src/assets/styles'] };
  const result = compileString(
    "@use 'practice' as ui; .example { padding: ui.space(3); font-size: ui.rem(24px); }",
    options
  );
  assert.match(result.css, /padding: 12px/);
  assert.match(result.css, /font-size: 1.5rem/);
  assert.throws(
    () => compileString("@use 'practice' as ui; .example { padding: ui.space(-1); }", options),
    /non-negative/
  );
  assert.throws(
    () =>
      compileString(
        "@use 'practice' as ui; .example { @include ui.respond(unknown) { color: red; } }",
        options
      ),
    /Unknown breakpoint/
  );
});

test('SFC block selection ignores template-like strings in the BEM download script', () => {
  const source = readFileSync('src/views/tools/bem-generator.vue', 'utf8');
  const template = extractBlock(source, 'template');
  assert.ok(template.startsWith('<section'));
  assert.ok(template.includes('원본 HTML 마크업'));
  assert.ok(!template.includes('function download'));
});
