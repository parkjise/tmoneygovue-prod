<template>
  <common-modal
    ref="evtPopupRef"
    v-model="evtPopup"
    type="confirm"
    hide-header
    full-content
    @ok="stopWatching"
    @close="emit('close')"
  >
    <template #modal_body>
      <uu-swiper type="custom" :options="swiperOptions" navi-pagination class="event_slide">
        <swiper-slide v-for="(item, index) in props.list" :key="index">
          <div class="swiper_inner">
            <a :href="item.mvmnPathVal">
              <img :src="item.advrImgPathVal" :alt="`${item.advrImgCtt} 이미지 총 ${props.list.length}장의 슬라이드 중 ${index+1}번 슬라이드`" />
            </a>
          </div>
        </swiper-slide>
      </uu-swiper>
    </template>
    <template #modal_footer="btnActions">
      <uu-button
        class="stop-today"
        btn-color="primary"
        btn-style="line"
        :label="'오늘 그만보기'"
        :aria-label="'오늘 그만보기'"
        @click="btnActions.ok"
      />
      <uu-button class="close-popup" btn-color="primary" :label="'닫기'" :aria-label="'닫기'" @click="btnActions.close" />
    </template>
  </common-modal>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { SwiperSlide } from 'swiper/vue';
import { formatDate } from '@/utils/dateUtils';
import type { AdvrData } from '@/service/travel/model/introModel';
import { LocalStorageKey } from '@/utils/constants/globalConstants';
import { swiperOptions } from '@/service/travel/travelConsts';
import CommonModal from '@/views/common/components/CommonModal.vue';

interface Prop {
  isShow: boolean;
  list: AdvrData[];
}

const props = defineProps<Prop>();
const emit = defineEmits(['close']);

const evtPopupRef = ref();
const evtPopup = ref(false);


onMounted(() => {
  watch(
    () => props.isShow,
    () => {
      evtPopup.value = props.isShow;
    }
  );
});



// 오늘 그만보기
const stopWatching = () => {
  localStorage.setItem(LocalStorageKey.STOP_EVT_POPUP, JSON.stringify({ date: formatDate(), value: true }));
  emit('close');
};
</script>
