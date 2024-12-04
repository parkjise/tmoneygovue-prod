<template>
  <sub-header title="환승리워드 내역" />
  <main id="main" class="main mor">
    <div class="container bottom_btns">
      <div class="transfer_reward" v-if="transferList.length != 0">
        <round-box hide-title v-for="(item, i) in transferList" :key="i">
          <ul>
            <li>
              <p class="category">이용날짜</p>
              <p class="num">{{ item.trtdDt }}</p>
            </li>
            <li>
              <p class="category">리워드</p>
              <p class="num">{{ item.trtdAmt }}</p>
            </li>
          </ul>
          <p class="status">{{ item.trtdRstNm }}</p>
          <div ref="loadMoreRef" v-if="!isLast"></div>
        </round-box>
      </div>

      <div class="transfer_reward" v-else>
        <!-- 환승 내역이 없을 경우 -->
        <div class="no_data">
          <uu-ic size="48" name="exclamation" />
          <p>환승 내역이 존재하지 않습니다.</p>
        </div>
        <!-- // 환승 내역이 없을 경우 -->
      </div>

      <div class="btn_area has_info">
        <p class="info">
          <uu-ic size="16" name="exclamation" />
          교통수단 이용 후 2일 뒤에 마일리지로 지급됩니다.
        </p>
        <uu-button size="xl" btn-color="primary" label="문의하기" href="/transfer-reward/transfer-inquiry" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useTransferStore } from '@/service/transfer/transferModule';
import { onMounted, computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useIntersectionObserver } from '@vueuse/core';

const transferStore = useTransferStore();
const { getTransferHistoryList, isLast } = storeToRefs(transferStore);

const transferList = computed(() => getTransferHistoryList.value);
const pageNo = ref(1);
const loadMoreRef = ref(null); // 더보기

onMounted(() => transferDiscountHistoryApi(false));

const transferDiscountHistoryApi = async (isMore: boolean) => {
  if (!isMore) window.scrollTo({ top: 0 });
  pageNo.value = isMore ? pageNo.value + 1 : 1;

  await transferStore.requestTransferDiscountHistory(pageNo.value, isMore);
};

/**
 * @description 환승리워드 내역 스크롤 더보기 옵저버
 */
let mileageHistoryListObserver = useIntersectionObserver(
  loadMoreRef,
  ([{ isIntersecting }]) => {
    if (!isIntersecting || isLast.value) return;
    transferDiscountHistoryApi(true);
  },
  { threshold: 0.5 }
);
</script>
