import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  hasSensitivePattern,
  maskSensitiveText,
  agents,
  scenarioCards
} from '../src/data/smDemo.js';
import { menuGroups } from '../src/data/menuData.js';

test('SM masks the demo identifiers and keywords without leaving a blocked draft', () => {
  for (const input of [
    '주민번호: 880512-1234567, 연락처: 010-9876-5432, 1급기밀_신규라인_설계도면',
    '01012345678 / 011 123 4567 / 880512 – 1234567 / 1급 기밀 / 대외비원본'
  ]) {
    assert.equal(hasSensitivePattern(input), true);
    const masked = maskSensitiveText(input);
    assert.equal(hasSensitivePattern(masked), false);
    assert.doesNotMatch(masked, /880512|1234567|9876/);
  }
  assert.equal(maskSensitiveText('일반 회의록 요약'), '일반 회의록 요약');
});

test('SM follows AI Q&A and all four wireframe scenarios are preserved without utility classes', () => {
  assert.deepEqual(
    menuGroups.slice(0, 3).map((item) => item.title),
    ['AI Q&A', 'SM', 'HTML5']
  );
  const scenarios = JSON.parse(readFileSync('src/data/smScenarios.json', 'utf8'));
  assert.equal(agents.length, 5);
  assert.deepEqual(
    scenarioCards.map((item) => item.id),
    Object.keys(scenarios)
  );
  for (const value of Object.values(scenarios)) {
    assert.ok(value.userPrompt && value.aiResponse && value.sources.length);
    assert.doesNotMatch(value.aiResponse, /class=|<script|onclick=|<iframe|<img/i);
  }
});
