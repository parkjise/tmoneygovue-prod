<!-- 
    결제하기>상품상세정보
    pubPath: tmoney/Transit/TIP05003.vue
    tmoney/Spa/DET/DET043_3.vue
    @author inu.jeong
 -->
<template>
  <round-box hide-title :padding="roundBoxPadding">
    <div class="detail_info">
      <div class="product">
        <div class="date">
          {{ formatDate(orderInfo.dAlcnInfo.alcnDt + orderInfo.dAlcnInfo.atlDeprTime, 'YYYY.MM.DD(dd) HH:mm') }}
        </div>
        <div class="product_name">{{ productDtl?.trvlPrdNm }}</div>
      </div>
      <Transition name="moreCont">
        <ul v-show="moreContent" class="ticket_info_list">
          <li v-if="!getIsTicketPrd">
            <div class="ticket_title">
              <uuIc size="16" name="location" />
              출발
            </div>
            <div class="ticket_content">{{ orderInfo.dAlcnInfo.deprTrmlNm }}</div>
          </li>
          <li>
            <div class="ticket_title">
              <uuIc size="16" name="fare" />
              금액
            </div>
            <div class="ticket_content">
              {{ getTotalPsngCount }}명
              <p class="price" tabindex="0" :aria-label="`${formatAmount(getTotalFee)}원`">
                <strong aria-hidden="true"> {{ formatAmount(getTotalFee) }} </strong>
                <span aria-hidden="true">원</span>
              </p>
            </div>
            <ul class="detail_list" v-for="satInfo in getCntSatsList" :key="satInfo.busTckKndCd">
              <li>
                <div class="list_tit">{{ `${satInfo.busTckKndNm} ${satInfo.busTckCnt}명` }}</div>
                <div class="price" tabindex="0" :aria-label="`${formatAmount(satInfo.fee * satInfo.busTckCnt)}원`">
                  <span class="medium" aria-hidden="true"> {{ formatAmount(satInfo.fee * satInfo.busTckCnt) }} </span>
                  <span aria-hidden="true">원</span>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </Transition>
      <uu-button @click="moreBtn" :aria-label="moreContent ? '접기' : '펼쳐보기'">
        <uu-ic v-if="moreContent" size="24" name="thickarrow" direction="left" />
        <uu-ic v-else size="24" name="thickarrow" direction="right" />
      </uu-button>
    </div>
  </round-box>
</template>
<script setup lang="ts">
import { useOrderStore } from '@/service/order/orderModule';
import { useProductStore } from '@/service/travel/productModule';
import { formatAmount } from '@/utils/amountUtils';
import { formatDate } from '@/utils/dateUtils';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import RoundBox from '@/components/layout/RoundBox.vue';

const orderStore = useOrderStore();
const { orderInfo, getTotalPsngCount, getTotalFee, getCntSatsList } = storeToRefs(orderStore);
const productStore = useProductStore();
const { productDtl, getIsTicketPrd } = storeToRefs(productStore);

const roundBoxPadding = ref('2rem 2rem 0.8rem');
const moreContent = ref(false);
const moreBtn = () => {
  moreContent.value = !moreContent.value;
};
</script>
