<script setup>
import { ref } from 'vue';
import BaseButton from '@/components/common/BaseButton.vue';
const count = ref(0);
const disabled = ref(false);
</script>
<template>
  <section class="demo">
    <label>
      <input v-model="disabled" type="checkbox" />
      비활성화
    </label>
    <div class="demo__row">
      <BaseButton
        v-for="variant in ['primary', 'secondary', 'danger']"
        :key="variant"
        :variant="variant"
        :disabled="disabled"
        @click="count++"
      >
        {{ variant }} ↗
      </BaseButton>
    </div>
    <output class="demo__output">{{ count }}회 클릭</output>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
