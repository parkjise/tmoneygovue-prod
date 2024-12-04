<template>
  <subHeader title="킥보드/전기자전거 사고/고장 신고" />
  <main id="main" class="main mor">
    <div class="container">
      <round-box class="center_notice_box" hide-title>
        <img src="/assets/images/ic/ic_headset.png" alt="고객센터 로고" role="presentation"/>
        <p class="txt">
          전동킥보드 및 전기자전거<br />
          서비스 관련 사고/고장 신고는<br />
          서비스 운영사 고객센터로 접수 바랍니다
        </p>
      </round-box>
      <p class="info_txt">
        티머니GO는 서비스 중개 플랫폼으로 결제/환불 관련 문의는 티머니GO로 연락해주시기 바라며, 서비스 관련 의무와
        책임은 각 운영사에 있음을 알려드립니다.
      </p>
      <ul class="call_center_list">
        <li>
          <button type="button" @click="onClickMoveURLPage(XING)">
            <img src="/assets/images/ic/ic_ssingssing.svg" alt="씽씽 로고" role="presentation" />
            <div>
              <div class="brand">씽씽</div>
              <div class="center_info">상담원 채팅 접수</div>
            </div>
            <uu-ic name="chat" size="24" />
          </button>
        </li>
        <li>
          <a href="tel:1833-5748" title="지쿠 고객센터 연결">
            <img src="/assets/images/ic/ic_gqoo.svg" alt="지쿠 로고" role="presentation"/>
            <div>
              <div class="brand">지쿠</div>
              <div class="center_info">1833-5748</div>
            </div>
            <uu-ic name="call" size="24" />
          </a>
        </li>
        <li>
          <button type="button" @click="onClickMoveURLPage(KICKGOING)">
            <img src="/assets/images/ic/ic_kickgoing.svg" alt="킥고잉 로고" role="presentation"/>
            <div>
              <div class="brand">킥고잉</div>
              <div class="center_info">상담원 채팅 접수</div>
            </div>
            <uu-ic name="chat" size="24" />
          </button>
        </li>
        <li>
          <button type="button" @click="onClickMoveURLPage(SOCAR)">
            <img src="/assets/images/ic/ic_socar.svg" alt="쏘카일레클 로고" role="presentation" />
            <div>
              <div class="brand">쏘카일레클</div>
              <div class="center_info">상담원 채팅 접수</div>
            </div>
            <uu-ic name="chat" size="24" />
          </button>
        </li>
        <!-- 240801 현업에서 미노출 요청. 해당서비스 오픈이 지연되어 임시 미노출 처리. -->
        <li>
          <button type="button" @click="onClickMoveURLPage(BEAM)">
            <object :data="imageBasePath + '/assets/images/ic/ic_beam.svg'" />
            <div>
              <div class="brand">빔</div>
              <div class="center_info">상담원 채팅 접수</div>
            </div>
            <uu-ic name="chat" size="24" />
          </button>
        </li>
        <!-- 스윙의 경우 계약 및 개발 이슈로 7월 배포 버전에서는 제외 (Beam 업체가 추가될 예정으로 디자인 추가)
          <li>
            <button type="button">
              <img src="/assets/images/ic/ic_swing.svg" alt="" />
              <div>
                <div class="brand">스윙</div>
                <div class="center_info">상담원 채팅 접수</div>
              </div>
              <uu-ic name="chat" size="24" />
            </button>
          </li> 
        -->
        <!-- // [240523] 현행화 리스트 추가 -->
      </ul>
      <div class="ticket_notice">
        <p class="title">
          <uu-ic size="16" name="exclamation_gray090" />
          유의사항
        </p>
        <ul>
          <li>사고 발생 시, 상황을 명확히 확인할 수 있도록 상세한 사진기록을 남겨주세요.</li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { getAppBridge } from '@/utils';

const SOCAR =
  'https://webchat.thecloudgate.io/webChat?brandKey=20230216073247FUS5F4ytLM6vR7Rtk7CkmQ&channelType=scenario&scenarioId=MzExOQ%3D%3D&ridingId=&userId=';
const KICKGOING = 'https://kickgoing.channel.io/home';
const BEAM = 'http://pf.kakao.com/_dLAxeK';
const XING = 'http://pf.kakao.com/_BJpYj';
const imageBasePath = import.meta.env.VITE_IMAGE_BASE_PATH;

// 외부브라우저 이동
const onClickMoveURLPage = async (url: string) => {
  const appBridge = await getAppBridge();
  await appBridge.openView({
    url: url,
    viewType: 'ex'
  });
};
</script>
