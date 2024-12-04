<script lang="ts" setup>
import { onMounted, ref, type PropType, type CSSProperties, onBeforeUnmount } from 'vue';

type shapeType = 'rectangle' | 'circle';

const props = defineProps({
  /**
   * shapeType = 'rectangle' | 'circle';<br>
   * ㄴ rectangle: border-radius: 0.4rem;<br>
   * ㄴ circle: border-radius: 50%;
   */
  shape: {
    type: String as PropType<shapeType> | undefined,
    default: 'rectangle'
  },
  width: {
    type: String,
    default: '100%',
    required: true
  },
  height: {
    type: String,
    default: '1rem',
    required: true
  },
  /**
   * CSS
   */
  style: {
    type: Object as PropType<CSSProperties>,
    default: null
  },
  /**
   * Default Show
   */
  preview: {
    type: Boolean,
    default: false
  }
});

const skeleton = ref(true);
const skeletonLoading = ref();

onMounted(() => {
  skeletonLoading.value = setTimeout(() => {
    skeleton.value = false;
    props.preview && (skeleton.value = true);
  }, 3000);
});
onBeforeUnmount(() => {
  clearTimeout(skeletonLoading.value);
});
</script>
<template>
  <transition>
    <template v-if="skeleton">
      <span
        :style="{ width: props.width, height: props.height, ...props.style }"
        class="skeleton"
        :class="`skeleton_${props.shape}`"
      />
    </template>
    <slot v-else />
  </transition>
</template>
<style lang="scss"></style>
