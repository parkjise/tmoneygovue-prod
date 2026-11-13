<script setup>
const props = defineProps({ label: { type: String, default: '이름' } });
const emit = defineEmits({ save: (value) => typeof value === 'string' });
const name = defineModel({ type: String, default: '' });
</script>
<template>
  <article class="profile-editor">
    <header><slot name="header">프로필 편집</slot></header>
    <label>
      {{ props.label }}
      <input v-model="name" />
    </label>
    <button @click="emit('save', name)">저장 이벤트 전달</button>
    <slot :name="name" :length="name.length" />
  </article>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.profile-editor {
  @include card-surface;
  display: grid;
  gap: 16px;
  padding: 20px;
}
</style>
