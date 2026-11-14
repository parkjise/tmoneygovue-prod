<script setup>
import { ref, computed } from 'vue';
import catalog from '@/data/commonMixins.json';
import SyntaxCode from '@/components/common/SyntaxCode.vue';
import { useClipboard } from '@/composables/useClipboard';
const query = ref('');
const category = ref('전체');
const selectedName = ref('auto-grid');
const categories = [...new Set(catalog.map((item) => item.category))];
const selected = computed(() => catalog.find((item) => item.name === selectedName.value));
const groups = computed(() =>
  categories
    .map((name) => ({
      name,
      items: catalog.filter(
        (item) =>
          item.category === name &&
          (category.value === '전체' || name === category.value) &&
          `${item.name} ${item.description} ${item.notes.join(' ')}`
            .toLowerCase()
            .includes(query.value.trim().toLowerCase())
      )
    }))
    .filter((group) => group.items.length)
);
const { copy } = useClipboard();
</script>
<template>
  <section class="mixin-catalog" aria-label="공통 믹스인 카탈로그">
    <header>
      <h3>공통 Mixin {{ catalog.length }}종</h3>
      <p>용도별로 찾고 버튼을 선택하면 사용 예시와 실제 Sass 컴파일 결과를 확인할 수 있습니다.</p>
    </header>
    <div class="mixin-catalog__filters">
      <label>
        믹스인 검색
        <input v-model="query" type="search" placeholder="grid, 텍스트, 반응형…" />
      </label>
      <label>
        믹스인 분야
        <select v-model="category">
          <option>전체</option>
          <option v-for="name in categories" :key="name">{{ name }}</option>
        </select>
      </label>
    </div>
    <section v-for="group in groups" :key="group.name">
      <h4>{{ group.name }} · {{ group.items.length }}</h4>
      <div class="mixin-catalog__buttons">
        <button
          v-for="item in group.items"
          :key="item.name"
          type="button"
          :aria-pressed="selectedName === item.name"
          @click="selectedName = item.name"
        >
          <strong>{{ item.name }}</strong>
          <span>{{ item.description }}</span>
        </button>
      </div>
    </section>
    <p v-if="!groups.length" role="status">검색 결과가 없습니다. 검색어나 분야를 바꿔 주세요.</p>
    <section class="mixin-catalog__selected" aria-label="선택한 믹스인 사용법">
      <header>
        <h3>{{ selected.name }}</h3>
        <p>{{ selected.description }}</p>
      </header>
      <ul>
        <li v-for="note in selected.notes" :key="note">{{ note }}</li>
      </ul>
      <div class="mixin-catalog__code">
        <section>
          <header>
            <h4>SCSS 사용 예시</h4>
            <button type="button" @click="copy(selected.usage, 'SCSS')">사용 예시 복사</button>
          </header>
          <SyntaxCode :code="selected.usage" language="scss" label="믹스인 사용 예시" />
        </section>
        <section>
          <header>
            <h4>컴파일된 CSS</h4>
            <button type="button" @click="copy(selected.css, 'CSS')">CSS 복사</button>
          </header>
          <SyntaxCode :code="selected.css" language="css" label="믹스인 컴파일 결과" />
        </section>
      </div>
      <p>
        사용 예시는 공통 모듈을 가져오는 방식입니다. 정의 전체는 아래 원본 파일에서 복사하세요.
        색상·배경 등 CSS 변수는 전역 테마 토큰이 필요합니다.
      </p>
    </section>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.mixin-catalog {
  display: grid;
  gap: 20px;
  min-width: 0;
  h3 {
    font-size: 17px;
  }
  h4 {
    font-size: 13px;
    margin-bottom: 10px;
  }
  p,
  li {
    font-size: 12px;
    line-height: 1.9;
    color: var(--muted);
  }
  p {
    margin-top: 7px;
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
    grid-template-columns: repeat(auto-fit, minmax(min(160px, 100%), 1fr));
    gap: 8px;
    button {
      @include focus-ring;
      display: grid;
      gap: 6px;
      text-align: left;
      min-width: 0;
      strong {
        font-size: 12px;
        overflow-wrap: anywhere;
      }
      span {
        font-size: 10px;
        color: var(--muted);
      }
      &[aria-pressed='true'] {
        background: var(--soft);
        color: var(--primary);
        border-color: var(--primary);
      }
    }
  }
  &__selected {
    display: grid;
    gap: 14px;
    padding: 20px;
    border: 1px solid var(--border);
    border-radius: 12px;
    min-width: 0;
    ul {
      padding-left: 18px;
    }
  }
  &__code {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    min-width: 0;
    section {
      min-width: 0;
    }
    header {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      margin-bottom: 10px;
      h4 {
        margin: 0;
      }
      button {
        font-size: 10px;
      }
    }
    .syntax-code {
      border-radius: 8px;
      max-height: 350px;
    }
  }
  @include responsive(tablet) {
    &__code {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  @include responsive(mobile) {
    &__filters {
      grid-template-columns: minmax(0, 1fr);
    }
    &__selected {
      padding: 14px;
    }
  }
}
</style>
