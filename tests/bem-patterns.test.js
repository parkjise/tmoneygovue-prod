import test from 'node:test';
import assert from 'node:assert/strict';
import { bemPatterns, createBemPattern } from '../src/composables/bemPatterns.js';
import { BEM_NAME, buildBemScss } from '../src/composables/bemOutput.js';

test('all offline patterns generate unique valid BEM classes and matching SCSS', () => {
  assert.ok(bemPatterns.length >= 50);
  assert.equal(new Set(bemPatterns.map((item) => item.id)).size, bemPatterns.length);
  for (const pattern of bemPatterns) {
    const result = createBemPattern(pattern.id);
    const names = result.classes.map((item) => item.name);
    assert.equal(names[0], pattern.id);
    assert.equal(new Set(names).size, names.length);
    assert.ok(names.every((name) => BEM_NAME.test(name)));
    const markupClasses = new Set(
      [...result.markup.matchAll(/class="([^"]+)"/g)].flatMap((m) => m[1].split(' '))
    );
    assert.deepEqual(markupClasses, new Set(names));
    for (const name of names.filter((name) => name.includes('--'))) {
      const base = name.split('--')[0];
      assert.ok(
        [...result.markup.matchAll(/class="([^"]+)"/g)].some(
          (m) => m[1].split(' ').includes(name) && m[1].split(' ').includes(base)
        )
      );
    }
    assert.ok(buildBemScss(result.classes).includes(`.${pattern.id} {`));
    const custom = createBemPattern(pattern.id, 'my-component');
    assert.ok(
      custom.classes.every(
        (item) => item.name === 'my-component' || item.name.startsWith('my-component__')
      )
    );
    assert.ok(custom.notes.some((note) => note.includes('아닙니다')));
  }
});

test('custom block names reject HTML and invalid selectors', () => {
  for (const name of ['<script>', 'a b', 'card__title', 'A-card', 'card--big', 'a'.repeat(51)]) {
    assert.throws(() => createBemPattern('card', name));
  }
  assert.throws(() => createBemPattern('missing'));
  assert.equal(createBemPattern('card', '  service-card  ').classes[0].name, 'service-card');
});
