<template>
  <sub-header title="공공자전거 이용 안내" />
  <main id="main" class="main mor">
    <div class="container no_padding bg_white">
      <uu-tabs class="guide_tab" :tabIndex="tabIndex">
        <uu-tab title="따릉이">
          <uu-tabs class="depth2_tab use_tab" own-size-tab :tabIndex="seoulbikeTab">
            <uu-tab title="대여하기">
              <div class="how_use bike">
                <ol class="step">
                  <li>
                    <div class="img_area">
                      <img src="/assets/images/guide/ic_seoulbike_01.png" alt="" />
                    </div>
                    <div class="text_area">
                      <p class="num">01</p>
                      <p class="text">홈 화면에서 대여하기 버튼을 누르세요.</p>
                    </div>
                  </li>
                  <li>
                    <div class="img_area">
                      <img src="/assets/images/guide/ic_seoulbike_02.png" alt="" />
                    </div>
                    <div class="text_area">
                      <p class="num">02</p>
                      <p class="text">자전거 안장 아래에 장착된 장치 QR을 확인해주세요.</p>
                    </div>
                  </li>
                  <li>
                    <div class="img_area">
                      <img src="/assets/images/guide/ic_seoulbike_03.png" alt="" />
                    </div>
                    <div class="text_area">
                      <p class="num">03</p>
                      <p class="text">QR코드를 스캔해주세요.</p>
                    </div>
                  </li>
                  <li>
                    <div class="img_area">
                      <img src="/assets/images/guide/ic_seoulbike_04.png" alt="" />
                    </div>
                    <div class="text_area">
                      <p class="num">04</p>
                      <p class="text">따릉이 대여가 시작됩니다.</p>
                    </div>
                  </li>
                </ol>
              </div>
            </uu-tab>
            <uu-tab title="반납하기">
              <div class="how_use bike">
                <ol class="step">
                  <li>
                    <div class="img_area">
                      <img src="/assets/images/guide/ic_seoulbike_05.png" alt="" />
                    </div>
                    <div class="text_area">
                      <p class="num">01</p>
                      <p class="text">홈 화면에서 대여하기 버튼을 누르세요.</p>
                    </div>
                  </li>
                  <li>
                    <div class="img_area">
                      <img src="/assets/images/guide/ic_seoulbike_06.png" alt="" />
                    </div>
                    <div class="text_area">
                      <p class="num">02</p>
                      <p class="text">자전거 안장 아래에 장착된 장치 QR을 확인해주세요.</p>
                    </div>
                  </li>
                </ol>
              </div>
            </uu-tab>
            <uu-tab title="임시잠금하기">
              <div class="how_use bike">
                <ol class="step">
                  <li>
                    <div class="img_area">
                      <img src="/assets/images/guide/ic_seoulbike_05.png" alt="" />
                    </div>
                    <div class="text_area">
                      <p class="num">01</p>
                      <p class="text">잠금장치 레버를 끝까지 내려주세요.</p>
                    </div>
                  </li>
                </ol>
                <div class="ticket_notice">
                  <p class="title">
                    <uu-ic size="16" name="exclamation" />
                    임시잠금 시 대여소와 가까운 경우 임의장소에서도 반납될 수 있으나,반납은 반드시 따릉이 대여소에서
                    하셔야 합니다.
                  </p>
                </div>
              </div>
            </uu-tab>
          </uu-tabs>
        </uu-tab>
        <uu-tab title="타슈">
          <uu-tabs class="depth2_tab use_tab" own-size-tab :tabIndex="tashuTab">
            <uu-tab title="대여하기">
              <div class="how_use bike">
                <ol class="step">
                  <li>
                    <div class="img_area">
                      <img src="/assets/images/guide/ic_tashu_01.png" alt="" />
                    </div>
                    <div class="text_area">
                      <p class="num">01</p>
                      <p class="text">홈 화면에서 대여하기 버튼을 누르세요.</p>
                    </div>
                  </li>
                  <li>
                    <div class="img_area">
                      <img src="/assets/images/guide/ic_tashu_02.png" alt="" />
                    </div>
                    <div class="text_area">
                      <p class="num">02</p>
                      <p class="text">자전거 안장 아래에 장착된 장치 QR을 확인해주세요.</p>
                    </div>
                  </li>
                  <li>
                    <div class="img_area">
                      <img src="/assets/images/guide/ic_tashu_03.png" alt="" />
                    </div>
                    <div class="text_area">
                      <p class="num">03</p>
                      <p class="text">QR코드를 스캔해주세요.</p>
                    </div>
                  </li>
                  <li class="top">
                    <div class="img_area">
                      <img src="/assets/images/guide/ic_tashu_04.png" alt="" />
                    </div>
                    <div class="text_area">
                      <p class="num">04</p>
                      <p class="text">
                        대여 시작 메세지와 함께 자전거와 잠금이 해제돼요.<br />
                        자전거와 잠금이 해제되지 않았다면 바퀴를 살짝 움직여 걸린 부분이 없는지 확인해주세요.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </uu-tab>
            <uu-tab title="반납하기">
              <div class="how_use bike">
                <ol class="step">
                  <li>
                    <div class="img_area">
                      <img src="/assets/images/guide/ic_tashu_05.png" alt="" />
                    </div>
                    <div class="text_area">
                      <p class="num">01</p>
                      <p class="text">잠금장치 레버를 끝까지 내려주세요.</p>
                    </div>
                  </li>
                  <li>
                    <div class="img_area">
                      <img src="/assets/images/guide/ic_tashu_06.png" alt="" />
                    </div>
                    <div class="text_area">
                      <p class="num">02</p>
                      <p class="text">반납완료 안내음성이 재생되고 전송된 반납 메세지를 확인해 주세요.</p>
                    </div>
                  </li>
                </ol>
                <div class="return">
                  <h4>대여소에 반납이 안되었나요?</h4>
                  <div class="img_area">
                    <img src="/assets/images/guide/ic_tashu_07.png" alt="" />
                  </div>
                  <p>
                    앱에서도 반납을 할 수 있어요.<br />
                    “앱에서 반납” 버튼을 눌러서 처리가 가능해요.
                  </p>
                </div>
              </div>
            </uu-tab>
            <uu-tab title="임시잠금하기">
              <div class="how_use bike">
                <ol class="step">
                  <li class="top">
                    <div class="img_area">
                      <img src="/assets/images/guide/ic_tashu_05.png" alt="" />
                    </div>
                    <div class="text_area">
                      <p class="num">01</p>
                      <p class="text">
                        자전거의 잠금장치를 잠가주세요.<br />
                        다시 이용하고 싶을 때 앱에서 자가잠금 해제 버튼을 누르면 잠금이 해제되고 자전거를 재이용할 수
                        있어요.
                      </p>
                    </div>
                  </li>
                </ol>
                <div class="ticket_notice">
                  <p class="title">
                    <uu-ic size="16" name="exclamation" />
                    임시잠금 시 대여소와 가까운 경우 임의장소에서도 반납될 수 있으나,반납은 반드시 따릉이 대여소에서
                    하셔야 합니다.
                  </p>
                </div>
              </div>
            </uu-tab>
          </uu-tabs>
        </uu-tab>
      </uu-tabs>
    </div>
  </main>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const tabIndex = ref(0);
const seoulbikeTab = ref(0);
const tashuTab = ref(0);
const subTabs = [seoulbikeTab, tashuTab];

const categoryMap = new Map([
  ['seoulbike', 0],
  ['tashu', 1]
]);

const subCategory = [
  ['rental', 'return', 'lock'],
  ['rental', 'return', 'lock']
];
onMounted(async () => {
  const tab = route.query.category as string;
  const subTab = route.query.subCategory as string;
  tabIndex.value = categoryMap.get(tab) ?? 0;
  if (subTab) {
    const subTabIndex = subCategory[tabIndex.value].indexOf(subTab);
    subTabs[tabIndex.value].value = subTabIndex === -1 ? 0 : subTabIndex;
  }
});
</script>
