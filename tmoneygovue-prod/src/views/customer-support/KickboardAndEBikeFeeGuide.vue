<template>
  <sub-header title="킥보드/전기자전거 이용요금 안내" />
  <main id="main" class="main mor">
    <div class="container no_padding bg_white">
      <uu-tabs class="guide_tab" :tabLinkHide="true" :tabHide="true" @selected="onSelectedTap">
        <uu-tab title="이용요금 안내">
          <div class="use_money_area">
            <div class="use_money kickboard">
              <h3 style="margin-bottom: 1.6rem">이용 요금 안내</h3>
              <h5 style="margin-bottom: 0.8rem">앱 내 지도에서 이용하려는 자전거를 찾아 자전거 아이콘을 눌러보세요.</h5>
              <div class="shadow_img_area">
                <img src="/assets/images/guide/ic_use_bike_03.png" alt="이용요금 안내 이미지" />
              </div>
              <ul class="dot_list" style="margin-top: 0">
                <li>요금의 경우 지역별, 시간별로 다른 요금이 책정되어 있어요.</li>
                <li>이용하고자 하는 지역에서 자전거를 눌러 잠금 해제 요금과 1분당 요금을 확인해 주세요.</li>
              </ul>
            </div>
          </div>
        </uu-tab>
      </uu-tabs>
    </div>
  </main>
  <!-- // main -->
</template>
<script setup lang="ts">
// 탭 선택
const onSelectedTap = () => {
  window.scrollTo(0, 0);
};
</script>
