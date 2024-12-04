<template>
  <!-- header -->
  <sub-header title="이용가이드" right-content>
    <template #header_right>
      <button
        v-if="getIsLogin"
        type="button"
        class="btn header_right_btn"
        @click="
          sendAdbrix(AdbrixEvtId.mCsQNA),
            router.push({
              path: '/customer-support/complain'
            })
        "
      >
        <span class="num">1:1</span> 문의
      </button>
    </template>
  </sub-header>
  <!-- // header -->
  <!-- main -->
  <main id="main" class="main mor">
    <div class="container no_padding bg_white">
      <uu-tabs class="guide_tab" own-size-tab :tabIndex="tabIndex" @selected="onSelectedTap">
        <uu-tab title="GO마일리지">
          <uu-tabs class="depth2_tab" own-size-tab @selected="onSelectedTap">
            <uu-tab title="적립">
              <h2 class="guide_title">GO마일리지 적립하기</h2>
              <div class="tip_wrap">
                <div class="tip_badge">
                  <span>TIP 1</span>
                </div>
                <p class="tip_txt">
                  티머니GO에 등록한 교통카드로<br />
                  <em class="txt_bold">대중교통</em> 또는<em class="txt_bold"> 자전거</em>를 이용하면<br />
                  마일리지가 <em class="txt_bold">적립</em>됩니다.
                </p>
                <div class="img_wrap">
                  <img src="/assets/images/guide/mileage_01_01.png" alt="" />
                </div>
                <p class="ic_tip">
                  <uu-ic name="star" size="18" />
                  <span> 적립금은 1일 최대 100M 적립이 가능합니다. </span>
                </p>
              </div>

              <div class="tip_wrap">
                <div class="tip_badge">
                  <span>TIP 2</span>
                </div>
                <p class="tip_txt">
                  대중교통과 티머니GO 모빌리티 서비스를<br />
                  <em class="txt_bold">같이 이용</em>하시면 <em class="txt_bold">환승리워드</em>가
                  <em class="txt_bold">자동 적립</em>됩니다.
                </p>
                <p class="tip_sub_txt">60분(고속·시외), 30분(자전거,킥보드) 이내 환승 시<br />/ 이용순서 무관</p>
                <div class="img_wrap">
                  <img src="/assets/images/guide/mileage_01_02.png" alt="" />
                </div>
                <div class="img_wrap">
                  <img src="/assets/images/guide/mileage_01_03.png" alt="" />
                </div>
              </div>

              <div class="tip_wrap">
                <div class="tip_badge">
                  <span>TIP 3</span>
                </div>
                <p class="tip_txt">
                  하루 하루 <em class="txt_bold">출석 체크</em>하면 룰렛 돌리기<br />
                  기회가 주어집니다. <em class="txt_bold">룰렛 결과</em>에 따라<br />
                  <em class="txt_bold">마일리지가 적립</em>됩니다.
                </p>
                <div class="img_wrap">
                  <img src="/assets/images/guide/mileage_01_04.png" alt="" />
                </div>
                <div class="img_wrap">
                  <img src="/assets/images/guide/mileage_01_05.png" alt="" />
                </div>
              </div>

              <div class="tip_wrap">
                <div class="tip_badge">
                  <span>TIP 4</span>
                </div>
                <p class="tip_txt">
                  <em class="txt_bold">GO마일리지 무료적립</em>을 통해<br />
                  쇼핑도 하고 생활에 도움이 되는<br />
                  <em class="txt_bold">좋은 정보에 참여</em>하는 동시에<br />
                  마일리지도 얻을 수 있습니다.
                </p>
                <div class="img_wrap">
                  <img src="/assets/images/guide/mileage_01_06.png" alt="" />
                </div>
              </div>
            </uu-tab>
            <uu-tab title="사용">
              <h2 class="guide_title">GO마일리지 사용하기</h2>
              <div class="tip_wrap">
                <div class="tip_badge">
                  <span>TIP 1</span>
                </div>
                <p class="tip_txt">
                  <em class="txt_bold">티머니GO 모빌리티 서비스</em>를<br /><em class="txt_bold">이용</em>해보세요
                </p>
                <div class="img_wrap">
                  <img src="/assets/images/guide/mileage_02_01.png" alt="" />
                </div>
              </div>
              <div class="tip_wrap">
                <div class="tip_badge">
                  <span>TIP 2</span>
                </div>
                <p class="tip_txt">
                  고속·시외 예매, 따릉이 <em class="txt_bold">이용권 구매</em>시<br /><em class="txt_bold"
                    >원하는 금액만큼 마일리지</em
                  >를 사용할 수 있어요.
                </p>
                <div class="img_wrap">
                  <img src="/assets/images/guide/mileage_02_02.png" alt="" />
                </div>
              </div>
              <div class="tip_wrap">
                <div class="tip_badge">
                  <span>TIP 3</span>
                </div>
                <p class="tip_txt">
                  택시, 킥보드 이용 시<br /><em class="txt_bold">보유 마일리지</em>를 <em class="txt_bold">사용</em>할
                  수 있어요.
                </p>
                <p class="tip_sub_txt">보유 마일리지 전체 사용 후 차액 결제</p>
                <div class="img_wrap">
                  <img src="/assets/images/guide/mileage_02_03.png" alt="" />
                </div>
                <div class="img_wrap">
                  <img src="/assets/images/guide/mileage_02_04.png" alt="" />
                </div>
              </div>
            </uu-tab>
            <uu-tab title="전환">
              <h2 class="guide_title">T마일리지로 전환하기</h2>
              <div class="tip_wrap">
                <p class="tip_txt">
                  GO마일리지를 T마일리지로 1:1 전환 후<br />
                  <em class="txt_bold">모바일티머니에서 현금처럼 사용</em>할 수 있습니다.
                </p>
                <div class="img_wrap">
                  <img src="/assets/images/guide/mileage_03_01.png" alt="" />
                </div>
              </div>
              <div class="tip_wrap">
                <h2 class="guide_title">사용처</h2>
                <div class="img_wrap wide">
                  <img src="/assets/images/guide/mileage_03_02.png" alt="" />
                </div>
                <p class="ic_tip">
                  <span>
                    ※ 아이폰 이용자는 모바일티머니 앱을 통해<br />
                    티머니 스티커카드 충전 및 일부 온라인<br />
                    가맹점 결제에 T마일리지를 사용할 수 있습니다.
                  </span>
                </p>
              </div>
            </uu-tab>
          </uu-tabs>
        </uu-tab>
        <uu-tab title="고속·시외">
          <uu-tabs class="depth2_tab" own-size-tab @selected="onSelectedTap">
            <uu-tab title="출·도착 검색">
              <h2 class="guide_title">고속·시외 버스 <br />출발지/도착지 검색하기</h2>
              <br />
              <div class="tip_wrap">
                <div class="tip_badge">
                  <span>TIP 1</span>
                </div>
                <p class="tip_txt">
                  <em class="txt_bold">출발</em> 또는 <em class="txt_bold">도착터미널</em>을 목록에서
                  <em class="txt_bold">선택</em>하면<br />
                  자동으로 입력됩니다.
                </p>
                <div class="img_wrap">
                  <img src="/assets/images/guide/bus_01_01.png" alt="" />
                </div>
              </div>
              <div class="tip_wrap">
                <div class="tip_badge">
                  <span>TIP 2</span>
                </div>
                <p class="tip_txt">
                  하단 검색 영역에서 <em class="txt_bold">터미널명</em> 또는 <em class="txt_bold">지역명</em>을
                  <br />직접 검색할 수 있습니다.
                </p>
                <div class="img_wrap">
                  <img src="/assets/images/guide/bus_01_02.png" alt="" />
                </div>
              </div>
              <div class="tip_wrap">
                <div class="tip_badge">
                  <span>TIP 3</span>
                </div>
                <p class="tip_txt">
                  <em class="txt_bold">최근 검색</em> 또는 <em class="txt_bold">최근 경로</em>를 선택하면<br />간편하게
                  <em class="txt_bold">배차조회</em>가 가능합니다.
                </p>
                <div class="img_wrap">
                  <img src="/assets/images/guide/bus_01_03.png" alt="" />
                </div>
              </div>
            </uu-tab>
            <uu-tab title="예매방법">
              <h2 class="guide_title">고속·시외 버스 예매하기</h2>
              <div class="tip_wrap">
                <div class="tip_badge">
                  <span>STEP 1</span>
                </div>
                <p class="tip_txt"><em class="txt_bold">출발지/도착지</em>를 <em class="txt_bold">검색</em>하세요.</p>
                <div class="img_wrap">
                  <img src="/assets/images/guide/bus_02_01.png" alt="" />
                </div>
                <p class="ic_tip">
                  <uu-ic name="star" size="18" />
                  <span>자세한 검색 방법은 <em class="txt_bold">출·도착 검색 </em>탭을 참고하세요.</span>
                </p>
              </div>
              <div class="tip_wrap">
                <div class="tip_badge">
                  <span>STEP 2</span>
                </div>
                <p class="tip_txt">
                  <em>출발하실 <em class="txt_bold">날짜</em>와 <em class="txt_bold">시간</em>을 선택해 주세요.</em>
                </p>
                <div class="img_wrap">
                  <img src="/assets/images/guide/bus_02_02.png" alt="" />
                </div>
                <p class="ic_tip">
                  <uu-ic name="star" size="18" />
                  <span
                    >출도착 터미널 옆에 <em class="txt_bold">별아이콘</em>을 누르면 <br />즐겨찾기 노선으로
                    저장됩니다.</span
                  >
                </p>
              </div>
              <div class="tip_wrap">
                <div class="tip_badge">
                  <span>STEP 3</span>
                </div>
                <p class="tip_txt"><em class="txt_bold">원하는 버스</em>를 <em class="txt_bold">선택</em>하고</p>
                <div class="img_wrap">
                  <img src="/assets/images/guide/bus_02_03.png" alt="" />
                </div>
              </div>
              <div class="tip_wrap">
                <div class="tip_badge">
                  <span>STEP 4</span>
                </div>
                <p class="tip_txt">
                  <em class="txt_bold">좌석</em>을 <em class="txt_bold">선택</em>하고 <em class="txt_bold">결제</em>가
                  <em class="txt_bold">완료</em> 되면
                </p>
                <div class="img_wrap">
                  <img src="/assets/images/guide/bus_02_04.png" alt="" />
                </div>
              </div>
              <div class="tip_wrap">
                <div class="tip_badge">
                  <span>STEP 5</span>
                </div>
                <p class="tip_txt">
                  <em class="txt_bold">예매 완료!</em>
                </p>
                <p class="tip_sub_txt">버스에 따라 QR코드가 노출되지 않을 수 있습니다.</p>
                <div class="img_wrap">
                  <img src="/assets/images/guide/bus_02_05.png" alt="" />
                </div>
              </div>
            </uu-tab>
            <uu-tab title="예매변경">
              <h2 class="guide_title">예매 티켓 변경 하기</h2>
              <div class="tip_wrap">
                <div class="tip_badge">
                  <span>STEP 1</span>
                </div>
                <p class="tip_txt"><em class="txt_bold">예매하신 티켓</em>을 선택해 주세요.</p>
                <div class="img_wrap">
                  <img src="/assets/images/guide/bus_03_01.png" alt="" />
                </div>
                <p class="ic_tip">
                  <uu-ic name="star" size="18" />
                  <span>
                    예매변경은 <em class="txt_bold">좌석 및 출발시간</em>에 한해 <em class="txt_bold">한번</em>만<br />
                    가능합니다.
                  </span>
                </p>
              </div>
              <div class="tip_wrap">
                <div class="tip_badge">
                  <span>STEP 2</span>
                </div>
                <p class="tip_txt">
                  <em class="txt_bold">이용 상세 정보</em>에서 <em class="txt_bold">예매변경</em>을 선택해 주세요.
                </p>
                <div class="img_wrap">
                  <img src="/assets/images/guide/bus_03_02.png" alt="" />
                </div>
              </div>
              <div class="tip_wrap">
                <div class="tip_badge">
                  <span>STEP 3</span>
                </div>
                <p class="tip_txt"><em class="txt_bold">좌석</em>과 <em class="txt_bold">시간</em>을 선택해 주세요.</p>
                <div class="img_wrap">
                  <img src="/assets/images/guide/bus_03_03.png" alt="" />
                </div>
              </div>
              <div class="tip_wrap">
                <div class="tip_badge">
                  <span>STEP 4</span>
                </div>
                <p class="tip_txt">
                  <em class="txt_bold">변경된 티켓 확인 후</em><br />
                  <em class="txt_bold">재결제</em>가 이루어 지면 <em class="txt_bold">변경 완료!</em>
                </p>
                <div class="img_wrap">
                  <img src="/assets/images/guide/bus_03_04.png" alt="" />
                </div>
              </div>
            </uu-tab>
            <uu-tab title="예매취소">
              <h2 class="guide_title">예매 티켓 취소 하기</h2>
              <div class="tip_wrap">
                <div class="tip_badge">
                  <span>STEP 1</span>
                </div>
                <p class="tip_txt">
                  <em class="txt_bold">이용 상세 정보</em>에서 <em class="txt_bold">예매취소</em>를 선택해 주세요.
                </p>
                <div class="img_wrap">
                  <img src="/assets/images/guide/bus_04_01.png" alt="" />
                </div>
                <p class="ic_tip">
                  <uu-ic name="star" size="18" />
                  <span>
                    예매취소 시 <em class="txt_bold">별도의 위약금</em>이 발생할 수 있으니<br />
                    꼭 확인해 주시기 바랍니다.
                  </span>
                </p>
              </div>
              <div class="tip_wrap">
                <div class="tip_badge">
                  <span>STEP 2</span>
                </div>
                <p class="tip_txt">
                  <em class="txt_bold">취소하실 티켓 확인</em> 후<br />
                  <em class="txt_bold">예매취소</em> 하시면 <em class="txt_bold">취소 완료!</em>
                </p>
                <div class="img_wrap">
                  <img src="/assets/images/guide/bus_04_02.png" alt="" />
                </div>
              </div>
            </uu-tab>
            <uu-tab title="검표방법">
              <h2 class="guide_title">전자 승차권으로 검표 하기</h2>
              <div class="tip_wrap">
                <div class="tip_badge">
                  <span>STEP 1</span>
                </div>
                <p class="tip_txt">
                  <em class="txt_bold">QR코드</em>가 찍힌 <em class="txt_bold">전자 승차권</em>을 들고<br />
                  버스에 탑승하세요.
                </p>
                <div class="img_wrap">
                  <img src="/assets/images/guide/bus_05_01.png" alt="" />
                </div>
              </div>
              <div class="tip_wrap">
                <div class="tip_badge">
                  <span>STEP 2</span>
                </div>
                <p class="tip_txt">
                  <em class="txt_bold">버스 단말기</em>에<br />
                  <em class="txt_bold">QR코드</em>를 대면 <em class="txt_bold">검표 완료!</em>
                </p>
                <p class="tip_sub_txt">
                  QR코드가 없는 승차권의 경우 무인 발매기나 창구에서<br />
                  발권하신 후 종이 승차권으로 검표 가능합니다.
                </p>
                <div class="img_wrap">
                  <img src="/assets/images/guide/bus_05_02.png" alt="" />
                </div>
                <p class="ic_tip">
                  <uu-ic name="star" size="18" />
                  <span>
                    <em class="txt_bold">휴대폰 밝기</em>를 밝게 하고 QR코드를 대면<br />
                    코드 인식이 더 잘됩니다.
                  </span>
                </p>
              </div>
            </uu-tab>
          </uu-tabs>
        </uu-tab>
        <uu-tab title="여행">
          <uu-tabs class="depth2_tab" own-size-tab @selected="onSelectedTap">
            <uu-tab title="여행상품 검색">
              <h2 class="guide_title">여행상품 검색하기</h2>
              <br />
              <div class="tip_wrap">
                <div class="tip_badge">
                  <span>STEP 1</span>
                </div>
                <p class="tip_txt">여행상품 <em class="txt_bold">검색화면</em>으로 이동하세요.</p>
                <div class="img_wrap">
                  <img src="/assets/images/guide/travel_01_01.png" alt="" />
                </div>
              </div>
              <div class="tip_wrap">
                <div class="tip_badge">
                  <span>STEP 2</span>
                </div>
                <p class="tip_txt">
                  <em class="txt_bold">여행상품명</em>을 직접 입력하거나, <br />
                  <em class="txt_bold">기획전</em> 중에서 원하는 상품을 찾아보세요.
                </p>
                <div class="img_wrap">
                  <img src="/assets/images/guide/travel_01_02.png" alt="" />
                </div>
              </div>
              <div class="tip_wrap">
                <div class="tip_badge">
                  <span>STEP 3</span>
                </div>
                <p class="tip_txt">원하는 <em class="txt_bold">조건별</em>로 여행을 검색해보세요.</p>
                <div class="img_wrap">
                  <img src="/assets/images/guide/travel_01_03.png" alt="" />
                </div>
              </div>
            </uu-tab>
            <uu-tab title="예약방법">
              <h2 class="guide_title">예약방법</h2>
              <div class="tip_wrap">
                <div class="tip_badge">
                  <span>STEP 1</span>
                </div>
                <p class="tip_txt">여행을 떠날 <em class="txt_bold">날짜</em>를 선택해주세요.</p>
                <div class="img_wrap">
                  <img src="/assets/images/guide/travel_02_01.png" alt="" />
                </div>
              </div>
              <div class="tip_wrap">
                <div class="tip_badge">
                  <span>STEP 2</span>
                </div>
                <p class="tip_txt">
                  여행을 시작할 <em class="txt_bold">출발지</em>를 선택하세요.<br />
                  (일부 <em class="txt_bold">입장권</em> 상품은 출발지를 별도로 선택하지 않아요.)
                </p>
                <div class="img_wrap">
                  <img src="/assets/images/guide/travel_02_02.png" alt="" />
                </div>
              </div>
              <div class="tip_wrap">
                <div class="tip_badge">
                  <span>STEP 3</span>
                </div>
                <p class="tip_txt">여행에 참여할 <em class="txt_bold">인원</em>을 선택해주세요.</p>
                <div class="img_wrap">
                  <img src="/assets/images/guide/travel_02_03.png" alt="" />
                </div>
              </div>
              <div class="tip_wrap">
                <div class="tip_badge">
                  <span>STEP 4</span>
                </div>
                <p class="tip_txt">
                  <em class="txt_bold">이용자 정보</em>를 입력해주세요.<br />
                  (이용자 정보 입력은 선택사항 이지만,<br />
                  <em class="txt_bold">최소 대표자 1명</em>의 정보는 꼭 입력해야 해요.)
                </p>
                <div class="img_wrap">
                  <img src="/assets/images/guide/travel_02_04.png" alt="" />
                </div>
              </div>
              <div class="tip_wrap">
                <div class="tip_badge">
                  <span>STEP 5</span>
                </div>
                <p class="tip_txt">결제가 완료되면 예약 완료!</p>
                <div class="img_wrap">
                  <img src="/assets/images/guide/travel_02_05.png" alt="" />
                </div>
              </div>
            </uu-tab>
          </uu-tabs>
        </uu-tab>
        <uu-tab title="택시">
          <h2 class="guide_title">택시 이용하기</h2>
          <div class="tip_wrap">
            <div class="tip_badge">
              <span>TIP 1</span>
            </div>
            <p class="tip_txt">
              택시 호출 전, <em class="txt_bold">내 주변</em>에 <em class="txt_bold">빈 택시</em>가 있는지<br />실시간으로
              확인할 수 있어요.
            </p>
            <p class="tip_sub_txt">출발지 기준으로 반경 1km 이내</p>
            <div class="img_wrap">
              <img src="/assets/images/guide/taxi_01.png" alt="" />
            </div>
          </div>
          <div class="tip_wrap">
            <div class="tip_badge">
              <span>TIP 2</span>
            </div>
            <p class="tip_txt">내릴 때 편리한 <em class="txt_bold">자동결제</em>를 이용해 보세요!</p>
            <div class="img_wrap">
              <img src="/assets/images/guide/taxi_02.png" alt="" />
            </div>
            <p class="ic_tip">
              <uu-ic name="star" size="18" />
              <span>
                자동결제 시, 보유한 <em class="txt_bold">마일리지 사용</em>과 <em class="txt_bold">쿠폰 할인</em
                ><br />혜택을 받을 수 있어요.
              </span>
            </p>
          </div>
          <div class="tip_wrap">
            <div class="tip_badge">
              <span>TIP 3</span>
            </div>
            <p class="tip_txt">
              <em class="txt_bold">길찾기 </em>메뉴에서 <em class="txt_bold">택시와 다른 교통수단을<br />비교</em>해본
              후 이용할 수 있어요!
            </p>
            <div class="img_wrap">
              <img src="/assets/images/guide/taxi_03.png" alt="" />
            </div>
            <p class="ic_tip">
              <uu-ic name="star" size="18" />
              <span> 경로 확인 후 <em class="txt_bold">택시 승차요청 </em>메뉴로<br />바로 이동할 수 있어요. </span>
            </p>
          </div>
          <div class="tip_wrap">
            <div class="tip_badge">
              <span>TIP 4</span>
            </div>
            <p class="tip_txt">
              택시 이용내역을 <em class="txt_bold">즐겨찾기</em>로 등록하면<br />버튼 하나로
              <em class="txt_bold">택시를 바로 호출</em>할 수 있어요.
            </p>
            <div class="img_wrap">
              <img src="/assets/images/guide/taxi_04.png" alt="" />
            </div>
            <p class="ic_tip">
              <uu-ic name="star" size="18" />
              <span>
                즐겨찾기에는 <em class="txt_bold">출발지-도착지</em>와 선택옵션(<em class="txt_bold"
                  >경로,<br />택시유형,결제수단</em
                >)까지 함께 저장됩니다.
              </span>
            </p>
          </div>
        </uu-tab>
        <uu-tab title="자전거/킥보드">
          <h2 class="guide_title">자전거/킥보드 이용하기</h2>
          <p class="sub_title">자전거와 킥보드를 편리하게<br />이용하실 수 있도록 알려드릴게요!</p>
          <div class="tip_wrap">
            <div class="tip_badge">
              <span>TIP 1</span>
            </div>
            <p class="tip_txt">
              지도에서 <em class="txt_bold">대여하기 버튼</em>을 탭하여<br />자전거/킥보드를 대여해보세요.
            </p>
            <div class="img_wrap">
              <img src="/assets/images/guide/bike_01.png" alt="" />
            </div>
          </div>
          <div class="tip_wrap">
            <div class="tip_badge">
              <span>TIP 2</span>
            </div>
            <p class="tip_txt">
              <em class="txt_bold">QR코드 스캔</em>으로 쉽고 편리한<br /><em class="txt_bold">대여</em>가 가능합니다.
            </p>
            <div class="img_wrap">
              <img src="/assets/images/guide/bike_02.png" alt="" />
            </div>
          </div>
          <div class="tip_wrap">
            <div class="tip_badge">
              <span>TIP 3</span>
            </div>
            <p class="tip_txt">
              목적지 근처 <em class="txt_bold">반납 가능한 장소</em>에<br />안전하게 주차 후 반납하면 이용 완료!
            </p>
            <div class="img_wrap etc">
              <img src="/assets/images/guide/bike_03.png" alt="" />
            </div>
          </div>
        </uu-tab>
        <uu-tab title="렌터카">
          <h2 class="guide_title">렌터카 대여하기</h2>
          <p class="sub_title">렌터카를 편리하게<br />이용하실 수 있도록 알려드릴게요!</p>
          <div class="tip_wrap">
            <div class="tip_badge">
              <span>TIP 1</span>
            </div>
            <p class="tip_txt">
              <em class="txt_bold">차량받을 장소</em>와<br /><em class="txt_bold">대여일시/반납일시를 선택</em>해
              주세요.
            </p>
            <div class="img_wrap">
              <img src="/assets/images/guide/rentcar_01.png" alt="" />
            </div>
          </div>
          <div class="tip_wrap">
            <div class="tip_badge">
              <span>TIP 2</span>
            </div>
            <p class="tip_txt"><em class="txt_bold">원하는 차량을 선택</em>해 주세요.</p>
            <div class="img_wrap">
              <img src="/assets/images/guide/rentcar_02.png" alt="" />
            </div>
          </div>
          <div class="tip_wrap">
            <div class="tip_badge">
              <span>TIP 3</span>
            </div>
            <p class="tip_txt">
              <em class="txt_bold">원하는 차량의 옵션을</em><br /><em class="txt_bold">선택</em>해 주세요.
            </p>
            <div class="img_wrap">
              <img src="/assets/images/guide/rentcar_03.png" alt="" />
            </div>
          </div>
          <div class="tip_wrap">
            <div class="tip_badge">
              <span>TIP 4</span>
            </div>
            <p class="tip_txt"><em class="txt_bold">보험을 선택하고 예약정보를 입력</em>해 주세요.</p>
            <div class="img_wrap">
              <img src="/assets/images/guide/rentcar_04.png" alt="" />
            </div>
          </div>
          <div class="tip_wrap">
            <div class="tip_badge">
              <span>TIP 5</span>
            </div>
            <p class="tip_txt">
              <em class="txt_bold">결제 후 예약한 대여 장소와 날짜에</em><br /><em class="txt_bold"
                >차량을 받으면 렌터카 대여 완료!</em
              >
            </p>
            <div class="img_wrap">
              <img src="/assets/images/guide/rentcar_05.png" alt="" />
            </div>
          </div>
        </uu-tab>
        <uu-tab title="항공">
          <h2 class="guide_title">항공 이용하기</h2>
          <p class="sub_title">국내선 항공 서비스를 <br />이용하실 수 있는 방법을 알려드릴게요!</p>
          <div class="tip_wrap">
            <div class="tip_badge">
              <span>TIP 1</span>
            </div>
            <p class="tip_txt">
              <em class="txt_bold">항공 서비스 메인</em>에서<br /><em class="txt_bold">출도착/일정/탑승객 수를 선택</em
              >해 주세요.
            </p>
            <div class="img_wrap">
              <img src="/assets/images/guide/airflight_01.png" alt="" />
            </div>
          </div>
          <div class="tip_wrap">
            <div class="tip_badge">
              <span>TIP 2</span>
            </div>
            <p class="tip_txt"><em class="txt_bold">원하시는 항공편을 선택</em>해 주세요.</p>
            <div class="img_wrap">
              <img src="/assets/images/guide/airflight_02.png" alt="" />
            </div>
          </div>
          <div class="tip_wrap">
            <div class="tip_badge">
              <span>TIP 3</span>
            </div>
            <p class="tip_txt">
              <em class="txt_bold">예약자 및 탑승객 정보를</em><br /><em class="txt_bold">입력</em>해 주세요.
            </p>
            <div class="img_wrap">
              <img src="/assets/images/guide/airflight_03.png" alt="" />
            </div>
          </div>
          <div class="tip_wrap">
            <div class="tip_badge">
              <span>TIP 4</span>
            </div>
            <p class="tip_txt">
              <em class="txt_bold">결제 후 예매 완료 알림톡을 받으면</em><br /><em class="txt_bold"
                >항공권 예약 번호를 확인해 주세요.</em
              >
            </p>
            <div class="img_wrap">
              <img src="/assets/images/guide/airflight_04.png" alt="" />
            </div>
          </div>
        </uu-tab>
        <uu-tab title="기차">
          <h2 class="guide_title">기차 이용하기</h2>
          <p class="sub_title">기차 서비스 이용방법을 <br />안내해 드릴게요!</p>
          <div class="tip_wrap">
            <div class="tip_badge">
              <span>TIP 1</span>
            </div>
            <p class="tip_txt">열차 <em class="txt_bold">탑승일시와 출도착지를 입력</em>해 주세요.</p>
            <div class="img_wrap">
              <img src="/assets/images/guide/srt_01.png" alt="" />
            </div>
          </div>
          <div class="tip_wrap">
            <div class="tip_badge">
              <span>TIP 2</span>
            </div>
            <p class="tip_txt"><em class="txt_bold">원하시는 시간과 좌석 종류를 선택</em>해 주세요.</p>
            <div class="img_wrap">
              <img src="/assets/images/guide/srt_02.png" alt="" />
            </div>
          </div>
          <div class="tip_wrap">
            <div class="tip_badge">
              <span>TIP 3</span>
            </div>
            <p class="tip_txt"><em class="txt_bold">좌석을 선택</em>해 주세요.</p>
            <div class="img_wrap">
              <img src="/assets/images/guide/srt_03.png" alt="" />
            </div>
          </div>
          <div class="tip_wrap">
            <div class="tip_badge">
              <span>TIP 4</span>
            </div>
            <p class="tip_txt"><em class="txt_bold">예약정보를 확인하고 결제</em>해 주세요.</p>
            <div class="img_wrap">
              <img src="/assets/images/guide/srt_04.png" alt="" />
            </div>
          </div>
          <div class="tip_wrap">
            <div class="tip_badge">
              <span>TIP 5</span>
            </div>
            <p class="tip_txt">
              결제가 완료되면 <em class="txt_bold">승차권 상세보기</em>에서<br /><em class="txt_bold"
                >예약정보가 맞는지 확인 후 탑승</em
              >해 주세요.
            </p>
            <div class="img_wrap">
              <img src="/assets/images/guide/srt_05.png" alt="" />
            </div>
          </div>
        </uu-tab>
        <uu-tab title="즐겨찾기">
          <uu-tabs class="depth2_tab" own-size-tab @selected="onSelectedTap">
            <uu-tab title="등록">
              <h2 class="guide_title">즐겨찾기 등록하기</h2>
              <div class="tip_wrap">
                <div class="tip_badge">
                  <span>TIP 1</span>
                </div>
                <p class="tip_txt"><em class="txt_bold">검색한 장소 및 경로 우측 별</em>을 탭해주세요.</p>
                <div class="img_wrap">
                  <img src="/assets/images/guide/fav_01_01.png" alt="" />
                </div>
                <p class="ic_tip">
                  <uu-ic name="star" size="18" />
                  <span>
                    자주 이용하는 <em class="txt_bold">고속･시외 노선</em>과
                    <em class="txt_bold">따릉이 대여소</em>도<br />
                    즐겨찾기 가능합니다.
                  </span>
                </p>
              </div>
              <div class="tip_wrap">
                <div class="tip_badge">
                  <span>TIP 2</span>
                </div>
                <p class="tip_txt">
                  즐겨찾기는 <em class="txt_bold">앱 상단 메뉴</em>에서<br />바로 확인할 수 있습니다.
                </p>
                <div class="img_wrap">
                  <img src="/assets/images/guide/fav_01_02.png" alt="" />
                </div>
              </div>
              <div class="tip_wrap">
                <div class="tip_badge">
                  <span>TIP 3</span>
                </div>
                <p class="tip_txt">장소 탭에서 <em class="txt_bold">우리집, 회사</em>를<br />등록해보세요!</p>
                <div class="img_wrap">
                  <img src="/assets/images/guide/fav_01_03.png" alt="" />
                </div>
              </div>
            </uu-tab>
            <uu-tab title="관리">
              <h2 class="guide_title">즐겨찾기 관리하기</h2>
              <div class="tip_wrap">
                <div class="tip_badge">
                  <span>TIP 1</span>
                </div>
                <p class="tip_txt">즐겨찾기 목록을 <em class="txt_bold">좌우로 밀어</em> 편집하세요!</p>
                <div class="img_wrap">
                  <img src="/assets/images/guide/fav_02_01.png" alt="" />
                </div>
                <p class="ic_tip">
                  <uu-ic name="star" size="18" />
                  <span> <em class="txt_bold">더보기 메뉴</em>를 탭해도 즐겨찾기 편집이 가능합니다. </span>
                </p>
              </div>
              <div class="tip_wrap">
                <div class="tip_badge">
                  <span>TIP 2</span>
                </div>
                <p class="tip_txt">더보기 메뉴에서<br />즐겨찾기 <em class="txt_bold">별명을 등록</em>해보세요!</p>
                <div class="img_wrap">
                  <img src="/assets/images/guide/fav_02_02.png" alt="" />
                </div>
              </div>
            </uu-tab>
          </uu-tabs>
        </uu-tab>
        <uu-tab title="결제수단등록">
          <h2 class="guide_title">결제수단 등록하기</h2>
          <br />
          <div class="tip_wrap">
            <div class="tip_badge">
              <span>TIP 1</span>
            </div>
            <p class="tip_txt">티머니GO에서 <em class="txt_bold">결제수단을 등록</em>해보세요!</p>
            <div class="img_wrap">
              <img src="/assets/images/guide/payment_01.png" alt="" />
            </div>
          </div>
          <div class="tip_wrap">
            <div class="tip_badge">
              <span>TIP 2</span>
            </div>
            <p class="tip_txt">
              <em class="txt_bold">모바일티머니를 등록</em>하시면<br />모빌리티 서비스 이용시 결제가 가능합니다.
            </p>
            <div class="img_wrap">
              <img src="/assets/images/guide/payment_02.png" alt="" />
            </div>
          </div>
          <div class="tip_wrap">
            <div class="tip_badge">
              <span>TIP 3</span>
            </div>
            <p class="tip_txt">
              <em class="txt_bold">카드 간편결제를 등록</em>하시면<br />모빌리티 서비스 이용시 결제가 가능합니다.
            </p>
            <div class="img_wrap">
              <img src="/assets/images/guide/payment_03.png" alt="" />
            </div>
          </div>
        </uu-tab>
      </uu-tabs>
    </div>
  </main>
  <!-- // main -->
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/service/auth/authModule';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { AdbrixEvtId } from '@/utils/hybrid/type';
import { sendAdbrix } from '@/utils/sendAdbrixUtil';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const { getIsLogin } = storeToRefs(authStore);

const tabIndex = ref(0);

const categoryMap = new Map([
  ['mileage', 0],
  ['bus', 1],
  ['taxi', 3],
  ['bike', 4],
  ['favorite', 8],
  ['payment', 9]
]);

// 탭 선택
const onSelectedTap = () => {
  window.scrollTo(0, 0);
};

onMounted(async () => {
  const category = route.query.category as string;
  tabIndex.value = categoryMap.get(category) ?? 0;
});
</script>
