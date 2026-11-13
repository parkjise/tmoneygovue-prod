<script setup>
import { ref, useId } from 'vue';
defineProps({ items: { type: Array, required: true } });
const active = ref(0);
const id = useId();
</script>
<template>
  <section class="base-accordion">
    <article v-for="(item, i) in items" :key="item.title">
      <h3>
        <button
          :aria-expanded="active === i"
          :aria-controls="id + i"
          @click="active = active === i ? -1 : i"
        >
          {{ item.title }}
          <span>{{ active === i ? '−' : '+' }}</span>
        </button>
      </h3>
      <section v-show="active === i" :id="id + i">{{ item.content }}</section>
    </article>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.base-accordion {
  @include card-surface;
  overflow: hidden;
  article + article {
    border-top: 1px solid var(--border);
  }
  button {
    @include flex-between;
    width: 100%;
    border: 0;
    border-radius: 0;
    background: none;
    font-size: 14px;
    text-align: left;
    padding: 18px;
  }
  section {
    padding: 0 18px 18px;
    color: var(--muted);
  }
}
</style>
