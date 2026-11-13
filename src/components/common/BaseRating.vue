<script setup>
const value = defineModel({ type: Number, default: 0 });
defineProps({ max: { type: Number, default: 5 }, label: { type: String, default: '별점' } });
</script>
<template>
  <fieldset class="base-rating">
    <legend>{{ label }}: {{ value }} / {{ max }}</legend>
    <label v-for="n in max" :key="n">
      <input v-model="value" type="radio" :value="n" :aria-label="n + '점'" />
      <span :class="{ 'base-rating__star--active': n <= value }">★</span>
    </label>
  </fieldset>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.base-rating {
  display: flex;
  gap: 8px;
  border: 0;
  padding: 0;
  legend {
    font-size: 12px;
    color: var(--muted);
    margin-bottom: 10px;
  }
  label {
    position: relative;
  }
  input {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    &:focus-visible + span {
      outline: 3px solid var(--primary);
      outline-offset: 3px;
    }
  }
  span {
    font-size: 30px;
    color: var(--border);
  }
  &__star--active {
    color: #f5b747 !important;
  }
}
</style>
