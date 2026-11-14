import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parse } from '@vue/compiler-dom';
import { buildSemanticDocument } from '../src/composables/htmlSemantic.js';
const patterns = JSON.parse(readFileSync('src/data/htmlSemanticPatterns.json', 'utf8'));
test('36 semantic snippets are static HTML with unique IDs and valid label references', () => {
  assert.equal(patterns.length, 36);
  assert.equal(new Set(patterns.map((item) => item.id)).size, 36);
  for (const pattern of patterns) {
    const nodes = [];
    function visit(node) {
      if (node.type === 1) nodes.push(node);
      (node.children || []).forEach(visit);
    }
    visit(parse(pattern.html));
    const attr = (node, name) =>
      node.props.find((prop) => prop.type === 6 && prop.name === name)?.value?.content;
    const ids = nodes.map((node) => attr(node, 'id')).filter(Boolean);
    assert.equal(new Set(ids).size, ids.length, pattern.id);
    assert.ok(
      nodes.every((node) => node.tag !== 'script' && node.props.every((prop) => prop.type === 6)),
      pattern.id
    );
    for (const node of nodes) {
      for (const name of ['aria-labelledby', 'aria-describedby'])
        for (const id of (attr(node, name) || '').split(' ').filter(Boolean))
          assert.ok(ids.includes(id), `${pattern.id}: ${id}`);
      if (node.tag === 'label' && attr(node, 'for'))
        assert.ok(ids.includes(attr(node, 'for')), pattern.id);
      if (node.tag === 'img') assert.ok(attr(node, 'alt'), pattern.id);
      if (node.tag === 'nav') assert.ok(attr(node, 'aria-label'), pattern.id);
      if (node.tag === 'table')
        assert.ok(
          node.children.some((child) => child.tag === 'caption'),
          pattern.id
        );
    }
    assert.ok(pattern.notes.length >= 2 && pattern.tags.length >= 1);
    for (const tag of pattern.tags)
      assert.ok(
        nodes.some((node) => node.tag === tag),
        `${pattern.id}: ${tag}`
      );
  }
});
test('download wraps the exact snippet in a complete Korean HTML document', () => {
  for (const pattern of patterns) {
    const document = buildSemanticDocument(pattern);
    assert.ok(document.startsWith('<!doctype html>'));
    assert.ok(document.includes('<html lang="ko">'));
    assert.ok(document.includes(pattern.html));
    assert.ok(document.includes('name="viewport"'));
  }
});
