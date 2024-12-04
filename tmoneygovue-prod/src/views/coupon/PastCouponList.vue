<template>
  <sub-header title="지난 쿠폰" right-content> </sub-header>
  <main id="main" class="main mor">
    <div class="container no_padding">
      <div class="coupon last_coupon">
        <uu-tabs
          class="depth2_tab"
          v-model="category"
          align-tabs="center"
          @selected="selectTab"
          tabClass="pastCoupon"
          stacked
        >
          <uu-tab v-for="(item, i) in categories" :key="i" :title="item.text"> </uu-tab>
          <div v-if="pastCouponList.length <= 0" class="no_data">
            <uu-ic size="48" name="exclamation" />
            <p>지난 쿠폰이 없습니다.</p>
          </div>
          <div v-else class="coupon_list">
            <PastCouponListView :items="pastCouponList" />
          </div>
        </uu-tabs>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';

import { useCouponStore } from '@/service/coupon/couponModule';
import PastCouponListView from '@/views/coupon/component/PastCouponListView.vue';
import { storeToRefs } from 'pinia';

const couponListStore = useCouponStore();
const { getPastCouponList } = storeToRefs(couponListStore);

const pastCouponList = computed(() => {
  window.scrollTo({
    top: 0,
    behavior: 'instant'
  });

  if (category.value !== 'A') {
    return getPastCouponList.value.filter((value) => value.cpnStaCd === category.value);
  } else {
    return getPastCouponList.value;
  }
});

const category = ref('A');

const selectTab = (tab: number) => {
  category.value = categories[tab].value;
};

const categories = reactive([
  {
    text: '전체',
    value: 'A'
  },
  {
    text: '사용',
    value: 'U'
  },
  {
    text: '만료',
    value: 'E'
  },
  {
    text: '선물',
    value: 'G'
  }
]);

onMounted(async () => {
  await couponListStore.actionPastCouponList();
});
</script>
