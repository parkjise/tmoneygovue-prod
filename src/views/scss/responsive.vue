<script setup>
import ScssRecipeCatalog from '@/components/examples/ScssRecipeCatalog.vue';
import { ref } from 'vue';
const width = ref(720);
</script>
<template>
  <section class="demo">
    <ScssRecipeCatalog topic="responsive" />
    <aside class="demo__output">
      <strong>페이지는 Media Query, 컴포넌트는 Container Query.</strong>
      <p>
        모바일을 기본으로 작성한 뒤 @content 믹스인으로 넓은 화면을 확장하세요. 아래 너비 조절은
        실제 컨테이너 쿼리를 실행합니다.
      </p>
    </aside>
    <label class="demo__field">
      미리보기 최대 너비 {{ width }}px
      <input
        v-model.number="width"
        type="range"
        min="260"
        max="900"
        aria-label="반응형 미리보기 너비"
      />
    </label>
    <section class="responsive-frame" :style="{ width: width + 'px' }">
      <section class="responsive-frame__grid" data-testid="responsive-grid">
        <article
          v-for="item in [
            { name: 'Design', icon: '✧' },
            { name: 'Develop', icon: '⌘' },
            { name: 'Deliver', icon: '↗' }
          ]"
          :key="item.name"
        >
          <span>{{ item.icon }}</span>
          <h3>{{ item.name }}</h3>
          <p>
            480px 이상: 2열
            <br />
            680px 이상: 3열
          </p>
        </article>
      </section>
    </section>
    <p class="responsive-note">
      뷰포트 768px 이상에서는 이 안내의 왼쪽 테두리가 강조됩니다. 실제 @media 믹스인 예제입니다.
    </p>
    <p class="demo__muted">
      미리보기는 부모 너비를 초과하지 않습니다. 작은 화면에서는 슬라이더 값을 높여도 실제 사용
      가능한 너비로 제한됩니다.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
@use '@/assets/styles/practice' as ui;
.demo {
  @include custom-scrollbar;
}

.responsive-frame {
  container-type: inline-size;
  container-name: recipe;
  max-width: 100%;
  border: 1px dashed var(--primary);
  border-radius: ui.$radius;
  padding: ui.space(3);
  &__grid {
    display: grid;
    gap: ui.space(3);
    grid-template-columns: minmax(0, 1fr);
    @include ui.container-up(480px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @include ui.container-up(680px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    article {
      @include ui.surface(ui.space(4));
      min-width: 0;
    }
    span {
      color: var(--primary);
      font-size: 28px;
    }
    h3 {
      font-size: ui.rem(15px);
      margin: ui.space(2) 0;
    }
    p {
      font-size: ui.rem(12px);
      color: var(--muted);
    }
  }
}
.responsive-note {
  padding: ui.space(3);
  border-left: 3px solid var(--border);
  background: var(--canvas);
  font-size: ui.rem(12px);
  @include ui.respond(md) {
    border-color: var(--primary);
  }
}
</style>
