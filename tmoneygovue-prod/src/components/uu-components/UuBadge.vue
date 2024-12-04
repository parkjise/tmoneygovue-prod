<script lang="ts" setup>
import { computed, type PropType } from 'vue';

export type BadgeColorType = 'primary' | 'secondary' | 'white' | 'black';
export type BadgeSizeType = 'sm' | 'md' | 'lg';

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  /**
   * color = 'primary' | 'secondary' | 'white' | 'black'
   */
  badgeColor: {
    type: String as PropType<BadgeColorType>,
    default: 'primary'
  },
  size: {
    type: String as PropType<BadgeSizeType>,
    default: 'md'
  },
  isButton: {
    type: Boolean,
    default: true
  }
});

const colorClasses = computed(() => ({
  badge_primary: props.badgeColor === 'primary',
  badge_secondary: props.badgeColor === 'secondary',
  badge_white: props.badgeColor === 'white',
  badge_black: props.badgeColor === 'black'
}));
</script>
<template>
  <div 
    class="badge" 
    :type="props.isButton ? 'button' : 'none'" 
    :class="[colorClasses, 'badge_' + props.size]" 
    tabindex="0" 
    :aria-label="props.label"
    >
    <span aria-hidden="true">
      <slot>{{ props.label }}</slot>
    </span>
  </div>
</template>
