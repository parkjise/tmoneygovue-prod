<script setup>
import { ref, useId } from 'vue';
const open = ref(false);
const selected = ref('작업을 선택하세요');
const id = useId();
</script>
<template>
  <section class="demo">
    <section class="dropdown" @keydown.esc="open = false">
      <button :aria-expanded="open" :aria-controls="id" @click="open = !open">
        프로젝트 작업 ⌄
      </button>
      <ul v-if="open" :id="id" class="dropdown__menu" aria-label="프로젝트 작업">
        <li v-for="item in ['편집', '복제', '보관']" :key="item">
          <button
            @click="
              selected = item + ' 선택됨';
              open = false;
            "
          >
            {{ item }}
          </button>
        </li>
      </ul>
    </section>
    <output class="demo__output">{{ selected }}</output>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.dropdown {
  position: relative;
  min-height: 180px;
  &__menu {
    @include card-surface;
    position: absolute;
    top: 32px;
    padding: 6px;
    list-style: none;
    min-width: 160px;
    z-index: 2;
    button {
      width: 100%;
      text-align: left;
      border: 0;
    }
  }
}
</style>
