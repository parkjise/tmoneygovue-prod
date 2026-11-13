<script setup>
import { ref, computed } from 'vue';
const name = ref('Vue developer');
const age = ref(26);
const bio = ref('변경 후 포커스를 이동하세요');
const active = ref(true);
const color = ref('#6366f1');
const size = ref(18);
const valid = computed(() => name.value.length > 0 && Number.isFinite(age.value) && age.value >= 0);
</script>
<template>
  <section class="demo">
    <div class="demo__grid">
      <label class="demo__field">
        v-model.trim · 이름
        <input v-model.trim="name" />
      </label>
      <label class="demo__field">
        v-model.number · 나이
        <input v-model.number="age" type="number" min="0" />
      </label>
      <label class="demo__field">
        v-model.lazy · 소개
        <input v-model.lazy="bio" />
      </label>
    </div>
    <div class="demo__row">
      <label>
        <input v-model="active" type="checkbox" />
        강조 클래스
      </label>
      <label>
        색상
        <input v-model="color" type="color" />
      </label>
      <label>
        크기
        <input v-model.number="size" type="range" min="14" max="30" />
      </label>
    </div>
    <article
      class="binding-preview"
      :class="{ 'binding-preview--active': active }"
      :style="{ color, fontSize: size + 'px' }"
    >
      {{ name }} · {{ age }}세
      <p>{{ bio }}</p>
    </article>
    <p>
      폼 유효성: {{ valid ? '통과' : '이름과 나이를 확인하세요' }} · typeof age: {{ typeof age }}
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.binding-preview {
  padding: 24px;
  border: 1px solid var(--border);
  border-radius: 10px;
  &--active {
    background: var(--soft);
    border-color: var(--primary);
  }
}
</style>
