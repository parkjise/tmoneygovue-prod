<template>
  <subHeader title="친구초대" />
  <main id="main" class="invite_container">
    <!-- 이미지 영역 -->
    <div class="invite_intro">
      <ul>
        <li class="title_text">
          <img
            src="/assets/images/invite_promotion/img_intro_title.svg"
            alt="Tmoney GO 우정 & 혜택 모두 챙겨갈 친구들 모여라! 친구따라 티머니GO!"
            aria-label="Tmoney GO 우정 & 혜택 모두 챙겨갈 친구들 모여라! 친구따라 티머니GO!"
          />
        </li>
        <li class="title_deco_float">
          <img src="/assets/images/invite_promotion/img_intro_deco_bbik_air.svg" />
        </li>
        <li class="title_deco_img">
          <img src="/assets/images/invite_promotion/img_intro_deco_bbik_bottom.svg" />
        </li>
      </ul>
    </div>
    <div class="invite_content">
      <!-- 혜택 모아보기 -->
      <invite-friend-benefit />
      <!-- 획득 마일리지 -->
      <invite-friend-mileage />
      <!-- 초대 방법 -->
      <invite-friend-guide />
      <!-- 프로모션 초대코드 -->
      <invite-friend-code />
    </div>
    <!-- 프로모션 유의사항 -->
    <invite-friend-note />
    <!-- 안드로이드 백키 처리 -->
    <input type="hidden" id="invite_friend_ipt" @click="router.go(-1)" />
  </main>
</template>
<script setup lang="ts">
import InviteFriendBenefit from './component/InviteFriendBenefit.vue';
import InviteFriendMileage from './component/InviteFriendMileage.vue';
import InviteFriendGuide from './component/InviteFriendGuide.vue';
import InviteFriendCode from './component/InviteFriendCode.vue';
import InviteFriendNote from './component/InviteFriendNote.vue';

import { useInvnStore } from '@/service/invite-friend/inviteModule';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const invnStore = useInvnStore();
const router = useRouter();

onMounted(async () => {
  await invnStore.inqrFrndInvnScrnInfo();
});
</script>
