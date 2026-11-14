<script setup>
import { ref, computed, watch, defineAsyncComponent, markRaw } from 'vue';
import { vueExercises, exerciseCategories } from '@/composables/vueExercises';
import { createPracticePreview } from '@/composables/practicePreview';
import { useTheme } from '@/composables/useTheme';
import SyntaxCode from '@/components/common/SyntaxCode.vue';
import CodeExampleCard from '@/components/common/CodeExampleCard.vue';
const selected = ref(vueExercises[0].id);
const category = ref('전체');
const level = ref('전체');
const query = ref('');
const answerOpen = ref(false);
const previewOpen = ref(true);
const previewMode = ref('html');
const { theme } = useTheme();
const active = computed(() => vueExercises.find((item) => item.id === selected.value));
const previewDocument = computed(() =>
  createPracticePreview(active.value.html, active.value.css, theme.value === 'dark')
);
const filtered = computed(() =>
  vueExercises.filter(
    (item) =>
      (category.value === '전체' || item.category === category.value) &&
      (level.value === '전체' || item.level === level.value) &&
      `${item.title} ${item.question} ${item.category}`
        .toLowerCase()
        .includes(query.value.trim().toLowerCase())
  )
);
watch(filtered, (items) => {
  if (items.length && !items.some((item) => item.id === selected.value))
    selected.value = items[0].id;
});
watch(selected, () => {
  answerOpen.value = false;
  previewOpen.value = true;
  previewMode.value = 'html';
});
const rawSources = import.meta.glob('/src/components/practice/*.vue', {
  query: '?raw',
  import: 'default',
  eager: true
});
const loaders = import.meta.glob('/src/components/practice/*.vue');
const examples = Object.fromEntries(
  vueExercises.map((item) => [item.id, markRaw(defineAsyncComponent(loaders[item.sourceFile]))])
);
const answerFiles = computed(() => ({
  ['practice/' + active.value.id + '.vue']: rawSources[active.value.sourceFile]
}));
const position = computed(() => filtered.value.findIndex((item) => item.id === selected.value));
function move(delta) {
  const item = filtered.value[position.value + delta];
  if (item) selected.value = item.id;
}
</script>
<template>
  <section class="practice">
    <header class="practice__intro">
      <span class="practice__eyebrow">QUESTION & ANSWER · VUE 3</span>
      <h1>
        Vue 실무예제
        <small>문제 → 정답 → 상세 해설</small>
      </h1>
      <p>
        화면보기에서 HTML·CSS 문제 화면과 완성된 Vue 동작을 비교해 보세요. 정답을 열면 전체 Vue
        코드와 단계별 설명을 확인할 수 있습니다.
      </p>
      <div class="practice__categories" aria-label="문제 분야 요약">
        <span v-for="name in exerciseCategories" :key="name">
          {{ name }}
          <strong>{{ vueExercises.filter((item) => item.category === name).length }}</strong>
        </span>
      </div>
      <p class="practice__total">
        총 {{ vueExercises.length }}문제 · 조건문부터 실제 UI 상태 관리까지
      </p>
    </header>
    <div class="practice__layout">
      <aside class="practice__catalog" aria-label="실무 문제 목록">
        <label>
          문제 검색
          <input v-model="query" type="search" placeholder="if, for, 모달, 검색…" />
        </label>
        <label>
          분야
          <select v-model="category">
            <option>전체</option>
            <option v-for="name in exerciseCategories" :key="name">{{ name }}</option>
          </select>
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
        <p class="practice__muted">{{ filtered.length }}개 문제</p>
        <nav aria-label="문제 선택">
          <button
            v-for="item in filtered"
            :key="item.id"
            type="button"
            :aria-current="selected === item.id ? 'true' : undefined"
            @click="selected = item.id"
          >
            <small>{{ item.category }} · {{ item.level }}</small>
            <strong>{{ vueExercises.indexOf(item) + 1 }}. {{ item.title }}</strong>
          </button>
        </nav>
      </aside>
      <article v-if="filtered.length" class="practice__problem" :aria-label="active.title">
        <header class="practice__heading">
          <span>
            문제 {{ vueExercises.indexOf(active) + 1 }} · {{ active.category }} · {{ active.level }}
          </span>
          <h2>{{ active.title }}</h2>
        </header>
        <section class="practice__question">
          <h3>문제</h3>
          <p>{{ active.question }}</p>
          <h4>만들어야 할 동작</h4>
          <ul>
            <li v-for="check in active.checks" :key="check">{{ check }}</li>
          </ul>
        </section>
        <section class="practice__preview" aria-label="화면보기">
          <header class="practice__preview-heading">
            <h3>화면보기</h3>
            <button
              type="button"
              :aria-expanded="previewOpen"
              aria-controls="practice-preview"
              @click="previewOpen = !previewOpen"
            >
              {{ previewOpen ? '화면 접기' : '화면보기' }}
            </button>
          </header>
          <div v-if="previewOpen" id="practice-preview">
            <nav class="practice__preview-tabs" aria-label="미리보기 화면 선택">
              <button
                type="button"
                :aria-pressed="previewMode === 'html'"
                @click="previewMode = 'html'"
              >
                문제 화면 · HTML/CSS
              </button>
              <button
                type="button"
                :aria-pressed="previewMode === 'complete'"
                @click="previewMode = 'complete'"
              >
                완성 화면 · Vue 동작
              </button>
            </nav>
            <template v-if="previewMode === 'html'">
              <p class="practice__muted">
                주어진 HTML·CSS를 그대로 표시한 화면입니다. Vue 이벤트는 아직 연결되지 않았습니다.
              </p>
              <iframe
                :key="active.id + theme"
                class="practice__frame"
                title="문제 화면 미리보기"
                :srcdoc="previewDocument"
                sandbox=""
                referrerpolicy="no-referrer"
              />
            </template>
            <template v-else>
              <p class="practice__muted">
                목표로 하는 완성 화면입니다. 버튼과 입력창을 직접 조작해 동작을 확인하세요. 정답
                코드는 아래에서 따로 열 수 있습니다.
              </p>
              <div class="practice__live" aria-label="완성 화면 미리보기">
                <component :is="examples[active.id]" :key="active.id" />
              </div>
            </template>
          </div>
        </section>
        <section class="practice__starter" aria-label="문제 HTML과 CSS">
          <h3>주어진 HTML</h3>
          <p class="practice__muted">
            아직 Vue 동작이 없는 정적 마크업입니다. 필요한 상태, 이벤트, 화면 조건을 먼저 생각해
            보세요.
          </p>
          <SyntaxCode
            :code="active.html"
            language="html"
            label="문제 HTML"
            class="practice__code"
          />
          <h3>주어진 CSS</h3>
          <SyntaxCode :code="active.css" language="css" label="문제 CSS" class="practice__code" />
        </section>
        <button
          class="practice__answer-toggle"
          type="button"
          :aria-expanded="answerOpen"
          aria-controls="practice-answer"
          @click="answerOpen = !answerOpen"
        >
          {{ answerOpen ? '정답과 해설 닫기 ↑' : '정답과 해설 보기 ↓' }}
        </button>
        <section
          v-if="answerOpen"
          id="practice-answer"
          class="practice__solution"
          aria-label="정답과 상세 해설"
        >
          <header>
            <span class="practice__eyebrow">ANSWER & EXPLANATION</span>
            <h3>정답을 이해하는 순서</h3>
            <p>코드를 그대로 외우기보다 상태가 어떻게 바뀌고 화면이 무엇을 읽는지 따라가 보세요.</p>
          </header>
          <ol class="practice__steps">
            <li v-for="(step, index) in active.steps" :key="step">
              <strong>단계 {{ index + 1 }}</strong>
              <p>{{ step }}</p>
            </li>
          </ol>
          <aside class="practice__note">
            <h4>자주 헷갈리는 점</h4>
            <p>{{ active.pitfall }}</p>
          </aside>
          <details class="practice__note practice__glossary">
            <summary>처음 보는 Vue 문법, 간단히 이해하기</summary>
            <dl>
              <dt>ref · .value</dt>
              <dd>
                화면과 연결할 값을 담습니다. script 안에서는 .value로 읽고 바꾸고, template에서는
                이름만 사용합니다.
              </dd>
              <dt>computed</dt>
              <dd>
                기존 값에서 계산하는 결과입니다. 수량이 바뀌면 합계도 다시 계산되는 식으로, 원본
                상태와 결과를 따로 맞출 필요가 없습니다.
              </dd>
              <dt>watch</dt>
              <dd>
                어떤 값이 바뀌었을 때 실행할 일을 정합니다. 지역이 바뀌면 하위 선택을 비우는 것처럼
                상태 변경에 따른 작업을 처리합니다.
              </dd>
              <dt>v-if · v-show</dt>
              <dd>
                v-if는 조건에 따라 HTML 요소를 만들거나 제거합니다. v-show는 요소를 남긴 채 보이기만
                전환합니다.
              </dd>
              <dt>v-for · :key</dt>
              <dd>
                배열의 각 항목으로 같은 구조를 반복합니다. key는 순서가 바뀌어도 같은 항목을 알아볼
                수 있게 하는 이름표입니다.
              </dd>
              <dt>v-model</dt>
              <dd>
                입력창의 값과 Vue 상태를 연결합니다. 사용자가 입력하면 상태가 바뀌고, 코드에서
                상태를 바꾸면 입력창도 갱신됩니다.
              </dd>
              <dt>@click · :disabled · :class</dt>
              <dd>
                @는 이벤트가 발생했을 때 실행할 일입니다. :는 속성 값을 고정된 글자가 아니라 현재
                Vue 상태로 계산하겠다는 뜻입니다.
              </dd>
              <dt>onUnmounted</dt>
              <dd>
                컴포넌트가 화면에서 제거될 때 실행합니다. 타이머나 전역 이벤트처럼 자동으로 사라지지
                않는 작업을 정리합니다.
              </dd>
            </dl>
          </details>
          <CodeExampleCard
            :key="active.id"
            title="정답 · 전체 Vue 코드"
            description="script setup · template · scoped SCSS가 포함된 완성 파일입니다."
            :files="answerFiles"
            :initially-expanded="true"
          >
            <p class="practice__muted">
              문제 위의 ‘화면보기 → 완성 화면 · Vue 동작’에서 실행 결과를 확인하세요.
            </p>
          </CodeExampleCard>
          <aside class="practice__note">
            <h4>이렇게 확인해 보세요</h4>
            <ol>
              <li v-for="check in active.checks" :key="check">{{ check }}</li>
            </ol>
            <p>위 화면보기에서 결과를 확인한 뒤 전체 코드를 복사해 내 프로젝트에서 바꿔 보세요.</p>
          </aside>
        </section>
        <footer class="practice__actions">
          <button type="button" :disabled="position <= 0" @click="move(-1)">← 이전 문제</button>
          <span>{{ position + 1 }} / {{ filtered.length }}</span>
          <button type="button" :disabled="position >= filtered.length - 1" @click="move(1)">
            다음 문제 →
          </button>
        </footer>
      </article>
      <section v-else class="practice__empty" role="status">
        <h2>검색 결과가 없습니다.</h2>
        <p>검색어·분야·난이도를 바꿔 주세요.</p>
        <button
          @click="
            query = '';
            category = '전체';
            level = '전체';
          "
        >
          전체 문제 보기
        </button>
      </section>
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
      line-height: 1.9;
      color: var(--muted);
    }
  }
  &__eyebrow {
    color: var(--primary);
    font-size: 10px;
    letter-spacing: 1px;
  }
  &__categories {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 20px 0 12px;
    span {
      font-size: 11px;
      background: var(--soft);
      padding: 7px 10px;
      border-radius: 7px;
    }
    strong {
      color: var(--primary);
      margin-left: 5px;
    }
  }
  &__total {
    font-weight: 600;
  }
  &__layout {
    display: grid;
    grid-template-columns: 255px minmax(0, 1fr);
    gap: 22px;
    align-items: start;
  }
  &__catalog {
    @include card-surface;
    position: sticky;
    top: 96px;
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
      @include custom-scrollbar;
      display: grid;
      gap: 6px;
      max-height: 55vh;
      overflow: auto;
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
  &__problem,
  &__empty {
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
      font-size: 17px;
      margin-bottom: 12px;
    }
    h4 {
      font-size: 14px;
      margin: 16px 0 8px;
    }
    p,
    li {
      font-size: 13px;
      line-height: 2;
    }
    ul,
    ol {
      padding-left: 22px;
    }
  }
  &__heading span {
    font-size: 11px;
    color: var(--primary);
  }
  &__question {
    padding: 20px;
    background: var(--soft);
    border-radius: 10px;
  }
  &__preview {
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 18px;
    min-width: 0;
  }
  &__preview-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    h3 {
      margin: 0;
    }
    button {
      font-size: 12px;
    }
  }
  &__preview-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 16px 0 12px;
    button {
      font-size: 12px;
      &[aria-pressed='true'] {
        color: var(--primary);
        background: var(--soft);
        border-color: var(--primary);
      }
    }
  }
  &__frame {
    display: block;
    width: 100%;
    height: 340px;
    margin-top: 12px;
    border: 1px solid var(--border);
    border-radius: 10px;
    background: var(--surface);
  }
  &__live {
    margin-top: 12px;
    min-width: 0;
  }
  &__starter {
    display: grid;
    gap: 12px;
    min-width: 0;
    h3 {
      margin: 0;
    }
  }
  &__code {
    border-radius: 10px;
    max-height: 320px;
  }
  &__answer-toggle {
    @include focus-ring;
    padding: 15px;
    background: var(--primary);
    color: #fff;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 650;
  }
  &__solution {
    display: grid;
    gap: 22px;
    min-width: 0;
  }
  &__steps {
    list-style: none;
    padding: 0 !important;
    display: grid;
    gap: 14px;
    li {
      padding: 18px;
      background: var(--canvas);
      border: 1px solid var(--border);
      border-radius: 10px;
    }
    strong {
      color: var(--primary);
      font-size: 12px;
      display: block;
      margin-bottom: 6px;
    }
  }
  &__note {
    padding: 18px;
    border: 1px solid var(--border);
    border-radius: 10px;
    h4 {
      margin-top: 0;
    }
  }
  &__glossary {
    summary {
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
    }
    dl {
      margin: 14px 0 0;
    }
    dt {
      color: var(--primary);
      font-weight: 600;
      font-size: 12px;
      margin-top: 12px;
    }
    dd {
      font-size: 13px;
      line-height: 1.9;
      margin: 4px 0 0;
    }
  }
  &__actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    button,
    span {
      font-size: 12px;
    }
    span {
      color: var(--muted);
    }
  }
  &__muted {
    color: var(--muted);
    font-size: 12px;
  }
  @include responsive(mobile) {
    &__layout {
      grid-template-columns: minmax(0, 1fr);
    }
    &__catalog {
      position: static;
    }
    &__catalog nav {
      max-height: 230px;
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
