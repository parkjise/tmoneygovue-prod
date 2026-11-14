import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parse } from '@vue/compiler-dom';
import { compileString } from 'sass';
import {
  resolveCssPatterns,
  resolveCssTips,
  buildCssStyles,
  buildCssDocument
} from '../src/composables/cssPatternOutput.js';
const read = (file) => JSON.parse(readFileSync('src/data/' + file, 'utf8'));
const patterns = resolveCssPatterns(read('css3Patterns.json'), read('scssRecipes.json'));
const tips = resolveCssTips(read('css3Tips.json'), patterns);
const theme = readFileSync('src/assets/styles/_variables.scss', 'utf8');
test('48 CSS patterns and 20 practical tips provide valid standalone CSS and static HTML', () => {
  assert.equal(patterns.length, 48);
  assert.equal(tips.length, 20);
  assert.equal(new Set([...patterns, ...tips].map((item) => item.id)).size, 68);
  for (const item of [...patterns, ...tips]) {
    assert.ok(item.description && item.pitfall && item.steps.length >= 2, item.id);
    assert.ok(item.properties.length >= 2 && item.css && item.html, item.id);
    assert.doesNotMatch(item.css, /@(?:use|include|mixin|function|forward)\b|\$[\w-]+/);
    assert.doesNotThrow(
      () => compileString(buildCssStyles(item, theme), { syntax: 'css' }),
      item.id
    );
    const ast = parse(item.html);
    function check(node) {
      if (node.type === 1) {
        assert.notEqual(node.tag, 'script', item.id);
        assert.ok(
          node.props.every((prop) => prop.type === 6 && !/^on/i.test(prop.name)),
          item.id
        );
      }
      (node.children || []).forEach(check);
    }
    check(ast);
  }
});
test('full document exports include theme defaults, pattern CSS and exact HTML', () => {
  for (const item of [...patterns, ...tips]) {
    const document = buildCssDocument(item, theme, true);
    assert.ok(document.startsWith('<!doctype html>'));
    assert.ok(document.includes('data-theme="dark"'));
    assert.ok(document.includes(item.css.trim()) && document.includes(item.html));
    assert.ok(document.includes('--primary:') && document.includes('<style>'));
    assert.ok(!document.includes('<script'));
  }
  assert.throws(() => resolveCssPatterns([{ recipeId: 'missing' }], []), /Missing/);
  assert.throws(() => resolveCssTips([{ patternId: 'missing' }], []), /Missing/);
});
