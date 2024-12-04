<template>
  <round-box :hide-title="tmoneyCardList.length == 0" title="등록 카드">
    <div class="tmoney_regist" :class="{ no_data: tmoneyCardList.length == 0 }">
      <div v-if="tmoneyCardList.length == 0 && isShowInit">
        <uu-ic size="48" name="exclamation" />
        <span class="title"> 등록된 카드가 없습니다. </span>
      </div>

      <ul class="member_list" v-if="tmoneyCardList.length != 0 && isShowInit">
        <li v-for="item in tmoneyCardList" :key="item.trcrSno">
          <p class="title">
            <uu-ic size="20" name="tmoney" />
            {{ item.trcrNo }}
          </p>
          <uu-button btn-style="line" label="삭제" @click="deleteTmoneyCard(item)" />
        </li>
      </ul>
    </div>
  </round-box>
  <!-- 카드 삭제 팝업 -->
  <DeleteTrafficCreditCardPopup
    :isShowPopup="isShowPopup"
    :item="selectedItem"
    @ok="deleteOkCallback"
    @close="isShowPopup = false"
  />
</template>

<script setup lang="ts">
import DeleteTrafficCreditCardPopup from './DeleteTrafficCreditCardPopup.vue';
import { onMounted, computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRegistTrafficCardStore } from '@/service/regist-traffic-card/registTrafficCardModule';
import type { RefundCardInfoModel } from '@/service/regist-traffic-card/model/registTrafficCardModel';
import { getAppBridge } from '@/utils';
import { AdbrixEvtId } from '@/utils/hybrid/type';
import { sendAdbrix } from '@/utils/sendAdbrixUtil';

const registTrafficCardStore = useRegistTrafficCardStore();
const { getRegisteredTrafficCardList } = storeToRefs(registTrafficCardStore);

const tmoneyCardList = computed(() => getRegisteredTrafficCardList.value);
const isShowPopup = ref(false);
const selectedItem = ref<RefundCardInfoModel>({} as RefundCardInfoModel);
const isShowInit = ref(false);

const emit = defineEmits(['ok', 'listCallback']);
const props = defineProps({ callTmoneyList: { type: Boolean, default: false } });

onMounted(() => registeredTrafficTmoneyCardApi());

// 등록된 티머니 카드 목록
const registeredTrafficTmoneyCardApi = async () => {
  isShowInit.value = false;
  registTrafficCardStore.initRegisteredCreditCardList();
  await registTrafficCardStore.requestRegisteredTrafficCardList('1');
  isShowInit.value = true;
};

const deleteTmoneyCard = async (item: RefundCardInfoModel) => {
  selectedItem.value = item;
  isShowPopup.value = true;
};

// 티머니 카드 삭제
const deleteOkCallback = async () => {
  isShowPopup.value = false;
  if (selectedItem.value) {
    const res = await registTrafficCardStore.requestRemoveCardNo(selectedItem.value.trcrSno);
    if (res === 'Y') {
      emit('ok');
      registeredTrafficTmoneyCardApi();
      // toast 교통카드가 삭제되었습니다.
      const appBridge = await getAppBridge();
      await appBridge.showToast({ message: `교통카드가 삭제되었습니다.` });
      sendAdbrix(AdbrixEvtId.dTmoney);
    }
  }
};

watch(
  () => props.callTmoneyList,
  () => {
    if (props.callTmoneyList) {
      registeredTrafficTmoneyCardApi();
      emit('listCallback');
    }
  }
);
</script>
