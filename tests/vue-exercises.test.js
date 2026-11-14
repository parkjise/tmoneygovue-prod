import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  vueExercises,
  questionSource,
  checkExercise,
  normalizeExerciseAnswer
} from '../src/composables/vueExercises.js';

test('each Vue problem has real source blanks, checks, hints and a passing reference solution', () => {
  assert.equal(vueExercises.length, 12);
  assert.equal(new Set(vueExercises.map((exercise) => exercise.id)).size, 12);
  for (const exercise of vueExercises) {
    const source = readFileSync('src/views' + exercise.path + '.vue', 'utf8');
    const question = questionSource(exercise, source);
    exercise.blanks.forEach((field, index) => {
      assert.ok(question.includes(`/* 빈칸 ${index + 1} */`));
      assert.ok(field.hint && field.explanation && field.target);
    });
    assert.ok(exercise.checks.length >= 3);
    assert.ok(checkExercise(exercise, []).every((item) => !item.correct));
    assert.ok(
      checkExercise(
        exercise,
        exercise.blanks.map((field) => field.target)
      ).every((item) => item.correct)
    );
  }
});
test('answer checks tolerate formatting but preserve string contents without executing input', () => {
  assert.equal(
    normalizeExerciseAnswer(`v-model = 'name'`),
    normalizeExerciseAnswer('v-model="name"')
  );
  assert.equal(
    normalizeExerciseAnswer('if (loading.value || finished.value) return;'),
    normalizeExerciseAnswer('if(loading.value||finished.value)return')
  );
  assert.notEqual(normalizeExerciseAnswer(`ref('a b')`), normalizeExerciseAnswer(`ref('ab')`));
  assert.equal(
    normalizeExerciseAnswer(`v-if="status==='active'"`),
    normalizeExerciseAnswer(`v-if="status === 'active'"`)
  );
  assert.notEqual(
    normalizeExerciseAnswer(`v-if="name === 'a b'"`),
    normalizeExerciseAnswer(`v-if="name === 'ab'"`)
  );
  const question = vueExercises[0];
  assert.ok(
    checkExercise(question, ['globalThis.__executed = true']).every((item) => !item.correct)
  );
  assert.equal(globalThis.__executed, undefined);
});
