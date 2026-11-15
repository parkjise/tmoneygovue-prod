<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { ArrowUpRight, Check, Code2 } from 'lucide-vue-next';
import CodeExampleCard from '@/components/common/CodeExampleCard.vue';
import { getExampleFiles } from '@/data/codeSnippets';
const props = defineProps({ example: { type: [Object, Function], required: true } });
const route = useRoute();
const scss = computed(() => route.meta.folder === 'scss');
const overview = computed(() => route.path === '/dashboard/default');
const files = computed(() => getExampleFiles(route.path, route.meta.sourceFile));
const descriptions = {
  tools: '개인 Gemini / OpenAI API로 HTML 마크업에 맞는 BEM 클래스를 제안받으세요.',
  scss: '실제 컴파일된 SCSS를 조작하고, 재사용할 믹스인과 모듈 원본을 가져가세요.',
  'vue-syntax': '핵심 문법을 직접 조작하고, 실무에 필요한 코드를 바로 가져가세요.',
  'vue-patterns': '반복되는 문제를 해결하는 패턴. 상태 관리부터 정리 로직까지 확인하세요.',
  'ui-kits': '작은 디테일까지 직접 조작하는 Vue 컴포넌트 라이브러리.',
  apps: '당신의 다음 프로젝트를 위한, 실제로 동작하는 미니 앱.',
  'forms-tables': '입력부터 검증, 정렬과 내보내기까지. 실무 데이터 흐름을 경험하세요.',
  dashboard: '숫자 속에서 인사이트를 발견하는 Vue 대시보드.'
};
</script>
<template>
  <section class="reference-page">
    <template v-if="overview">
      <component :is="props.example" />
      <details class="reference-page__dashboard-code">
        <summary>대시보드 구현 코드 보기</summary>
        <CodeExampleCard
          title="Dashboard implementation"
          description="대시보드와 공통 컴포넌트 전체 원본"
          :files="files"
        >
          <p class="demo__muted">위 대시보드의 실제 구현 코드를 확인하고 복사하세요.</p>
        </CodeExampleCard>
      </details>
    </template>
    <template v-else-if="route.meta.folder === 'sm'">
      <component :is="props.example" />
      <details class="reference-page__dashboard-code">
        <summary>SM Vue · SCSS · Mixin 전체 소스 보기</summary>
        <CodeExampleCard
          title="SM implementation"
          description="Vue 컴포넌트 · 대화 상태 · SCSS · mixin 원본"
          :files="files"
        >
          <p class="demo__muted">
            위 화면에 사용한 전체 소스입니다. Tailwind 없이 SCSS와 mixin으로 구성했습니다.
          </p>
        </CodeExampleCard>
      </details>
    </template>
    <template v-else-if="['vue-practice', 'html5', 'css3'].includes(route.meta.folder)">
      <component :is="props.example" />
    </template>
    <template v-else>
      <header class="reference-page__header">
        <section>
          <span class="reference-page__eyebrow">
            THE DEVELOPER’S TOOLBOX / {{ route.meta.category }}
          </span>
          <h1>
            {{ route.meta.title }}
            <span>{{ route.meta.badge || (scss ? 'SCSS' : 'Vue 3') }}</span>
          </h1>
          <p>{{ route.meta.pageDescription || descriptions[route.meta.folder] }}</p>
        </section>
        <span class="reference-page__ready">
          <Check :size="13" />
          Ready to copy
        </span>
      </header>
      <aside class="reference-page__tip">
        <span><Code2 :size="18" /></span>
        <section>
          <strong>실행해 보고, 코드를 내 것으로.</strong>
          <p>
            <template v-if="route.meta.folder === 'tools'">
              입력한 내용으로 AI 결과를 받고 확인·복사하세요. API 키는 서버에서 관리하며, 프로젝트
              파일에는 자동 적용하지 않습니다.
            </template>
            <template v-else-if="route.meta.sourceFile">
              아래에 실제 SCSS 원본이 바로 표시됩니다. 파일을 선택해 모듈별 전체 소스를 확인하고
              복사하세요.
            </template>
            <template v-else-if="scss">
              스타일 탭에서 실제 SCSS를, 파일 선택에서 @use / @forward로 연결된 믹스인·함수·토큰
              원본을 확인하고 복사하세요.
            </template>
            <template v-else>
              모든 예제는 실제 Vue 3 &lt;script setup&gt;으로 동작합니다. 코드 보기에서 원본과 의존
              파일을 확인하세요.
            </template>
          </p>
        </section>
        <ArrowUpRight :size="17" />
      </aside>
      <CodeExampleCard
        :title="route.meta.title"
        :description="route.meta.description"
        :files="files"
        :initially-expanded="!!route.meta.sourceFile"
        :source-only="!!route.meta.sourceFile"
      >
        <component :is="props.example" />
      </CodeExampleCard>
      <footer class="reference-page__footer">
        <span>✧ Built with Vue 3 · SCSS · Composition API</span>
        <RouterLink to="/vue-patterns/composables">재사용 가능한 로직 살펴보기 ↗</RouterLink>
      </footer>
    </template>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.reference-page {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 24px;
  &__header {
    @include flex-between;
    h1 {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 28px;
      letter-spacing: -0.8px;
      font-weight: 650;
      margin: 7px 0 9px;
      span {
        font-size: 10px;
        background: var(--soft);
        color: var(--primary);
        padding: 3px 8px;
        border-radius: 6px;
        letter-spacing: 0;
      }
    }
    p {
      color: var(--caption);
      font-size: 12px;
    }
  }
  &__eyebrow {
    font-size: 8px;
    letter-spacing: 1.2px;
    color: var(--caption);
  }
  &__ready {
    display: flex;
    align-items: center;
    gap: 5px;
    color: var(--success);
    font-size: 10px;
  }
  &__tip {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 17px 20px;
    border: 1px solid color-mix(in srgb, var(--primary) 15%, var(--border));
    background: var(--soft);
    border-radius: 12px;
    > span {
      color: var(--primary);
      background: var(--surface);
      padding: 10px;
      display: flex;
      border-radius: 9px;
    }
    strong {
      font-size: 11px;
      font-weight: 600;
    }
    p {
      font-size: 10px;
      color: var(--muted);
      margin-top: 3px;
    }
    > svg {
      margin-left: auto;
      color: var(--primary);
    }
  }
  &__footer {
    @include flex-between;
    color: var(--caption);
    font-size: 10px;
    flex-wrap: wrap;
    a {
      color: var(--primary);
    }
  }
  &__dashboard-code {
    color: var(--muted);
    summary {
      cursor: pointer;
      font-size: 11px;
      padding: 10px;
    }
    .code-card {
      margin-top: 10px;
    }
  }
  @include responsive(mobile) {
    &__header {
      align-items: flex-start;
      h1 {
        font-size: 23px;
      }
    }
    &__ready {
      display: none;
    }
    &__tip {
      padding: 14px;
    }
  }
}
</style>
