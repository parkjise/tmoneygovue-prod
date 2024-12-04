<template>
  <div v-for="item in webviewScrnMaster" :key="item.scrnId">
    <!-- 이미지-->
    <template v-if="item.scrnMrkDvsCd === 'I'">
      <a v-if="item.imgUrlAddr" :href="item.imgUrlAddr" style="display: flex">
        <img
          :src="`${getEventDetailInfo.imgLinkUrl}${item.imgPathVal}`"
          :alt="item.scrnNm"
          style="width: 100%; height: 100%; display: block"
        />
      </a>
      <img
        v-else
        :src="`${getEventDetailInfo.imgLinkUrl}${item.imgPathVal}`"
        :alt="item.scrnNm"
        style="width: 100%; height: 100%; display: block"
      />
    </template>
    <!-- 텍스트-->
    <template v-else-if="item.scrnMrkDvsCd === 'T'">
      <div style="position: relative; display: flex">
        <a v-if="item.imgUrlAddr" :href="item.imgUrlAddr" style="display: flex">
          <img
            :src="`${getEventDetailInfo.imgLinkUrl}${item.imgPathVal}`"
            :alt="item.scrnNm"
            style="width: 100%; height: 100%"
          />
        </a>
        <div style="position: absolute; top: 0%; width: 100%; padding: 10px">{{ item.blthCtt }}</div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useEventStore } from '@/service/event/eventModule';
import { storeToRefs } from 'pinia';

const eventStore = useEventStore();
const { getEventDetailInfo } = storeToRefs(eventStore);

const webviewScrnMaster = computed(() => {
  return getEventDetailInfo.value.webviewScrnMaster;
});
</script>
