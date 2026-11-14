<script setup>
import { ref, computed, watch } from 'vue';
import { Copy, Check, Download, Palette } from 'lucide-vue-next';
import patternConfigs from '@/data/css3Patterns.json';
import tipConfigs from '@/data/css3Tips.json';
import recipes from '@/data/scssRecipes.json';
import themeVariables from '@/assets/styles/_variables.scss?raw';
import SyntaxCode from '@/components/common/SyntaxCode.vue';
import { useClipboard } from '@/composables/useClipboard';
import { useTheme } from '@/composables/useTheme';
import { createPracticePreview } from '@/composables/practicePreview';
import {
  resolveCssPatterns,
  resolveCssTips,
  buildCssStyles,
  buildCssDocument,
  cssExampleBase
} from '@/composables/cssPatternOutput';
const patterns = resolveCssPatterns(patternConfigs, recipes);
const tips = resolveCssTips(tipConfigs, patterns);
const mode = ref('patterns');
const activeIds = ref({ patterns: patterns[0].id, tips: tips[0].id });
const category = ref('전체');
const query = ref('');
const codeTab = ref('css');
const previewOpen = ref(false);
const previewWidth = ref(720);
const previewTheme = ref('app');
const resultPanel = ref(null);
const { theme } = useTheme();
const { copied, copy } = useClipboard();
const items = computed(() => (mode.value === 'patterns' ? patterns : tips));
const categories = computed(() => [...new Set(items.value.map((item) => item.category))]);
const active = computed(() => items.value.find((item) => item.id === activeIds.value[mode.value]));
const groups = computed(() =>
  categories.value
    .map((name) => ({
      name,
      items: items.value.filter(
        (item) =>
          item.category === name &&
          (category.value === '전체' || item.category === category.value) &&
          `${item.id} ${item.title} ${item.properties.join(' ')} ${item.description}`
            .toLowerCase()
            .includes(query.value.trim().toLowerCase())
      )
    }))
    .filter((group) => group.items.length)
);
const dark = computed(
  () => previewTheme.value === 'dark' || (previewTheme.value === 'app' && theme.value === 'dark')
);
const baseCode = themeVariables.trim() + '\n\n' + cssExampleBase.trim();
const tabs = [
  { id: 'css', label: 'CSS 패턴' },
  { id: 'html', label: 'HTML 구조' },
  { id: 'base', label: '공통 기본 CSS' },
  { id: 'document', label: '전체 HTML 문서' }
];
const code = computed(() =>
  codeTab.value === 'document'
    ? buildCssDocument(active.value, themeVariables, dark.value)
    : codeTab.value === 'html'
      ? active.value.html
      : codeTab.value === 'base'
        ? baseCode
        : active.value.css
);
const preview = computed(() =>
  createPracticePreview(
    active.value.html,
    buildCssStyles(active.value, themeVariables),
    dark.value,
    true
  )
);
watch(mode, () => {
  category.value = '전체';
  query.value = '';
  codeTab.value = 'css';
  copied.value = false;
});
function select(id) {
  activeIds.value[mode.value] = id;
  codeTab.value = 'css';
  copied.value = false;
}
function download(format) {
  const html = format === 'html';
  const text = html
    ? buildCssDocument(active.value, themeVariables, dark.value)
    : buildCssStyles(active.value, themeVariables);
  const url = URL.createObjectURL(
    new Blob([text], { type: html ? 'text/html;charset=utf-8' : 'text/css;charset=utf-8' })
  );
  const link = document.createElement('a');
  link.href = url;
  link.download = active.value.id + '.' + format;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
</script>
<template>
  <section class="css-guide">
    <header class="css-guide__intro">
      <span class="css-guide__eyebrow">CSS3 · MODERN CSS</span>
      <h1>
        CSS3 실무 가이드
        <small>{{ patterns.length }}개 패턴 · {{ tips.length }}개 팁</small>
      </h1>
      <p>
        필요한 버튼을 누르면 아래에 컬러 소스가 표시됩니다. 레이아웃부터 현대 CSS와 실무 문제
        해결까지, Sass 없이 쓸 수 있는 CSS와 HTML을 제공합니다.
      </p>
    </header>
    <nav class="css-guide__modes" aria-label="CSS3 가이드 종류">
      <button type="button" :aria-pressed="mode === 'patterns'" @click="mode = 'patterns'">
        CSS3 패턴 · {{ patterns.length }}
      </button>
      <button type="button" :aria-pressed="mode === 'tips'" @click="mode = 'tips'">
        실무 팁 · {{ tips.length }}
      </button>
    </nav>
    <section class="css-guide__picker" aria-label="CSS 패턴과 팁 선택">
      <div class="css-guide__filters">
        <label>
          CSS 검색
          <input v-model="query" type="search" placeholder="grid, overflow, 포커스, 우선순위…" />
        </label>
        <label>
          CSS 분야
          <select v-model="category">
            <option>전체</option>
            <option v-for="name in categories" :key="name">{{ name }}</option>
          </select>
        </label>
      </div>
      <section v-for="group in groups" :key="group.name" class="css-guide__group">
        <h2>
          {{ group.name }}
          <small>{{ group.items.length }}</small>
        </h2>
        <div class="css-guide__buttons">
          <button
            v-for="item in group.items"
            :key="item.id"
            type="button"
            :aria-pressed="active.id === item.id"
            :title="item.description"
            @click="select(item.id)"
          >
            <strong>{{ item.title }}</strong>
            <span>{{ item.properties.slice(0, 3).join(' · ') }}</span>
          </button>
        </div>
      </section>
      <p v-if="!groups.length" role="status">검색 결과가 없습니다. 검색어나 분야를 바꿔 주세요.</p>
      <footer class="css-guide__selection" role="status">
        <span>
          선택한 {{ mode === 'patterns' ? '패턴' : '팁' }}:
          <strong>{{ active.title }}</strong>
        </span>
        <button
          type="button"
          @click="resultPanel?.scrollIntoView({ behavior: 'smooth', block: 'start' })"
        >
          선택한 소스 보기 ↓
        </button>
      </footer>
    </section>
    <section ref="resultPanel" class="css-guide__result" aria-label="선택한 CSS3 소스">
      <header class="css-guide__heading">
        <div>
          <span class="css-guide__eyebrow">{{ active.category }}</span>
          <h2>
            <Palette :size="20" />
            {{ active.title }}
          </h2>
          <p>{{ active.description }}</p>
        </div>
        <div class="css-guide__downloads">
          <button type="button" @click="download('css')">
            <Download :size="15" />
            전체 CSS 다운로드
          </button>
          <button type="button" @click="download('html')">.html 예제 다운로드</button>
        </div>
      </header>
      <div class="css-guide__tags">
        <code v-for="property in active.properties" :key="property">{{ property }}</code>
      </div>
      <section class="css-guide__notes">
        <h3>{{ mode === 'tips' ? '원인과 해결 방법' : '핵심 설명' }}</h3>
        <ol>
          <li v-for="step in active.steps" :key="step">{{ step }}</li>
        </ol>
      </section>
      <aside class="css-guide__pitfall">
        <strong>실무 체크 포인트</strong>
        <p>{{ active.pitfall }}</p>
      </aside>
      <section class="css-guide__preview">
        <button
          type="button"
          :aria-expanded="previewOpen"
          aria-controls="css3-preview"
          @click="previewOpen = !previewOpen"
        >
          {{ previewOpen ? '화면 접기' : '화면보기' }}
        </button>
        <div v-if="previewOpen" id="css3-preview">
          <div class="css-guide__filters">
            <label>
              미리보기 뷰포트 {{ previewWidth }}px
              <input
                v-model.number="previewWidth"
                type="range"
                min="280"
                max="1440"
                step="20"
                aria-label="CSS3 미리보기 너비"
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
          <p class="css-guide__muted">
            프레임은 실제 CSS를 렌더링합니다. 넓은 화면은 안쪽에서 가로 스크롤할 수 있습니다. 서버
            제출·앱 이벤트는 실행하지 않으며 인쇄·터치·모션 설정은 실제 환경에서도 확인하세요.
          </p>
          <div class="css-guide__frame-wrap">
            <iframe
              :key="active.id"
              :srcdoc="preview"
              sandbox=""
              referrerpolicy="no-referrer"
              :title="active.title + ' CSS 화면보기'"
              :style="{ width: previewWidth + 'px' }"
            />
          </div>
        </div>
      </section>
      <nav class="css-guide__tabs" aria-label="CSS3 소스 형식">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          :aria-pressed="codeTab === tab.id"
          @click="
            codeTab = tab.id;
            copied = false;
          "
        >
          {{ tab.label }}
        </button>
        <button
          class="css-guide__copy"
          type="button"
          aria-label="CSS3 선택한 소스 복사"
          @click="copy(code, codeTab === 'css' || codeTab === 'base' ? 'CSS' : 'HTML')"
        >
          <Check v-if="copied" :size="15" />
          <Copy v-else :size="15" />
          {{ copied ? '복사됨' : '소스 복사' }}
        </button>
        <button type="button" @click="copy(buildCssStyles(active, themeVariables), '전체 CSS')">
          전체 CSS 복사
        </button>
      </nav>
      <SyntaxCode
        :code="code"
        :language="codeTab === 'css' || codeTab === 'base' ? 'css' : 'html'"
        label="CSS3 예제 소스"
        class="css-guide__source"
      />
      <p class="css-guide__muted">
        CSS 패턴에는 var(--primary) 같은 공통 변수가 포함될 수 있습니다. 이 프로젝트 밖에서 쓸 때는
        ‘전체 CSS 복사’나 ‘공통 기본 CSS’를 함께 사용하세요. 전체 HTML 문서는 CSS까지 포함하며,
        HTML의 id와 클래스는 프로젝트에 맞게 바꿔 적용하세요.
      </p>
    </section>
    <footer class="css-guide__references">
      <span>참고 문서:</span>
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference"
        target="_blank"
        rel="noopener noreferrer"
      >
        MDN CSS 참고서
      </a>
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction"
        target="_blank"
        rel="noopener noreferrer"
      >
        CSS 우선순위와 캐스케이드
      </a>
    </footer>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.css-guide {
  display: grid;
  gap: 24px;
  min-width: 0;
  &__intro,
  &__picker,
  &__result {
    @include card-surface;
    padding: 24px;
    min-width: 0;
  }
  &__intro {
    h1 {
      font-size: 27px;
      margin: 8px 0 12px;
      small {
        font-size: 12px;
        color: var(--primary);
        margin-left: 8px;
      }
    }
    p {
      font-size: 13px;
      line-height: 1.9;
      margin-top: 8px;
    }
  }
  &__eyebrow {
    color: var(--primary);
    font-size: 10px;
    letter-spacing: 1px;
  }
  &__muted {
    color: var(--muted);
    font-size: 12px;
    line-height: 1.9;
  }
  &__modes {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    button {
      padding: 12px 18px;
      font-size: 13px;
      font-weight: 600;
      &[aria-pressed='true'] {
        background: var(--primary);
        color: white;
      }
    }
  }
  &__downloads {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  &__pitfall {
    padding: 16px;
    border: 1px solid var(--border);
    border-radius: 10px;
    strong {
      font-size: 13px;
    }
    p {
      font-size: 12px;
      line-height: 1.9;
      margin-top: 8px;
      color: var(--muted);
    }
  }
  &__preview {
    display: grid;
    gap: 14px;
    > button {
      justify-self: start;
      font-size: 12px;
    }
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
      height: 440px;
      max-width: none;
      border: 0;
      background: var(--surface);
    }
  }
  &__picker {
    display: grid;
    gap: 24px;
  }
  &__filters {
    display: grid;
    grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
    gap: 14px;
    label {
      display: grid;
      gap: 8px;
      font-size: 12px;
    }
    input,
    select {
      width: 100%;
      min-width: 0;
    }
  }
  &__group h2 {
    font-size: 14px;
    margin-bottom: 12px;
    small {
      color: var(--muted);
      font-size: 11px;
      margin-left: 6px;
    }
  }
  &__buttons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(180px, 100%), 1fr));
    gap: 9px;
    button {
      @include focus-ring;
      display: grid;
      gap: 7px;
      text-align: left;
      padding: 13px;
      min-width: 0;
      strong {
        font-size: 12px;
      }
      span {
        font-size: 10px;
        color: var(--muted);
        overflow-wrap: anywhere;
      }
      &[aria-pressed='true'] {
        background: var(--soft);
        color: var(--primary);
        border-color: var(--primary);
      }
    }
  }
  &__selection {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding-top: 16px;
    border-top: 1px solid var(--border);
    font-size: 12px;
    button {
      font-size: 12px;
    }
  }
  &__result {
    display: grid;
    gap: 18px;
    scroll-margin-top: 100px;
  }
  &__heading {
    display: flex;
    flex-wrap: wrap;
    align-items: start;
    justify-content: space-between;
    gap: 12px;
    h2 {
      display: flex;
      align-items: center;
      gap: 9px;
      font-size: 21px;
      margin: 8px 0;
    }
    p {
      font-size: 12px;
      color: var(--muted);
    }
    button {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
    }
  }
  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    code {
      padding: 4px 8px;
      background: var(--soft);
      color: var(--primary);
      border-radius: 6px;
      font-size: 12px;
    }
  }
  &__notes {
    background: var(--canvas);
    padding: 16px;
    border-radius: 10px;
    h3 {
      font-size: 13px;
      margin-bottom: 8px;
    }
    ol {
      padding-left: 20px;
    }
    li {
      font-size: 12px;
      line-height: 1.9;
      margin-top: 6px;
    }
  }
  &__preview-heading {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
    button {
      font-size: 12px;
    }
    span {
      font-size: 11px;
      color: var(--muted);
    }
  }
  &__frame {
    width: 100%;
    height: 380px;
    border: 1px solid var(--border);
    border-radius: 10px;
    background: var(--surface);
  }
  &__tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    button {
      display: flex;
      align-items: center;
      gap: 7px;
      font-size: 12px;
      &[aria-pressed='true'] {
        background: var(--soft);
        color: var(--primary);
        border-color: var(--primary);
      }
    }
  }
  &__copy {
    margin-left: auto;
  }
  &__source {
    border-radius: 10px;
  }
  &__references {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    font-size: 11px;
    color: var(--muted);
    a {
      color: var(--primary);
    }
  }
  @include responsive(mobile) {
    &__intro,
    &__picker,
    &__result {
      padding: 18px;
    }
    &__filters {
      grid-template-columns: minmax(0, 1fr);
    }
    &__copy {
      margin-left: 0;
    }
  }
}
</style>
