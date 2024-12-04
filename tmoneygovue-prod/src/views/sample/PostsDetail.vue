<template>hi</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { logger } from '@/utils/logger';
// import { useRouter, useRoute } from 'vue-router';

// const router = useRouter();
// const route = useRoute();
// const props = defineProps({
//   item: {
//     type: Object,
//     required: true
//   },
//   isLoadingPostRead: {
//     type: Boolean,
//     required: true
//   },
//   donePostRead: {
//     type: Boolean,
//     required: true
//   },
//   onClickBackBtn_: {
//     type: Function,
//     required: true
//   },
//   onClickEditBtn_: {
//     type: Function,
//     required: true
//   }
// });

// function onClickBackBtn() {
//   props.onClickBackBtn_();
// }
// function onClickEditBtn(id: string) {
//   props.onClickEditBtn_(id);
// }
onMounted(() => {
  logger.debug('mounted viewRead');
  const state = history.state as any;
  logger.debug(state.testValue); // 'ssss11'
});
onUnmounted(() => {
  logger.debug('unmounted viewRead');
});
</script>
