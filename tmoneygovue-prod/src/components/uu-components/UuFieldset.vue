<script setup lang="ts">
export interface AllCheckboxInterface {
  count: number;
  value: number | string | (number | string)[] | null;
  checked: boolean;
}
export interface VNodeTypeInterface {
  children: object[];
}
const props = defineProps({
  /**
   * Fieldset Title
   */
  legend: {
    type: String,
    default: 'Legend'
  },
  /**
   * Hidden Fieldset Title
   */
  hideLegend: {
    type: Boolean,
    default: false
  }
  // allCheckbox: {
  //   type: Boolean,
  //   default: false
  // }
});
</script>
<template>
  <fieldset>
    <legend :class="{ sr_only: props.hideLegend }">
      {{ props.legend }}
    </legend>
    <slot />
  </fieldset>
</template>
