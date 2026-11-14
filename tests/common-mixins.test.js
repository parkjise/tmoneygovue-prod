import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { compileString } from 'sass';
const source = readFileSync('src/assets/styles/_mixins.scss', 'utf8');
const catalog = JSON.parse(readFileSync('src/data/commonMixins.json', 'utf8'));
const options = { loadPaths: ['src/assets/styles'] };
const compile = (body) => compileString("@use 'mixins' as mix;\n" + body, options).css;
test('all 40 documented mixins exist and their examples match actual Sass output', () => {
  const names = [...source.matchAll(/^@mixin ([\w-]+)/gm)].map((match) => match[1]);
  assert.equal(names.length, 40);
  assert.deepEqual(new Set(catalog.map((item) => item.name)), new Set(names));
  assert.equal(catalog.length, 40);
  for (const item of catalog) {
    const actual = compileString(
      item.usage.replace('@/assets/styles/mixins', 'mixins'),
      options
    ).css;
    assert.equal(actual, item.css, item.name);
    assert.ok(item.notes.length && item.description);
  }
  assert.equal(compile(''), '', 'Importing mixins must not emit global CSS.');
});
test('layout, media and accessibility mixins preserve their intended CSS behavior', () => {
  const css = compile(`
    .legacy { @include mix.flex-center; @include mix.responsive(mobile) { display: block; } }
    .grid { @include mix.auto-grid(220px); }
    .one-line { @include mix.line-clamp(1); }
    .three-lines { @include mix.line-clamp(3); }
    .hidden { @include mix.visually-hidden; }
    .focus { @include mix.focus-ring; }
    .container { @include mix.container-context(card); }
    .child { @include mix.container-query(480px, card) { display: grid; } }
    .loading { @include mix.skeleton; }
  `);
  for (const expected of [
    'justify-content: center',
    '(max-width: 760px)',
    'minmax(min(100%, 220px), 1fr)',
    'text-overflow: ellipsis',
    '-webkit-line-clamp: 3',
    'clip-path: inset(50%)',
    ':focus-visible',
    '@container card (min-width: 480px)',
    '(prefers-reduced-motion: reduce)',
    'animation: none',
    '@keyframes common-skeleton-shimmer'
  ])
    assert.ok(css.includes(expected), expected);
});
test('invalid constrained arguments report useful compilation errors', () => {
  for (const include of [
    'grid-columns(0)',
    'grid-columns(1.5)',
    'grid-columns("three")',
    'line-clamp(0)',
    'line-clamp(2.5)',
    'center-absolute(z)',
    'aspect-frame(0)',
    'media-up(unknown)',
    'media-up(12)',
    'media-up(-1px)',
    'media-between(900px, 700px)',
    'media-between(1rem, 100px)',
    'fluid-type(2rem, 4vw, 1rem)'
  ]) {
    assert.throws(() => compile(`.example { @include mix.${include}; }`), undefined, include);
  }
});
