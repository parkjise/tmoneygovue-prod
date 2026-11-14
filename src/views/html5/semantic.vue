<script setup>
import { ref, computed } from 'vue';
import { Copy, Check, Download, CodeXml } from 'lucide-vue-next';
import patterns from '@/data/htmlSemanticPatterns.json';
import SyntaxCode from '@/components/common/SyntaxCode.vue';
import { useClipboard } from '@/composables/useClipboard';
import { useTheme } from '@/composables/useTheme';
import { createPracticePreview } from '@/composables/practicePreview';
import { buildSemanticDocument, semanticPreviewCss } from '@/composables/htmlSemantic';
const selectedId = ref(patterns[0].id);
const category = ref('전체');
const query = ref('');
const codeTab = ref('html');
const previewOpen = ref(false);
const resultPanel = ref(null);
const { theme } = useTheme();
const { copied, copy } = useClipboard();
const categories = [...new Set(patterns.map((item) => item.category))];
const tagSummary = (tags) =>
  tags
    .slice(0, 4)
    .map((tag) => '<' + tag + '>')
    .join(' ');
const active = computed(() => patterns.find((item) => item.id === selectedId.value));
const groups = computed(() =>
  categories
    .map((name) => ({
      name,
      items: patterns.filter(
        (item) =>
          item.category === name &&
          (category.value === '전체' || item.category === category.value) &&
          `${item.id} ${item.label} ${item.tags.join(' ')} ${item.description}`
            .toLowerCase()
            .includes(query.value.trim().toLowerCase())
      )
    }))
    .filter((group) => group.items.length)
);
const tabs = [
  { id: 'html', label: 'HTML 조각' },
  { id: 'document', label: '전체 HTML 문서' },
  { id: 'css', label: '미리보기 CSS' }
];
const code = computed(() =>
  codeTab.value === 'document'
    ? buildSemanticDocument(active.value)
    : codeTab.value === 'css'
      ? semanticPreviewCss.trim()
      : active.value.html
);
const preview = computed(() =>
  createPracticePreview(active.value.html, semanticPreviewCss, theme.value === 'dark')
);
function select(id) {
  selectedId.value = id;
  codeTab.value = 'html';
}
function download() {
  const blob = new Blob([buildSemanticDocument(active.value)], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = active.value.id + '.html';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
</script>
<template>
  <section class="html-guide">
    <header class="html-guide__intro">
      <span class="html-guide__eyebrow">HTML5 · SEMANTIC MARKUP</span>
      <h1>
        실무 시멘틱 마크업
        <small>{{ patterns.length }}개 패턴</small>
      </h1>
      <p>
        필요한 패턴 버튼을 누르면 아래에 전체 HTML 소스가 표시됩니다. 태그의 의미와 사용법을
        확인하고 프로젝트에 맞게 복사하세요.
      </p>
      <p class="html-guide__muted">
        BEM 클래스 이름을 함께 제공합니다. HTML 구조는 그대로 복사할 수 있고, 스타일과 앱 이벤트는
        프로젝트에 맞게 연결하면 됩니다.
      </p>
    </header>
    <section class="html-guide__picker" aria-label="시멘틱 패턴 선택">
      <div class="html-guide__filters">
        <label>
          패턴 검색
          <input v-model="query" type="search" placeholder="header, card, form, 테이블…" />
        </label>
        <label>
          패턴 분류
          <select v-model="category">
            <option>전체</option>
            <option v-for="name in categories" :key="name">{{ name }}</option>
          </select>
        </label>
      </div>
      <section v-for="group in groups" :key="group.name" class="html-guide__group">
        <h2>
          {{ group.name }}
          <small>{{ group.items.length }}</small>
        </h2>
        <div class="html-guide__buttons">
          <button
            v-for="item in group.items"
            :key="item.id"
            type="button"
            :aria-pressed="selectedId === item.id"
            :title="item.description"
            @click="select(item.id)"
          >
            <strong>{{ item.label }}</strong>
            <span>
              {{ tagSummary(item.tags) }}
            </span>
          </button>
        </div>
      </section>
      <p v-if="!groups.length" role="status">검색 결과가 없습니다. 검색어나 분류를 바꿔 주세요.</p>
      <footer class="html-guide__selection" role="status">
        <span>
          선택한 패턴:
          <strong>{{ active.label }}</strong>
        </span>
        <button
          type="button"
          @click="resultPanel?.scrollIntoView({ behavior: 'smooth', block: 'start' })"
        >
          선택한 소스 보기 ↓
        </button>
      </footer>
    </section>
    <section ref="resultPanel" class="html-guide__result" aria-label="선택한 HTML 소스">
      <header class="html-guide__heading">
        <div>
          <span class="html-guide__eyebrow">{{ active.category }}</span>
          <h2>
            <CodeXml :size="20" />
            {{ active.label }}
          </h2>
          <p>{{ active.description }}</p>
        </div>
        <button type="button" @click="download">
          <Download :size="15" />
          .html 다운로드
        </button>
      </header>
      <div class="html-guide__tags">
        <code v-for="tag in active.tags" :key="tag">&lt;{{ tag }}&gt;</code>
      </div>
      <aside class="html-guide__notes">
        <h3>이렇게 사용하세요</h3>
        <ul>
          <li v-for="note in active.notes" :key="note">{{ note }}</li>
        </ul>
      </aside>
      <div class="html-guide__preview-heading">
        <button
          type="button"
          :aria-expanded="previewOpen"
          aria-controls="semantic-preview"
          @click="previewOpen = !previewOpen"
        >
          {{ previewOpen ? '화면 접기' : '화면보기' }}
        </button>
        <span>이미지·링크·서버 주소는 프로젝트 경로로 바꿔 주세요.</span>
      </div>
      <iframe
        v-if="previewOpen"
        id="semantic-preview"
        :key="active.id + theme"
        class="html-guide__frame"
        :srcdoc="preview"
        sandbox=""
        referrerpolicy="no-referrer"
        :title="active.label + ' 화면보기'"
      />
      <nav class="html-guide__tabs" aria-label="HTML 소스 형식">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          :aria-pressed="codeTab === tab.id"
          @click="codeTab = tab.id"
        >
          {{ tab.label }}
        </button>
        <button
          class="html-guide__copy"
          type="button"
          aria-label="선택한 소스 복사"
          @click="copy(code, codeTab === 'css' ? 'CSS' : 'HTML')"
        >
          <Check v-if="copied" :size="15" />
          <Copy v-else :size="15" />
          {{ copied ? '복사됨' : '소스 복사' }}
        </button>
      </nav>
      <SyntaxCode
        :code="code"
        :language="codeTab === 'css' ? 'css' : 'html'"
        label="HTML5 예제 소스"
        class="html-guide__source"
      />
      <p class="html-guide__muted">
        HTML 조각을 합칠 때는 id가 중복되지 않도록 변경하고, label의
        for·aria-labelledby·aria-describedby도 같은 이름으로 맞추세요. 전체 문서 탭은 스타일을
        포함하지 않는 HTML 문서입니다.
      </p>
    </section>
    <footer class="html-guide__references">
      <span>태그 의미 참고:</span>
      <a
        href="https://html.spec.whatwg.org/multipage/sections.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        HTML 표준
      </a>
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements"
        target="_blank"
        rel="noopener noreferrer"
      >
        MDN HTML 요소
      </a>
    </footer>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.html-guide {
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
    ul {
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
