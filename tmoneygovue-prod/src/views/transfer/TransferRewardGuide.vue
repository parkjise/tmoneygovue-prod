<template>
  <sub-header title="환승리워드 안내" />
  <main id="main" class="main mor" v-if="isInit">
    <div class="container bg_white no_padding">
      <div class="transfer_reward_notice">
        <img :src="guideInfo.trtdGdImgPathVal" height="100%" width="100%" alt="임시 이미지" />
        <uu-button size="xl" btn-color="secondary" href="/customer-support/faq">
          더 알아보기
          <uu-ic size="16" name="arrow_primary" />
        </uu-button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useTransferStore } from '@/service/transfer/transferModule';
import { formatDate, getToday } from '@/utils/dateUtils';
import { storeToRefs } from 'pinia';
import { onMounted, computed, ref } from 'vue';

const transferStore = useTransferStore();
const { gettransferGuideInfo } = storeToRefs(transferStore);

const guideInfo = computed(() => gettransferGuideInfo.value);
const isInit = ref(false);

onMounted(async () => {
  await transferStore.requestTransferGuide(formatDate(getToday(), 'YYYYMMDDHHmmss'));
  isInit.value = true;
});
</script>
