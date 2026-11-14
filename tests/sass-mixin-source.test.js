import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { compileString } from 'sass';
import { getSassMixinSource } from '../src/composables/sassMixinSource.js';
const source = readFileSync('src/assets/styles/_mixins.scss', 'utf8');
const catalog = JSON.parse(readFileSync('src/data/commonMixins.json', 'utf8'));
test('every copied mixin bundle compiles independently to the documented CSS', () => {
  for (const item of catalog) {
    const extracted = getSassMixinSource(source, item.name, item.usage);
    assert.ok(extracted.primary.includes(`@mixin ${item.name}`), item.name);
    assert.ok(source.includes(extracted.primary), item.name);
    const body = item.usage.replace(/^@use[^;]+;\s*/, '').replace(/@include mix\./g, '@include ');
    assert.equal(compileString(extracted.bundle + '\n' + body).css, item.css, item.name);
  }
});
test('includes, functions, global variables and companion examples are resolved transitively', () => {
  const stack = getSassMixinSource(source, 'stack');
  assert.ok(stack.dependencyCode.includes('@mixin flex-layout'));
  const media = getSassMixinSource(source, 'media-up');
  for (const text of [
    "@use 'sass:map';",
    "@use 'sass:math';",
    "@use 'sass:meta';",
    '$common-breakpoints:',
    '@function _breakpoint'
  ])
    assert.ok(media.dependencyCode.includes(text), text);
  const example = catalog.find((item) => item.name === 'button-reset');
  assert.ok(
    getSassMixinSource(source, example.name, example.usage).dependencyCode.includes(
      '@mixin focus-ring'
    )
  );
  assert.equal(getSassMixinSource(source, 'auto-grid').dependencyCode, '');
});
test('source extraction ignores braces and fake includes inside strings and comments', () => {
  const fixture = `// Usage: .x { @include missing; }
@mixin leaf { content: "}"; }
// Keep this comment.
@mixin parent { /* } @include fake; */ @include leaf; content: "@include fake; {"; }
@mixin next { color: red; }`;
  const extracted = getSassMixinSource(fixture, 'parent');
  assert.ok(extracted.primary.startsWith('// Keep this comment.'));
  assert.ok(!extracted.bundle.includes('@mixin next'));
  assert.ok(!extracted.dependencyNames.includes('@mixin fake'));
  assert.ok(extracted.dependencyCode.includes('@mixin leaf'));
  assert.doesNotThrow(() => compileString(extracted.bundle + '\n.result { @include parent; }'));
  assert.throws(() => getSassMixinSource(fixture, 'missing'), /Unknown mixin/);
});
