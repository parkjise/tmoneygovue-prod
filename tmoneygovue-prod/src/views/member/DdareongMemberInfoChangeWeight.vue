<template>
  <sub-header title="체중변경" bg-color="#F4F4F4" />
  <main id="main" class="main mor">
    <div class="container bottom_btns">
      <div class="user_bike_change">
        <round-box hide-title>
          <form class="kg_area">
            <uu-input v-model="weight" label="체중" :placeholder="getDdareongWeight" />
            <p>kg</p>
          </form>
        </round-box>
        <div class="ticket_notice">
          <p class="title">
            <uu-ic size="16" name="exclamation_gray090" />
            운동량 계산을 위해 필요한 정보입니다.<br />
            미입력 시 65kg으로 계산됩니다.
          </p>
        </div>
      </div>
      <div class="btn_area">
        <uu-button size="xl" btn-color="primary" :disabled="isDisabled" label="확인" @Click="changePW" />
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useMemberStore } from '@/service/member/memberModule';
import { useMessageModal } from '@/composables/useMessageModal';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router = useRouter();
const memberStore = useMemberStore();
const { getDdareongWeight } = storeToRefs(memberStore);
const { createNotificationModal } = useMessageModal();

const weight = ref(''); // 체중

// 확인 버튼 활성화/비활성화
const isDisabled = computed(() => {
  return getDdareongWeight.value === weight.value || !weight.value;
});

// 체중 변경
const changePW = async () => {
  const res = await memberStore.changeDdareongWeight(weight.value);
  if (res.scsYn === 'Y') {
    createNotificationModal('회원정보 변경', '체중이 변경되었습니다.', () => goMemberStatPage());
  } else {
    createNotificationModal('알림', '체중 변경을 실패했습니다.');
  }
};

const goMemberStatPage = () => {
  router.back();
};
</script>
