<template>
  <subHeader :title="exhbtDtl.title || ''" />
  <main id="main" class="main" v-if="!isOnMounted">
    <div class="container exhibition_detail">
      <div class="thumb_img">
        <img :src="exhbtDtl.imageUrl" :alt="`${exhbtDtl.title}이미지`" />
      </div>
      <template v-if="exhbtDtl.prdList.length > 0">
        <ul class="product_item_list">
          <li v-for="(item, index) in exhbtDtl.prdList" :key="index">
            <button :aria-label="`${item.trvlPrdNm}`" type="button" @click="goPrdDetail(item.trvlPrdId)">
              <div class="img_area">
                <img :src="item.imageUrl" :alt="`${item.trvlPrdNm}이미지`" />
              </div>
              <uu-badge
                v-if="item.prdStaCd !== PrdStatus.READY"
                class="pause_badge"
                badge-color="black"
                :label="item.prdStaNm || ''"
              />
              <div class="product_info">
                <div class="badge_area">
                  <span class="product_badge" v-for="(category, idx) in item.categoryList" :key="idx">{{
                    category.categoryName || ''
                  }}</span>
                </div>
                <div class="product_tit">
                  {{ item.trvlPrdNm }}
                </div>
                <div class="price_list">
                  <template v-if="item.dcPrice > 0 && item.dcPrice !== item.prdPrice">
                    <span>할인가</span>
                    <div class="price_wrap">
                      <span class="underline_price">{{ getPriceText(item.prdPrice) }}원</span>
                    </div>
                    <div class="price_wrap">
                      <span class="price">{{ getPriceText(item?.dcPrice) }}</span
                      >원
                    </div>
                  </template>
                  <div v-else class="price_wrap">
                    <span class="price">{{ getPriceText(item.prdPrice) }}</span
                    >원
                  </div>
                </div>
                <div class="mileage_area" v-if="item.dcAcmtPhrsCtt">
                  <uu-ic v-bind="{ name: 'mileage', size: '16' }" />
                  <span>{{ item.dcAcmtPhrsCtt }}</span>
                </div>
              </div>
            </button>
          </li>
        </ul>
      </template>
      <no-reseult-component v-else />
    </div>
  </main>
</template>
<script setup lang="ts">
import NoReseultComponent from '@/views/travel/component/NoResultComponent.vue';

import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useTrvlExbhtStore } from '@/service/travel/exhibitionModule';
import { getPriceText } from '../travelUtils';
import { PrdStatus } from '@/service/travel/travelConsts';

const router = useRouter();
const exhbtStore = useTrvlExbhtStore();

const { exhbtDtl } = storeToRefs(exhbtStore);

const isOnMounted = ref(true);
const planId = ref('');

onMounted(async () => {
  planId.value = router.currentRoute.value.query['planId'] as string;
  await reqExhbtDtl();
  isOnMounted.value = false;
});

const reqExhbtDtl = async () => {
  await exhbtStore.reqExhbtDtl(planId.value);
};

const goPrdDetail = (trvlPrdId: string) => {
  router.push({ name: 'product-detail', query: { trvlPrdId: trvlPrdId } });
};
</script>
