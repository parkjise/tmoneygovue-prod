<script setup>
import { ref, computed, watch, defineAsyncComponent, markRaw } from 'vue';
import { vueExercises, checkExercise, questionSource } from '@/composables/vueExercises';
import SyntaxCode from '@/components/common/SyntaxCode.vue';
import CodeExampleCard from '@/components/common/CodeExampleCard.vue';
import { getExampleFiles } from '@/data/codeSnippets';
const storageKey = 'vue-atelier:practice:v1';
const saveError = ref('');
function loadProgress() {
  let saved = {};
  try {
    saved = JSON.parse(localStorage.getItem(storageKey) || '{}') || {};
  } catch {
    saveError.value = '이전 기록을 읽지 못했습니다. 이번 풀이부터 다시 저장합니다.';
  }
  return Object.fromEntries(
    vueExercises.map((exercise) => {
      const entry = saved[exercise.id];
      return [
        exercise.id,
        {
          answers: exercise.blanks.map((_, index) =>
            typeof entry?.answers?.[index] === 'string' ? entry.answers[index].slice(0, 2000) : ''
          ),
          complete: entry?.complete === true,
          attempts:
            Number.isSafeInteger(entry?.attempts) && entry.attempts >= 0 ? entry.attempts : 0
        }
      ];
    })
  );
}
const progress = ref(loadProgress());
watch(
  progress,
  (value) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
      saveError.value = '';
    } catch {
      saveError.value = '브라우저 저장 공간을 사용할 수 없어 이번 변경은 새로고침하면 사라집니다.';
    }
  },
  { deep: true }
);
const selected = ref(vueExercises[0].id);
const level = ref('전체');
const query = ref('');
const hintOpen = ref(false),
  answerOpen = ref(false),
  previewOpen = ref(false);
const feedback = ref(null);
const active = computed(() => vueExercises.find((item) => item.id === selected.value));
const attempt = computed(() => progress.value[active.value.id]);
const completed = computed(
  () => vueExercises.filter((item) => progress.value[item.id].complete).length
);
const filtered = computed(() =>
  vueExercises.filter(
    (item) =>
      (level.value === '전체' || item.level === level.value) &&
      `${item.title} ${item.question}`.includes(query.value.trim())
  )
);
const rawSources = import.meta.glob(
  ['/src/views/vue-syntax/*.vue', '/src/views/vue-patterns/*.vue'],
  { query: '?raw', import: 'default', eager: true }
);
const loaders = import.meta.glob(['/src/views/vue-syntax/*.vue', '/src/views/vue-patterns/*.vue']);
const examples = Object.fromEntries(
  vueExercises.map((item) => [
    item.id,
    markRaw(defineAsyncComponent(loaders['/src/views' + item.path + '.vue']))
  ])
);
const source = computed(() => rawSources['/src/views' + active.value.path + '.vue']);
const starter = computed(() => questionSource(active.value, source.value));
const answerFiles = computed(() => getExampleFiles(active.value.path));
const correctCount = computed(() => feedback.value?.filter((entry) => entry.correct).length || 0);
watch(selected, () => {
  feedback.value = null;
  hintOpen.value = false;
  answerOpen.value = false;
  previewOpen.value = false;
});
function check() {
  feedback.value = checkExercise(active.value, attempt.value.answers);
  attempt.value.attempts++;
  if (feedback.value.every((entry) => entry.correct)) attempt.value.complete = true;
}
function reset() {
  progress.value[active.value.id] = {
    answers: active.value.blanks.map(() => ''),
    complete: false,
    attempts: 0
  };
  feedback.value = null;
  hintOpen.value = false;
  answerOpen.value = false;
  previewOpen.value = false;
}
function next() {
  const index = vueExercises.findIndex((item) => item.id === selected.value);
  selected.value = vueExercises[(index + 1) % vueExercises.length].id;
}
</script>
<template>
  <section class="practice">
    <header class="practice__intro">
      <span class="practice__eyebrow">LEARN BY SOLVING · VUE 3</span>
      <h1>
        Vue 실무예제
        <small>문제 → 풀이 → 정답</small>
      </h1>
      <p>
        빈칸에 코드를 작성하고 풀이를 확인하세요. 힌트, 실제 동작 예시, 전체 정답과 해설을 원하는 때
        열 수 있습니다.
      </p>
      <div class="practice__progress">
        <label for="practice-progress">완료 {{ completed }} / {{ vueExercises.length }}문제</label>
        <progress id="practice-progress" :value="completed" :max="vueExercises.length" />
        <span>풀이와 완료 기록은 이 브라우저에 자동 저장됩니다.</span>
      </div>
      <p v-if="saveError" role="status">{{ saveError }}</p>
    </header>
    <div class="practice__layout">
      <aside class="practice__catalog" aria-label="실무 문제 목록">
        <label>
          문제 검색
          <input v-model="query" type="search" placeholder="검색, 폼, 요청…" />
        </label>
        <label>
          난이도
          <select v-model="level">
            <option>전체</option>
            <option>입문</option>
            <option>기본</option>
            <option>실무</option>
          </select>
        </label>
        <nav aria-label="문제 선택">
          <button
            v-for="item in filtered"
            :key="item.id"
            type="button"
            :aria-current="selected === item.id ? 'true' : undefined"
            @click="selected = item.id"
          >
            <small>
              {{ item.level }} ·
              {{
                progress[item.id].complete
                  ? '완료 ✓'
                  : progress[item.id].attempts ||
                      progress[item.id].answers.some((answer) => answer.trim())
                    ? '풀이 중'
                    : '도전 전'
              }}
            </small>
            <strong>{{ vueExercises.indexOf(item) + 1 }}. {{ item.title }}</strong>
          </button>
        </nav>
        <p v-if="!filtered.length">검색 결과가 없습니다.</p>
      </aside>
      <article class="practice__problem" :aria-label="active.title">
        <header class="practice__heading">
          <div>
            <span>{{ active.level }} · 빈칸 {{ active.blanks.length }}개</span>
            <h2>{{ active.title }}</h2>
          </div>
          <span v-if="attempt.complete" class="practice__complete">해결 완료 ✓</span>
        </header>
        <section class="practice__question">
          <h3>문제</h3>
          <p>{{ active.question }}</p>
          <h4>완성 후 확인할 동작</h4>
          <ul>
            <li v-for="check in active.checks" :key="check">{{ check }}</li>
          </ul>
        </section>
        <details
          class="practice__preview"
          :open="previewOpen"
          @toggle="previewOpen = $event.target.open"
        >
          <summary>정답 동작 미리보기 · 직접 눌러보기</summary>
          <p>완성된 예제의 동작입니다. 내가 작성한 코드를 실행하는 화면은 아닙니다.</p>
          <component :is="examples[active.id]" v-if="previewOpen" :key="active.id" />
        </details>
        <section>
          <h3>문제 코드</h3>
          <p class="practice__muted">
            /* 빈칸 N */에 들어갈 표현을 아래 입력란에 작성하세요. 같은 번호가 여러 번 나오면 같은
            답을 적용합니다.
          </p>
          <SyntaxCode :code="starter" language="vue" label="문제 코드" class="practice__code" />
        </section>
        <form class="practice__answers" @submit.prevent="check">
          <h3>나의 풀이</h3>
          <label
            v-for="(field, index) in active.blanks"
            :key="active.id + index"
            class="practice__field"
          >
            <strong>빈칸 {{ index + 1 }} · {{ field.label }}</strong>
            <textarea
              v-model="attempt.answers[index]"
              :aria-label="'빈칸 ' + (index + 1) + ' 답안'"
              :aria-invalid="feedback ? !feedback[index].correct : undefined"
              rows="2"
              maxlength="2000"
              spellcheck="false"
              autocomplete="off"
              placeholder="코드를 입력하세요"
              @input="feedback = null"
            />
            <span
              v-if="feedback"
              :class="feedback[index].correct ? 'practice__correct' : 'practice__incorrect'"
            >
              {{
                feedback[index].correct ? '✓ 통과' : '다시 확인해 보세요. 힌트와 문맥을 참고하세요.'
              }}
            </span>
          </label>
          <div class="practice__actions">
            <button class="practice__primary" type="submit">풀이 확인</button>
            <button type="button" :aria-expanded="hintOpen" @click="hintOpen = !hintOpen">
              {{ hintOpen ? '힌트 닫기' : '힌트 보기' }}
            </button>
            <button type="button" :aria-expanded="answerOpen" @click="answerOpen = !answerOpen">
              {{ answerOpen ? '정답 닫기' : '정답과 해설 보기' }}
            </button>
            <button type="button" @click="reset">이 문제 초기화</button>
          </div>
          <p v-if="feedback" role="status" class="practice__feedback">
            {{
              correctCount === active.blanks.length
                ? '모든 빈칸을 해결했습니다! 다음 문제에 도전해 보세요.'
                : `${active.blanks.length}개 중 ${correctCount}개 통과했습니다. 수정 후 다시 확인할 수 있습니다.`
            }}
          </p>
          <p class="practice__muted">
            확인 {{ attempt.attempts }}회 · 예시 답안의 표현을 기준으로 확인하며, 공백과 기본 따옴표
            차이는 허용합니다. 같은 동작의 다른 표현은 정답과 직접 비교하세요. 입력한 코드는
            실행하거나 서버로 전송하지 않습니다.
          </p>
        </form>
        <aside v-if="hintOpen" class="practice__hint">
          <h3>풀이 힌트</h3>
          <ol>
            <li v-for="field in active.blanks" :key="field.label">{{ field.hint }}</li>
          </ol>
        </aside>
        <section v-if="answerOpen" class="practice__solution">
          <h3>정답과 해설</h3>
          <section v-for="(field, index) in active.blanks" :key="field.label">
            <h4>빈칸 {{ index + 1 }} · {{ field.label }}</h4>
            <SyntaxCode
              :code="field.target"
              :language="
                field.target.startsWith('v-') ||
                field.target.startsWith('@') ||
                field.target.startsWith(':')
                  ? 'html'
                  : 'javascript'
              "
              :label="'빈칸 ' + (index + 1) + ' 정답'"
            />
            <p>{{ field.explanation }}</p>
          </section>
          <p class="practice__muted">
            정답을 열어보는 것만으로 완료 처리되지 않습니다. 답을 이해한 뒤 직접 입력하고 확인해
            보세요.
          </p>
          <CodeExampleCard
            title="전체 정답 파일과 의존 파일"
            description="실제 예제와 동일한 Vue 3 script setup 소스입니다."
            :files="answerFiles"
            :initially-expanded="true"
          >
            <p>
              파일 선택에서 자식 컴포넌트·Composable·SCSS 의존 파일까지 확인하고 복사할 수 있습니다.
            </p>
          </CodeExampleCard>
        </section>
        <footer class="practice__actions">
          <RouterLink :to="active.path">관련 Vue 가이드 열기 ↗</RouterLink>
          <button type="button" @click="next">다음 문제 →</button>
        </footer>
      </article>
    </div>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.practice {
  display: grid;
  gap: 24px;
  min-width: 0;
  &__intro {
    @include card-surface;
    padding: 26px;
    h1 {
      font-size: 27px;
      margin: 8px 0 12px;
      small {
        font-size: 12px;
        font-weight: 400;
        color: var(--muted);
      }
    }
    p {
      font-size: 13px;
      color: var(--muted);
    }
  }
  &__eyebrow {
    color: var(--primary);
    font-size: 10px;
    letter-spacing: 1px;
  }
  &__progress {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 22px;
    font-size: 12px;
    progress {
      accent-color: var(--primary);
      max-width: 100%;
    }
    span {
      color: var(--caption);
      font-size: 11px;
    }
  }
  &__layout {
    display: grid;
    grid-template-columns: 245px minmax(0, 1fr);
    gap: 22px;
    align-items: start;
  }
  &__catalog {
    @include card-surface;
    padding: 16px;
    display: grid;
    gap: 14px;
    label {
      display: grid;
      gap: 6px;
      font-size: 12px;
    }
    input,
    select {
      width: 100%;
      min-width: 0;
    }
    nav {
      display: grid;
      gap: 6px;
    }
    button {
      display: grid;
      gap: 6px;
      text-align: left;
      padding: 12px;
      border: 1px solid transparent;
      background: none;
      small {
        color: var(--muted);
        font-size: 10px;
      }
      strong {
        font-size: 12px;
        line-height: 1.6;
      }
      &[aria-current='true'] {
        background: var(--soft);
        border-color: var(--primary);
        color: var(--primary);
      }
    }
  }
  &__problem {
    @include card-surface;
    padding: 24px;
    display: grid;
    gap: 24px;
    min-width: 0;
    h2 {
      font-size: 21px;
      margin-top: 8px;
    }
    h3 {
      font-size: 16px;
      margin-bottom: 12px;
    }
    h4 {
      font-size: 13px;
      margin: 16px 0 8px;
    }
    p,
    li {
      font-size: 12px;
      line-height: 1.9;
    }
    ul,
    ol {
      padding-left: 20px;
    }
  }
  &__heading {
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 10px;
    span {
      font-size: 11px;
      color: var(--primary);
    }
  }
  &__question,
  &__hint {
    padding: 18px;
    background: var(--soft);
    border-radius: 10px;
  }
  &__preview {
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 16px;
    summary {
      cursor: pointer;
      font-size: 12px;
      font-weight: 600;
    }
    p {
      color: var(--muted);
      margin: 12px 0;
    }
  }
  &__code {
    border-radius: 10px;
    margin-top: 12px;
    max-height: 380px;
  }
  &__answers {
    display: grid;
    gap: 16px;
  }
  &__field {
    display: grid;
    gap: 9px;
    font-size: 12px;
    textarea {
      resize: vertical;
      width: 100%;
      min-width: 0;
      background: #1e1e1e;
      color: #d4d4d4;
      font:
        13px/1.8 Consolas,
        monospace;
      padding: 12px;
      border: 1px solid var(--border);
      border-radius: 8px;
      &[aria-invalid='true'] {
        border-color: #f87171;
      }
    }
  }
  &__actions {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    button,
    a {
      font-size: 12px;
    }
    a {
      margin-right: auto;
      color: var(--primary);
    }
  }
  &__primary {
    background: var(--primary);
    color: white;
  }
  &__muted {
    color: var(--muted);
  }
  &__correct,
  &__complete {
    color: var(--success);
  }
  &__incorrect {
    color: var(--danger, #dc2626);
  }
  &__feedback {
    padding: 14px;
    background: var(--soft);
    border-radius: 8px;
  }
  &__solution {
    display: grid;
    gap: 14px;
    min-width: 0;
    .syntax-code {
      border-radius: 8px;
    }
  }
  @include responsive(mobile) {
    &__layout {
      grid-template-columns: minmax(0, 1fr);
    }
    &__catalog nav {
      max-height: 230px;
      overflow: auto;
    }
    &__problem,
    &__intro {
      padding: 18px;
    }
    &__intro h1 small {
      display: block;
      margin-top: 8px;
    }
  }
}
</style>
