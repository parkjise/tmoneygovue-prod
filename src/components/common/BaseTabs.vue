<script setup>
import { ref, useId } from 'vue';
const props = defineProps({ items: { type: Array, required: true } });
const active = ref(0),
  id = useId();
function keydown(e, i) {
  let n = i;
  if (e.key === 'ArrowRight') n = (i + 1) % props.items.length;
  else if (e.key === 'ArrowLeft') n = (i + props.items.length - 1) % props.items.length;
  else if (e.key === 'Home') n = 0;
  else if (e.key === 'End') n = props.items.length - 1;
  else return;
  e.preventDefault();
  active.value = n;
  document.getElementById(id + '-tab-' + n)?.focus();
}
</script>
<template>
  <section class="base-tabs">
    <nav role="tablist" aria-label="콘텐츠 탭">
      <button
        v-for="(item, i) in items"
        :id="id + '-tab-' + i"
        :key="item.title"
        role="tab"
        :aria-selected="active === i"
        :aria-controls="id + '-panel-' + i"
        :tabindex="active === i ? 0 : -1"
        @click="active = i"
        @keydown="keydown($event, i)"
      >
        {{ item.title }}
      </button>
    </nav>
    <section
      v-for="(item, i) in items"
      v-show="active === i"
      :id="id + '-panel-' + i"
      :key="item.title"
      role="tabpanel"
      :aria-labelledby="id + '-tab-' + i"
      tabindex="0"
    >
      {{ item.content }}
    </section>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.base-tabs {
  @include card-surface;
  overflow: hidden;
  nav {
    display: flex;
    border-bottom: 1px solid var(--border);
  }
  button {
    border: 0;
    border-radius: 0;
    padding: 15px 22px;
    background: none;
    &[aria-selected='true'] {
      color: var(--primary);
      border-bottom: 2px solid var(--primary);
    }
  }
  section {
    padding: 24px;
    color: var(--muted);
  }
}
</style>
