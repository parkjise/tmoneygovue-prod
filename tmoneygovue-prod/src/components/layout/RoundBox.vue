<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: null
  },
  padding: {
    type: String,
    default: '2rem'
  },
  paddingTop: {
    type: String,
    default: '2rem'
  },
  paddingRight: {
    type: String,
    default: '2rem'
  },
  paddingBottom: {
    type: String,
    default: '2rem'
  },
  paddingLeft: {
    type: String,
    default: '2rem'
  },
  hideTitle: {
    type: Boolean,
    default: false
  }
});
</script>
<template>
  <div
    class="round_box"
    :style="[
      { paddingTop: paddingTop },
      { paddingRight: paddingRight },
      { paddingBottom: paddingBottom },
      { paddingLeft: paddingLeft },
      { padding: padding }
    ]"
  >
    <div v-if="!props.hideTitle" class="box_title">
      <template v-if="title">
        {{ title }}
      </template>
      <template v-else>
        <slot name="title" />
      </template>
    </div>
    <slot />
  </div>
</template>
