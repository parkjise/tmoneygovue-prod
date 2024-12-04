<template>
  <sub-header :title="'본인인증 실패'" :hide-title="true" :bg-color="'#F4F4F4'" :click-callback="close" />
  <main class="main verification">
    <div class="container bottom_btns pt12">
      <div class="join_fail">
        <p class="img_area">
          <img src="/assets/images/invite_friends/invite_img_05.svg" alt="결제실패 티머니 캐릭터" />
        </p>
        <div class="verification_txt">
          <p class="b_txt">본인인증에 실패하였습니다.</p>
          <p class="s_txt">입력하신 정보가 올바른지 다시 한번 확인해 주세요.</p>
        </div>
      </div>
      <div class="btn_area">
        <uu-button
          :size="'xl'"
          :btn-color="'primary'"
          :label="'첫 화면으로 이동하기'"
          @click="close"
        />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import subHeader from '@/components/layout/SubHeader.vue'
import { onMounted } from 'vue'
import UuButton from '@/components/uu-components/UuButton.vue'
import router from '@/router'

// 근데 여기서 말하는 첫화면이 어디인지 아직 모름
// todo 수정필요
const close = async () => {
  router.replace({ path: '/verification' })
}

onMounted(() => {})
</script>
