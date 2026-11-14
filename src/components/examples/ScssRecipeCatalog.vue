<script setup>
import { ref, computed, watch } from 'vue';
import recipes from '@/data/scssRecipes.json';
import themeVariables from '@/assets/styles/_variables.scss?raw';
import SyntaxCode from '@/components/common/SyntaxCode.vue';
import { getExampleFiles } from '@/data/codeSnippets';
import { getRecipeDefinitions } from '@/composables/scssRecipeSource';
import { createPracticePreview } from '@/composables/practicePreview';
import { useClipboard } from '@/composables/useClipboard';
import { useTheme } from '@/composables/useTheme';
const props = defineProps({ topic: { type: String, required: true } });
const names = {
  tokens: '디자인 토큰',
  functions: '계산 함수',
  responsive: '반응형',
  typography: '타이포그래피',
  layout: '레이아웃',
  states: '상태와 인터랙션',
  loops: 'Map과 반복문',
  modules: '모듈 설계',
  'practice-source': 'Practice 진입점',
  'practice-tokens': 'Tokens 모듈',
  'practice-functions': 'Functions 모듈',
  'practice-mixins': 'Practice Mixins'
};
const search = ref('');
const group = ref('전체');
const selectedId = ref('');
const selectedMember = ref('');
const selectedFile = ref('');
const previewOpen = ref(false);
const previewWidth = ref(720);
const previewTheme = ref('app');
const { theme } = useTheme();
const { copy } = useClipboard();
const available = computed(() => recipes.filter((recipe) => recipe.topics.includes(props.topic)));
const categories = computed(() => [...new Set(available.value.map((item) => item.topic))]);
const filtered = computed(() =>
  available.value.filter(
    (item) =>
      (group.value === '전체' || item.topic === group.value) &&
      `${item.title} ${item.description} ${item.id}`
        .toLowerCase()
        .includes(search.value.trim().toLowerCase())
  )
);
const active = computed(
  () => filtered.value.find((item) => item.id === selectedId.value) || filtered.value[0]
);
const files = computed(() =>
  active.value
    ? {
        ...getExampleFiles('', active.value.file),
        'src/assets/styles/_variables.scss': themeVariables
      }
    : {}
);
const usage = computed(() => files.value[active.value?.file.slice(1)] || '');
const definitions = computed(() =>
  active.value ? getRecipeDefinitions(files.value, active.value.file) : []
);
const declaration = computed(
  () =>
    definitions.value.find((item) => item.label === selectedMember.value) || definitions.value[0]
);
const dependencyFile = computed(() =>
  selectedFile.value in files.value
    ? selectedFile.value
    : declaration.value?.file || Object.keys(files.value)[0]
);
const dark = computed(
  () => previewTheme.value === 'dark' || (previewTheme.value === 'app' && theme.value === 'dark')
);
const preview = computed(() =>
  active.value
    ? createPracticePreview(
        active.value.html,
        themeVariables + '\n' + active.value.css,
        dark.value,
        true
      )
    : ''
);
watch(
  () => active.value?.id,
  () => {
    selectedMember.value = '';
    selectedFile.value = '';
  }
);
watch(
  () => props.topic,
  () => {
    search.value = '';
    group.value = '전체';
    selectedId.value = '';
  }
);
</script>
<template>
  <section class="scss-recipes" :aria-label="names[topic] + ' 실무 레시피'">
    <header class="scss-recipes__intro">
      <h3>{{ names[topic] }} · 실무 레시피 {{ available.length }}개</h3>
      <p>
        패턴을 선택하면 실제 SCSS 사용 파일, Sass 컴파일 결과, 호출한 정의와 의존 파일을 확인할 수
        있습니다. 화면보기에서 너비와 테마를 바꿔 비교해 보세요.
      </p>
    </header>
    <div class="scss-recipes__filters">
      <label>
        레시피 검색
        <input v-model="search" type="search" placeholder="검색, 클래스, 동작…" />
      </label>
      <label v-if="categories.length > 1">
        레시피 분야
        <select v-model="group">
          <option>전체</option>
          <option v-for="name in categories" :key="name" :value="name">{{ names[name] }}</option>
        </select>
      </label>
    </div>
    <nav class="scss-recipes__buttons" aria-label="SCSS 레시피 선택">
      <button
        v-for="recipe in filtered"
        :key="recipe.id"
        type="button"
        :aria-pressed="active?.id === recipe.id"
        @click="selectedId = recipe.id"
      >
        <strong>{{ recipe.title }}</strong>
        <span>{{ recipe.description }}</span>
      </button>
    </nav>
    <p v-if="!filtered.length" role="status">
      일치하는 레시피가 없습니다. 검색어나 분야를 바꿔 주세요.
    </p>
    <article v-if="active" class="scss-recipes__detail" aria-label="선택한 SCSS 레시피">
      <header>
        <small>{{ names[active.topic] }}</small>
        <h3>{{ active.title }}</h3>
        <p>{{ active.description }}</p>
        <code class="scss-recipes__path">{{ active.file.replace('/src/', 'src/') }}</code>
      </header>
      <ol class="scss-recipes__steps">
        <li v-for="step in active.steps" :key="step">{{ step }}</li>
      </ol>
      <aside class="scss-recipes__note">
        <strong>실무에서 주의할 점</strong>
        <p>{{ active.pitfall }}</p>
      </aside>
      <section class="scss-recipes__preview">
        <button
          type="button"
          :aria-expanded="previewOpen"
          aria-controls="scss-recipe-preview"
          @click="previewOpen = !previewOpen"
        >
          {{ previewOpen ? '화면 접기' : '화면보기' }}
        </button>
        <div v-if="previewOpen" id="scss-recipe-preview">
          <div class="scss-recipes__filters">
            <label>
              미리보기 뷰포트 너비 {{ previewWidth }}px
              <input
                v-model.number="previewWidth"
                type="range"
                min="280"
                max="1440"
                step="20"
                aria-label="SCSS 미리보기 너비"
              />
            </label>
            <label>
              미리보기 테마
              <select v-model="previewTheme">
                <option value="app">앱 테마</option>
                <option value="light">밝게</option>
                <option value="dark">어둡게</option>
              </select>
            </label>
          </div>
          <p>
            프레임 너비는 실제 미디어 쿼리의 기준입니다. 넓은 화면은 영역 안에서 가로 스크롤할 수
            있습니다. hover·인쇄·모션 설정은 브라우저 환경도 함께 확인하세요.
          </p>
          <div class="scss-recipes__frame-wrap">
            <iframe
              :key="active.id"
              :srcdoc="preview"
              :title="active.title + ' 화면보기'"
              sandbox=""
              referrerpolicy="no-referrer"
              :style="{ width: previewWidth + 'px' }"
            />
          </div>
        </div>
      </section>
      <div class="scss-recipes__columns">
        <section>
          <header>
            <h4>SCSS 사용 예시 · 실제 파일</h4>
            <button type="button" @click="copy(usage, 'SCSS')">SCSS 복사</button>
          </header>
          <SyntaxCode :code="usage" language="scss" label="레시피 SCSS 사용 예시" />
        </section>
        <section>
          <header>
            <h4>컴파일된 CSS</h4>
            <button type="button" @click="copy(active.css, 'CSS')">CSS 복사</button>
          </header>
          <SyntaxCode :code="active.css" language="css" label="레시피 컴파일 CSS" />
        </section>
      </div>
      <details class="scss-recipes__markup">
        <summary>화면보기에 사용한 HTML</summary>
        <header>
          <h4>HTML 구조</h4>
          <button type="button" @click="copy(active.html, 'HTML')">HTML 복사</button>
        </header>
        <SyntaxCode :code="active.html" language="html" label="레시피 HTML" />
      </details>
      <section v-if="declaration" class="scss-recipes__source">
        <header>
          <h4>호출한 함수·믹스인·토큰의 실제 정의</h4>
          <button type="button" @click="copy(declaration.code, 'SCSS 정의')">정의 복사</button>
        </header>
        <label>
          정의 선택
          <select
            :value="declaration.label"
            @change="
              selectedMember = $event.target.value;
              selectedFile = '';
            "
          >
            <option v-for="item in definitions" :key="item.label" :value="item.label">
              {{ item.label }} · {{ item.kind }}
            </option>
          </select>
        </label>
        <code class="scss-recipes__path">{{ declaration.file }}</code>
        <SyntaxCode :code="declaration.code" language="scss" label="레시피 관련 원본 정의" />
      </section>
      <section class="scss-recipes__source">
        <header>
          <h4>전체 원본과 의존 파일</h4>
          <button type="button" @click="copy(files[dependencyFile], 'SCSS 원본')">
            선택 파일 복사
          </button>
        </header>
        <label>
          원본 파일
          <select :value="dependencyFile" @change="selectedFile = $event.target.value">
            <option v-for="(_, name) in files" :key="name" :value="name">{{ name }}</option>
          </select>
        </label>
        <SyntaxCode :code="files[dependencyFile] || ''" language="scss" label="레시피 의존 원본" />
        <p>
          정의 조각에는 다른 함수·변수·모듈이 필요할 수 있습니다. 원본 파일과 @use/@forward 경로를
          함께 유지하세요. _variables.scss는 런타임 테마용 CSS 변수이며, 실제 Sass 의존 파일과
          구분해 제공합니다.
        </p>
      </section>
    </article>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.scss-recipes {
  display: grid;
  gap: 20px;
  min-width: 0;
  h3 {
    font-size: 17px;
  }
  h4 {
    font-size: 14px;
  }
  p,
  li {
    font-size: 12px;
    line-height: 1.95;
    color: var(--muted);
  }
  p {
    margin-top: 8px;
  }
  &__intro {
    padding: 18px;
    background: var(--soft);
    border-radius: 12px;
  }
  &__filters {
    display: grid;
    grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
    gap: 14px;
    label {
      display: grid;
      gap: 7px;
      font-size: 12px;
    }
    input,
    select {
      width: 100%;
      min-width: 0;
    }
  }
  &__buttons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(180px, 100%), 1fr));
    gap: 8px;
    button {
      @include focus-ring;
      display: grid;
      gap: 6px;
      text-align: left;
      min-width: 0;
      strong {
        font-size: 12px;
      }
      span {
        color: var(--muted);
        font-size: 10px;
      }
      &[aria-pressed='true'] {
        background: var(--soft);
        color: var(--primary);
        border-color: var(--primary);
      }
    }
  }
  &__detail {
    display: grid;
    gap: 20px;
    min-width: 0;
    padding: 20px;
    border: 1px solid var(--border);
    border-radius: 12px;
    > header h3 {
      margin: 7px 0;
    }
    small {
      color: var(--primary);
    }
  }
  &__path {
    display: block;
    font-size: 11px;
    overflow-wrap: anywhere;
    margin-top: 8px;
    color: var(--primary);
  }
  &__steps {
    padding-left: 22px;
    margin: 0;
    li + li {
      margin-top: 9px;
    }
  }
  &__note {
    padding: 16px;
    background: var(--canvas);
    border-radius: 10px;
    strong {
      font-size: 12px;
    }
  }
  &__columns {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    > section {
      min-width: 0;
    }
  }
  &__columns header,
  &__source header,
  &__markup header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
    button {
      font-size: 11px;
    }
  }
  &__source {
    display: grid;
    gap: 12px;
    min-width: 0;
    label {
      display: grid;
      gap: 8px;
      font-size: 12px;
    }
    select {
      width: 100%;
      min-width: 0;
      max-width: 100%;
    }
  }
  &__preview > button {
    margin-bottom: 14px;
    font-size: 12px;
  }
  &__frame-wrap {
    @include custom-scrollbar;
    overflow-x: auto;
    max-width: 100%;
    margin-top: 14px;
    border: 1px solid var(--border);
    border-radius: 10px;
    iframe {
      display: block;
      height: 460px;
      max-width: none;
      border: 0;
      background: var(--surface);
    }
  }
  &__markup {
    min-width: 0;
    summary {
      cursor: pointer;
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 12px;
    }
  }
  .syntax-code {
    border-radius: 9px;
    max-height: 420px;
  }
  @include responsive(tablet) {
    &__columns {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  @include responsive(mobile) {
    &__filters {
      grid-template-columns: minmax(0, 1fr);
    }
    &__detail {
      padding: 14px;
    }
  }
}
</style>
