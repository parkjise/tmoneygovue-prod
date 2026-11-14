import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parse, compileScript, compileTemplate } from '@vue/compiler-sfc';
const questions = JSON.parse(readFileSync('src/data/vuePracticeQuestions.json', 'utf8'));

test('40 question prompts contain only static HTML and CSS across five categories', () => {
  assert.equal(questions.length, 40);
  assert.equal(new Set(questions.map((item) => item.id)).size, 40);
  assert.equal(new Set(questions.map((item) => item.category)).size, 5);
  for (const question of questions) {
    assert.ok(question.html && question.css && question.question);
    assert.doesNotMatch(
      question.html,
      /<\/?(?:script|style)\b|\bv-(?:if|for|show|model|bind|on|else)|\s(?:@|:)[\w-]+\s*=|\{\{|\bon\w+\s*=/i,
      question.id
    );
    assert.doesNotMatch(question.css, /@(?:use|include|mixin)|\$[\w-]+/);
    assert.equal(question.steps.length, 3);
    assert.ok(
      question.steps.every((step) => step.length >= 65),
      question.id
    );
    assert.ok(question.pitfall.length >= 50, question.id);
    assert.equal(question.checks.length, 3);
  }
});
test('every answer is a complete compilable Vue 3 script setup component', () => {
  for (const question of questions) {
    const filename = '.' + question.sourceFile;
    const source = readFileSync(filename, 'utf8');
    const { descriptor, errors } = parse(source, { filename });
    assert.deepEqual(errors, [], question.id);
    assert.ok(
      descriptor.scriptSetup && descriptor.template && descriptor.styles[0].scoped,
      question.id
    );
    const script = compileScript(descriptor, { id: question.id });
    const template = compileTemplate({
      source: descriptor.template.content,
      filename,
      id: question.id,
      compilerOptions: { bindingMetadata: script.bindings }
    });
    assert.deepEqual(template.errors, [], question.id);
  }
});
