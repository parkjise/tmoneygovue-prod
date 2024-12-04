<template>
  <!-- header -->
  <sub-header title="킥보드 이용방법 안내" />
  <!-- // header -->
  <!-- main -->
  <main id="main" class="main mor">
    <div class="container no_padding bg_white">
      <uu-tabs class="depth2_tab guide_tab bg_gray" own-size-tab :tabIndex="tabIndex">
        <uu-tab title="대여하기">
          <div class="how_use kickboard">
            <ol class="step">
              <li>
                <div class="img_area">
                  <img src="/assets/images/guide/ic_kickboard_01.png" alt="" />
                </div>
                <div class="text_area">
                  <p class="num">01</p>
                  <p class="text">내 주변에 있는 킥보드를 찾아보세요.</p>
                </div>
              </li>
              <li>
                <div class="img_area">
                  <img src="/assets/images/guide/ic_kickboard_02.png" alt="" />
                </div>
                <div class="text_area">
                  <p class="num">02</p>
                  <p class="text">예상 목적지를 확인 하시고 대여하세요.</p>
                </div>
              </li>
              <li>
                <div class="img_area">
                  <img src="/assets/images/guide/ic_kickboard_03.png" alt="" />
                </div>
                <div class="text_area">
                  <p class="num">03</p>
                  <p class="text">킥보드를 부착된 QR코드를 스캔합니다.</p>
                </div>
              </li>
              <li>
                <div class="img_area">
                  <img src="/assets/images/guide/ic_kickboard_04.png" alt="" />
                </div>
                <div class="text_area">
                  <p class="num">04</p>
                  <p class="text">
                    브레이크와 가속 레버 등 킥보드의<br />
                    상태를 확인합니다.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </uu-tab>
        <uu-tab title="라이딩 하기">
          <div class="how_use kickboard">
            <ol class="step">
              <li>
                <div class="img_area">
                  <img src="/assets/images/guide/ic_kickboard_05.png" alt="" />
                </div>
                <div class="text_area">
                  <p class="num">01</p>
                  <p class="text">안전을 위해 헬멧을 꼭 착용합니다.</p>
                </div>
              </li>
              <li>
                <div class="img_area">
                  <img src="/assets/images/guide/ic_kickboard_06.png" alt="" />
                </div>
                <div class="text_area">
                  <p class="num">02</p>
                  <p class="text">
                    땅을 차면서 오른쪽 가속레버를 천히<br />
                    눌러 출발합니다.
                  </p>
                </div>
              </li>
              <li>
                <div class="img_area">
                  <img src="/assets/images/guide/ic_kickboard_07.png" alt="" />
                </div>
                <div class="text_area">
                  <p class="num">03</p>
                  <p class="text">왼쪽 손으로 레버를 천천히 쥐면 서서히 멈춥니다.</p>
                </div>
              </li>
              <li>
                <div class="img_area">
                  <img src="/assets/images/guide/ic_kickboard_08.png" alt="" />
                </div>
                <div class="text_area">
                  <p class="num">04</p>
                  <p class="text">보행자와 교통신호에 유의하며 안전하게 라이딩하세요.</p>
                </div>
              </li>
            </ol>
          </div>
        </uu-tab>
        <uu-tab title="반납하기">
          <div class="how_use kickboard">
            <ol class="step">
              <li>
                <div class="img_area">
                  <img src="/assets/images/guide/ic_kickboard_09.png" alt="" />
                </div>
                <div class="text_area">
                  <p class="num">01</p>
                  <p class="text">다음 사용자를 위해 안전한 곳에 주차해주세요.</p>
                </div>
              </li>
              <li>
                <div class="img_area">
                  <img src="/assets/images/guide/ic_kickboard_10.png" alt="" />
                </div>
                <div class="text_area">
                  <p class="num">02</p>
                  <p class="text">통행에 불편을 주는 곳은 아닌지 다시 한번 확인해주세요.</p>
                </div>
              </li>
              <li>
                <div class="img_area">
                  <img src="/assets/images/guide/ic_kickboard_11.png" alt="" />
                </div>
                <div class="text_area">
                  <p class="num">03</p>
                  <p class="text">반납하기 버튼을 누르면 반납이 완료됩니다.</p>
                </div>
              </li>
              <li>
                <div class="img_area">
                  <img src="/assets/images/guide/ic_kickboard_12.png" alt="" />
                </div>
                <div class="text_area">
                  <p class="num">04</p>
                  <p class="text">이용 요금과 반납한 지역의 요금을 확인해주세요.</p>
                </div>
              </li>
            </ol>
          </div>
        </uu-tab>
        <uu-tab title="반납추가요금/주행금지지역">
          <div class="how_use kickboard">
            <div class="correct_parking">
              <div class="img_area">
                <img src="/assets/images/guide/ic_correct_parking_02.png" alt="" />
              </div>
              <p>
                대여 중 주행금지지역에 들어가면<br />
                기기가 작동하지 않습니다.<br />
                서비스 지역으로 이동해주세요.
              </p>
              <p class="desc">
                * 주행금지지역에서 반납 시<br />
                반납추가요금이 발생될 수 있습니다.
              </p>
            </div>
            <div class="correct_parking">
              <div class="img_area">
                <img src="/assets/images/guide/ic_correct_parking.png" alt="" />
              </div>
              <p>
                대여전 지도에서 목적지의 <br />
                반납추가요금을 확인해주세요.
              </p>
            </div>
          </div>
        </uu-tab>
        <uu-tab title="주차 유의사항">
          <div class="how_use kickboard">
            <div class="illegal_parking">
              <div class="top">
                <uu-ic size="20" name="alert" />
                불법 주정차 주의!
              </div>
              <div class="bottom">
                올바르지 않게 주정차된 경우<br />
                지자체 정책에 따라 <span>견인</span> 및 <span>보관료</span>가<br />
                별도 청구될 수 있습니다.
              </div>
            </div>
            <div class="no_parking">
              <h4>주차 불가 지역!</h4>
              <ol>
                <li>
                  <div class="img_area">
                    <img src="/assets/images/guide/ic_kickboard_13.png" alt="" />
                  </div>
                  <p>버스 정류소 및 택시 승강장 5M 이내 지역</p>
                </li>
                <li>
                  <div class="img_area">
                    <img src="/assets/images/guide/ic_kickboard_14.png" alt="" />
                  </div>
                  <p>지하철역<br />진출입구 전면 5M</p>
                </li>
                <li>
                  <div class="img_area">
                    <img src="/assets/images/guide/ic_kickboard_19.png" alt="" />
                  </div>
                  <p>횡단보도 3M 이내 지역</p>
                </li>
                <li>
                  <div class="img_area">
                    <img src="/assets/images/guide/ic_kickboard_20.png" alt="" />
                  </div>
                  <p>보도와 차도가 구분된 차도</p>
                </li>
                <li>
                  <div class="img_area">
                    <img src="/assets/images/guide/ic_kickboard_21.png" alt="" />
                  </div>
                  <p>차도 및 자전거 도로 위</p>
                </li>
                <li>
                  <div class="img_area">
                    <img src="/assets/images/guide/ic_kickboard_22.png" alt="" />
                  </div>
                  <p>점자 보도블록 위 및 교통약자 엘레베이터 앞</p>
                </li>
                <li>
                  <div class="img_area">
                    <img src="/assets/images/guide/ic_kickboard_23.png" alt="" />
                  </div>
                  <p>교통섬</p>
                </li>
                <li>
                  <div class="img_area">
                    <img src="/assets/images/guide/ic_kickboard_24.png" alt="" />
                  </div>
                  <p>장애인 주정차구역</p>
                </li>
                <li>
                  <div class="img_area">
                    <img src="/assets/images/guide/ic_kickboard_25.png" alt="" />
                  </div>
                  <p>어린이, 노인, 장애인 보호구역</p>
                </li>
                <li></li>
              </ol>
            </div>
          </div>
        </uu-tab>
      </uu-tabs>
    </div>
  </main>
  <!-- // main -->
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const tabIndex = ref(0)

const categoryMap = new Map([
  ['rental', 0],
  ['ride', 1],
  ['return', 2],
  ['fee', 3],
  ['park', 4]
])

onMounted(async () => {
  const category = route.query.category as string
  tabIndex.value = categoryMap.get(category) ?? 0
})
</script>
