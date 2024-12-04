<template>
  <div class="main_arrow_icon">
    <svg
      :width="arrowSizeWidth"
      :height="arrowSizeHeight"
      viewBox="0 0 6 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0.5 1L5.5 6L0.5 11" :stroke="arrowColor" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps({
  arrowColor: {
    type: String,
    required: true
  },
  arrowSizeWidth: {
    type: String,
    required: false,
    default: '1.0rem'
  },
  arrowSizeHeight: {
    type: String,
    required: false,
    default: '1.1rem'
  }
});
</script>

<style scoped></style>
