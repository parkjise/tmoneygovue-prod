<template>
  <round-box hide-title>
    <ul class="mileage_top">
      <li class="left_name">
        <p>친구 초대로 획득한</p>
        <h4>
          <span class="user_name">{{ getMbrNm }}</span
          >님의
          <span>마일리지</span>
        </h4>
      </li>
      <li class="right_num">
        <h3>
          <svg role="img" aria-labelledby="svgTitle1">
            <title id="svgTitle1">{{ formatAmount(getMileage) }}</title>
            <text x="105" y="28" class="text_bottom">{{ formatAmount(getMileage) }}</text>
            <text x="105" y="23" class="text_bottom">{{ formatAmount(getMileage) }}</text>
            <text x="105" y="23">{{ formatAmount(getMileage) }}</text>
          </svg>
          <span class="num_m">
            <svg role="img" aria-labelledby="svgTitle2">
              <title id="svgTitle2">마일리지</title>
              <text x="9.5" y="19" class="text_bottom">M</text>
              <text x="9.5" y="15" class="text_bottom">M</text>
              <text x="9.5" y="15">M</text>
            </svg>
          </span>
        </h3>
      </li>
    </ul>
    <ul class="check_bottom">
      <li>
        <p>친구 초대 성공 횟수</p>
        <div class="count_badge">
          {{ Number(getInvnScsCnt) > 0 ? getInvnScsCnt : '아직 초대 성공 횟수가 없어요' }}
        </div>
      </li>
      <li>
        <p>친구의 쿠폰 사용 횟수</p>
        <div class="count_badge">{{ Number(getCpnUseCnt) > 0 ? getCpnUseCnt : '아직 이용한 친구가 없어요' }}</div>
      </li>
    </ul>
  </round-box>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/service/auth/authModule';
import { useInvnStore } from '@/service/invite-friend/inviteModule';
import { formatAmount } from '@/utils/amountUtils';
import { storeToRefs } from 'pinia';

const { getMbrNm } = storeToRefs(useAuthStore());
const { getMileage, getInvnScsCnt, getCpnUseCnt } = storeToRefs(useInvnStore());
</script>
