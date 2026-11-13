<script setup>
import { ref } from 'vue';
const size = ref(48);
const online = ref(true);
</script>
<template>
  <section class="demo">
    <div class="demo__row">
      <label>
        크기
        <input v-model.number="size" type="range" min="30" max="80" />
      </label>
      <label>
        <input v-model="online" type="checkbox" />
        온라인 표시
      </label>
    </div>
    <div class="demo__row">
      <span
        v-for="(name, i) in ['JP', 'EW', 'AK', 'OC']"
        :key="name"
        class="avatar"
        :style="{
          width: size + 'px',
          height: size + 'px',
          background: ['#eee9ff', '#fbe8ef', '#e3f4ed', '#fdf0de'][i]
        }"
      >
        {{ name }}
        <i v-if="online" />
      </span>
    </div>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.avatar {
  @include flex-center;
  border-radius: 50%;
  position: relative;
  color: #756789;
  font-weight: 600;
  i {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 12px;
    height: 12px;
    background: var(--success);
    border-radius: 50%;
    border: 2px solid var(--surface);
  }
}
</style>
