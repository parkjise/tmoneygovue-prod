<template>
  <sub-header title="전기자전거 이용 안내" />
  <main id="main" class="main mor">
    <div class="container no_padding bg_white">
      <!-- <uu-tabs class="guide_tab" :tabIndex="tabIndex">
        <uu-tab title="지쿠">
          <uu-tabs class="depth2_tab use_tab" own-size-tab :tabIndex="gqooTab">
            <uu-tab title="이용하기">
              <div class="how_use bike">
                <ol class="step">
                  <li>
                    <div class="img_area">
                      <img src="/assets/images/guide/ic_gqoo_01.png" alt="" />
                    </div>
                    <div class="text_area">
                      <p class="num">01</p>
                      <p class="text">홈 화면에서 대여하기 버튼을 누르세요.</p>
                    </div>
                  </li>
                  <li>
                    <div class="img_area">
                      <img src="/assets/images/guide/ic_gqoo_02.png" alt="" />
                    </div>
                    <div class="text_area">
                      <p class="num">02</p>
                      <p class="text">지쿠 QR코드를 스캔해주세요.</p>
                    </div>
                  </li>
                  <li>
                    <div class="img_area">
                      <img src="/assets/images/guide/ic_gqoo_03.png" alt="" />
                    </div>
                    <div class="text_area">
                      <p class="num">03</p>
                      <p class="text">올바른 장소에 주차해 주세요.</p>
                    </div>
                  </li>
                  <li>
                    <div class="img_area">
                      <img src="/assets/images/guide/ic_gqoo_04.png" alt="" />
                    </div>
                    <div class="text_area">
                      <p class="num">04</p>
                      <p class="text">주차 종료 후 주차 사진을 촬영하여 반납을 완료합니다.</p>
                    </div>
                  </li>
                </ol>
              </div>
            </uu-tab>
            <uu-tab title="올바른 주차/견인구역">
              <div class="how_use bike">
                <div class="correct_parking">
                  <div class="img_area">
                    <img src="/assets/images/guide/ic_correct_parking.png" alt="" />
                  </div>
                  <p>
                    건물의 외벽 및 담장, 인도 가장거리, 가로수 옆,<br />
                    자전거 거치대 주변 등 올바르게 주차해 주세요. 전동킥보드는 견인구역 주차 시,<br />
                    지자체로부터 <span>견인료가 부과</span>될 수 있으니 유의해 주세요.
                  </p>
                  <p>
                    <span>서비스 외 지역 및 주차금지 구역</span>에서 주행은 가능하지만 반납하시는
                    경우 <span>패널티 요금이 부과</span>될 수 있습니다.
                  </p>
                </div>
              </div>
            </uu-tab>
          </uu-tabs>
        </uu-tab>
        <uu-tab title="킥고잉">
          <uu-tabs class="depth2_tab use_tab" own-size-tab :tabIndex="kickgoingTab">
            <uu-tab title="대여하기">
              <div class="how_use bike">
                <ol class="step">
                  <li>
                    <div class="img_area">
                      <img src="/assets/images/guide/ic_kick_01.png" alt="" />
                    </div>
                    <div class="text_area">
                      <p class="num">01</p>
                      <p class="text">홈 화면에서 대여하기 버튼을 누르세요.</p>
                    </div>
                  </li>
                  <li>
                    <div class="img_area">
                      <img src="/assets/images/guide/ic_kick_02.png" alt="" />
                    </div>
                    <div class="text_area">
                      <p class="num">02</p>
                      <p class="text">
                        휴대폰 거치대 혹은 뒷바퀴에 있는 킥고잉 QR코드를 스캔해주세요.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div class="img_area">
                      <img src="/assets/images/guide/ic_kick_03.png" alt="" />
                    </div>
                    <div class="text_area">
                      <p class="num">03</p>
                      <p class="text">패달을 밟으면 가속됩니다.</p>
                    </div>
                  </li>
                </ol>
              </div>
            </uu-tab>
            <uu-tab title="임시잠금하기">
              <div class="how_use bike">
                <ol class="step">
                  <li class="top">
                    <div class="img_area">
                      <img src="/assets/images/guide/ic_kick_04.png" alt="" />
                    </div>
                    <div class="text_area">
                      <p class="num">01</p>
                      <p class="text">
                        자전거의 잠금장치를 잠가주세요.<br />
                        다시 이용하고 싶을 때 앱에서 자가잠금 해제 버튼을 누르면 잠금이 해제되고
                        자전거를 재이용할 수 있어요.
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
                      <img src="/assets/images/guide/ic_kick_05.png" alt="" />
                    </div>
                    <div class="text_area">
                      <p class="num">01</p>
                      <p class="text">
                        보행자와 자동차의 길을 막지 않도록 인도 가장자리에 주차해 주세요.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div class="img_area">
                      <img src="/assets/images/guide/ic_kick_06.png" alt="" />
                    </div>
                    <div class="text_area">
                      <p class="num">02</p>
                      <p class="text">
                        자전거 뒷바퀴의 잠금장치를 잠그고 앱에서 반납하기를 눌러주세요.
                      </p>
                    </div>
                    <div class="warning">
                      <uu-ic size="24" name="warning" />
                      <p>
                        잠금장치를 잠그면 일시정지 상태가 됩니다.<br />
                        꼭 앱에서 반납하기를 눌러주세요.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div class="img_area">
                      <img src="/assets/images/guide/ic_kick_07.png" alt="" />
                    </div>
                    <div class="text_area">
                      <p class="num">03</p>
                      <p class="text">
                        2시간 내 환승 시 잠금해제 무료! 자유롭게 환승이 가능합니다.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </uu-tab>
            <uu-tab title="주차금지지역/반납추가요금">
              <div class="how_use bike">
                <div class="correct_parking">
                  <div class="img_area">
                    <img src="/assets/images/guide/ic_correct_parking.png" alt="" />
                  </div>
                  <p>
                    매장 앞이나 좁은 골목(차도) 및 아파트 단지 등<br />
                    통행에 불편감을 줄 수 있는 장소는 주차를 삼가주세요.
                    <span>서비스 외 지역 및 주차금지 구역</span>에서<br />
                    주행은 가능하지만 반납하시는 경우<br />
                    <span>패널티 요금이 부과</span>될 수 있습니다.
                  </p>
                </div>
              </div>
            </uu-tab>
          </uu-tabs>
        </uu-tab>
        쏘카일레클
        <uu-tab title="쏘카일레클"> -->
      <uu-tabs class="depth2_tab guide_tab bg_gray" own-size-tab :tabIndex="socarTab">
        <uu-tab title="대여하기">
          <div class="how_use bike">
            <ol class="step">
              <li>
                <div class="img_area">
                  <img src="/assets/images/guide/ic_socar_elacle_01.png" alt="" />
                </div>
                <div class="text_area">
                  <p class="num">01</p>
                  <p class="text">앱 화면에서 대여하기 버튼을 누르세요.</p>
                </div>
              </li>
              <li>
                <div class="img_area">
                  <img src="/assets/images/guide/ic_socar_elacle_01_02.png" alt="" />
                </div>
                <div class="text_area">
                  <p class="num">02</p>
                  <p class="text">
                    자전거 디스플레이에 있는 QR코드를 스캔해 주시거나 자전거 번호로 대여를 눌러 직접
                    번호 입력을 해주세요.
                  </p>
                </div>
              </li>
              <li>
                <div class="img_area">
                  <img src="/assets/images/guide/ic_socar_elacle_01_03.png" alt="" />
                </div>
                <div class="text_area">
                  <p class="num">03</p>
                  <p class="text">앱 화면에서 대여 성공 메세지가 나타나면 이용이 시작돼요.</p>
                </div>
              </li>
            </ol>
          </div>
        </uu-tab>
        <uu-tab title="라이딩하기">
          <div class="how_use bike">
            <ol class="step">
              <li>
                <!-- <div class="step_header">3.0</div>
                    <div class="step_content">페달링 센서로 기어 없이 속도를 조절할 수 있어요.</div> -->
                <div class="img_area">
                  <img src="/assets/images/guide/ic_socar_elacle_02_01.png" alt="" />
                </div>
                <div class="text_area">
                  <p class="num">01</p>
                  <p class="text">
                    페달을 밟는 힘을 더 정밀하게 감지하는 스마트한 라이딩 시스템으로 페달을 세게
                    밟을수록 오르막을 더 쉽게 올라갈 수 있고 더욱 더 빠른 라이딩이 가능해요.
                  </p>
                </div>
              </li>
              <!-- <li>
                    <div class="step_header">플러스</div>
                    <div class="step_content">핸들 상단 디스플레이가 장착되어 있어요.</div>
                    <div class="img_area">
                      <img src="/assets/images/guide/ic_socar_elacle_02_02.png" alt="" />
                    </div>
                    <div class="text_area">
                      <p class="text">
                        디스플레이의 하단의 버튼을 눌러 속도를 조절하세요. 1-3단 순으로 속도가
                        빨라지며 A는 AUTO모드로 속도가 자동 조절돼요.
                      </p>
                    </div>
                  </li> -->
            </ol>
            <!-- <div class="lock_socar">
                  <h4>
                    라이딩 중 잠시 자리를 비워야 한다면<br />
                    일시 잠금 기능을 활용하세요
                  </h4>
                  <div class="img_area">
                    <img src="/assets/images/guide/ic_socar_elacle_02_03.png" alt="" />
                  </div>
                  <p>
                    이용 중 화면에서 [일시잠금]을 누르면 이용 중인 자전거 바퀴를 잠글 수 있어요.
                    일시잠금일 때도 1분당 이용 요금은 동일하게 부과돼요.
                  </p>
                </div> -->
          </div>
        </uu-tab>
        <uu-tab title="반납하기">
          <div class="how_use bike">
            <ol class="step">
              <li>
                <div class="img_area">
                  <img src="/assets/images/guide/ic_socar_elacle_03_01.png" alt="" />
                </div>
                <div class="text_area">
                  <p class="num">01</p>
                  <p class="text">
                    목적지가 지도상 반납 가능 구역인지 꼭 확인해주세요. 반납 불가 구역에 주차하는 경우 추가 요금이 부과돼요.
                  </p>
                </div>
              </li>
              <li class="aic">
                <div class="img_area">
                  <img src="/assets/images/guide/ic_socar_elacle_03_02.png" alt="" />
                </div>
                <div class="text_area">
                  <p class="num">02</p>
                  <p class="text">
                    탑승이 끝났다면, 앱에서 [반납하기] 버튼을 누르거나 디스플레이의 버튼을 5초간 꾹
                    눌러 반납을 완료해주세요.
                  </p>
                  <p>(일부 브랜드는 자전거 뒷바퀴의 잠금장치를 잠그고 반납해야 합니다.)</p>
                  <p>
                    ※ 통신 오류로 인해 반납이 지연될 수 있으니, 반납이 제대로 완료되었는지 꼭 확인해
                    주세요.
                  </p>
                </div>
              </li>
              <li>
                <div class="img_area">
                  <img src="/assets/images/guide/ic_socar_elacle_03_03.png" alt="" />
                </div>
                <div class="text_area">
                  <p class="num">03</p>
                  <p class="text">
                    반납이 완료되면 꼭 앱에서 정상 반납 확인과 함께 반납사진 촬영 및 결제를
                    완료해주세요.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </uu-tab>
        <uu-tab title="주차 유의사항">
          <div class="how_use bike">
            <ol class="step">
              <li>
                <div class="img_area">
                  <img src="/assets/images/guide/ic_socar_elacle_04_01.png" alt="" />
                </div>
                <div class="text_area">
                  <p class="num">01</p>
                  <p class="text">
                    보도블럭 아래 주차는 피해주세요. 차도면에 주차 시 추돌 사고 위험이 있어요.
                  </p>
                </div>
              </li>
              <li>
                <div class="img_area">
                  <img src="/assets/images/guide/ic_socar_elacle_04_02.png" alt="" />
                </div>
                <div class="text_area">
                  <p class="num">02</p>
                  <p class="text">
                    인도 혹은 자전거 도로 정가운데 및 횡단보도 입구에는 주차를 피해주세요. 사고
                    위험이 있어요.
                  </p>
                </div>
              </li>
              <li>
                <div class="img_area">
                  <img src="/assets/images/guide/ic_socar_elacle_04_03.png" alt="" />
                </div>
                <div class="text_area">
                  <p class="num">03</p>
                  <p class="text">
                    건물 출입구나 상점 입구 앞에는 개인 사유지예요. 주차를 피해주세요.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </uu-tab>
      </uu-tabs>
      <!-- </uu-tab>
      </uu-tabs> -->
    </div>
  </main>
  <!-- // main -->
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const tabIndex = ref(0)
const gqooTab = ref(0)
const kickgoingTab = ref(0)
const socarTab = ref(0)
const subTabs = [gqooTab, kickgoingTab, socarTab]

const categoryMap = new Map([
  ['gqoo', 0],
  ['kickgoing', 1],
  ['socarTab', 2]
])

const subCategory = [
  ['use', 'park'],
  ['rental', 'lock', 'return', 'fee']
]
onMounted(async () => {
  const tab = route.query.category as string
  const subTab = route.query.subCategory as string
  tabIndex.value = categoryMap.get(tab) ?? 0
  if (subTab) {
    const subTabIndex = subCategory[tabIndex.value].indexOf(subTab)
    subTabs[tabIndex.value].value = subTabIndex === -1 ? 0 : subTabIndex
  }
})
</script>

<style scoped>
.mor .container .how_use .step li.aic {
  align-items: center;
}
</style>
