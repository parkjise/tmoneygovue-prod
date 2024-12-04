<template>
  <sub-header title="공공자전거 이용요금 안내" />
  <main id="main" class="main mor">
    <div class="container no_padding bg_white">
      <uu-tabs class="guide_tab" @selected="onSelectedTap">
        <uu-tab title="따릉이">
          <div class="use_money_area">
            <div class="use_money line">
              <h3>지쿠케어 보상 및 한도</h3>
              <ul class="dot_list">
                <li>이용 가능시간은 첫 회 대여시점을 기준으로 계산합니다.</li>
                <li>서울자전거 모든 대여소에서 사용이 가능합니다.</li>
                <li>취소, 환불은 서울자전거 환불규정에 따릅니다.</li>
                <li>
                  이용권을 다른 사람에게 양도할 수 없으며, 양도로 인해 발생하는 불이익은 구매자가 책임지셔야 합니다.
                </li>
              </ul>
            </div>
            <div class="use_money">
              <h3>상품안내</h3>
              <table class="table_area">
                <caption>
                  일일권 상품
                </caption>
                <colgroup>
                  <col width="33.333%" />
                  <col width="33.333%" />
                  <col width="33.333%" />
                </colgroup>
                <thead>
                  <tr>
                    <th>일일권</th>
                    <th>1시간 단위 반복</th>
                    <th>2시간 단위 반복</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td />
                    <td>1,000원</td>
                    <td>2,000원</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="use_money">
              <table class="table_area">
                <caption>
                  정기권 상품
                </caption>
                <colgroup>
                  <col width="33.333%" />
                  <col width="33.333%" />
                  <col width="33.333%" />
                </colgroup>
                <thead>
                  <tr>
                    <th>정기권</th>
                    <th>1시간 단위 반복</th>
                    <th>2시간 단위 반복</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>7일</td>
                    <td>3,000원</td>
                    <td>4,000원</td>
                  </tr>
                  <tr>
                    <td>30일</td>
                    <td>5,000원</td>
                    <td>7,000원</td>
                  </tr>
                  <tr>
                    <td>180일</td>
                    <td>15,000원</td>
                    <td>20,000원</td>
                  </tr>
                  <tr>
                    <td>365일</td>
                    <td>30,000원</td>
                    <td>40,000원</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="use_money line">
              <h4>추가 요금</h4>
              <ul class="dot_list">
                <li>1시간(2시간) 단위 반복 이용권을 1시간(2시간) 이내 대여소 미반납시 초과 5분당 200원씩 과금</li>
              </ul>
            </div>
            <div class="use_money">
              <h3>환불규정</h3>
              <h4>이용권 사용 전</h4>
              <ul class="dot_list">
                <li>결제일로부터 3년 이내 전액환불</li>
              </ul>
              <table class="table_area type2">
                <caption>
                  일일권 상품
                </caption>
                <thead class="sr_only">
                  <tr>
                    <th>종류</th>
                    <th>내용</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>일일권</th>
                    <td>환불불가</td>
                  </tr>
                  <tr>
                    <th>정기권</th>
                    <td>이용권 개시일 기준 기한 내 환불 신청</td>
                  </tr>
                </tbody>
              </table>
              <table class="table_area">
                <caption class="sr_only">
                  승차권 안내
                </caption>
                <colgroup>
                  <col width="33.333%" />
                  <col width="33.333%" />
                  <col width="33.333%" />
                </colgroup>
                <thead>
                  <tr>
                    <th>종류</th>
                    <th>7일 이내</th>
                    <th>7일 초과</th>
                  </tr>
                </thead>
                <tbody class="wide_padding">
                  <tr>
                    <td>7일권</td>
                    <td>승차</td>
                    <td>환불불가</td>
                  </tr>
                  <tr>
                    <td>30일권</td>
                    <td rowspan="3">
                      7일권 <br />
                      이용요금 <br />
                      공제
                    </td>
                    <td>환불불가</td>
                  </tr>
                  <tr>
                    <td>180일권</td>
                    <td rowspan="2">
                      환불 요청일 까지의 월별 이용요금 공제<br />
                      (사용월수 X 30일권 이용요금)
                    </td>
                  </tr>
                  <tr>
                    <td>365일권</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="use_money">
              <table class="table_area">
                <caption>
                  환불 신청 기한
                </caption>
                <colgroup>
                  <col width="50%" />
                  <col width="50%" />
                </colgroup>
                <thead>
                  <tr>
                    <th>종류</th>
                    <th>기한</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>7일권</td>
                    <td>2일이내</td>
                  </tr>
                  <tr>
                    <td>30일권</td>
                    <td>7일이내</td>
                  </tr>
                  <tr>
                    <td>180일권</td>
                    <td>60일이내</td>
                  </tr>
                  <tr>
                    <td>365일권</td>
                    <td>150일이내</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </uu-tab>
        <uu-tab title="타슈">
          <div class="use_money_area">
            <div class="use_money">
              <h3>
                기본 대여 시간을 초과하면<br />
                추가 요금이 발생할 수 있어요
              </h3>
              <p>이용 성수기인 3월부터 11월까지는 24시간 운영합니다.</p>
            </div>
            <div class="use_money">
              <round-box hide-title padding-top="1.6rem" padding-bottom="1.6rem">
                <ul class="time_list">
                  <li>
                    <p>대여 시간</p>
                    <p class="time">05시 - 24시</p>
                  </li>
                  <li>
                    <p>반납 시간</p>
                    <p class="time">24시간</p>
                  </li>
                </ul>
              </round-box>
              <div class="rental_time">
                <round-box hide-title>
                  <div class="img_area">
                    <img src="/assets/images/guide/ic_use_bike_01.png" alt="60분" />
                  </div>
                  <p class="title">기본 대여 시간</p>
                  <p class="num">24시간</p>
                </round-box>
                <round-box hide-title>
                  <div class="img_area">
                    <img src="/assets/images/guide/ic_use_bike_02.png" alt="+30분" />
                  </div>
                  <p class="title">기본 대여 시간 이후</p>
                  <p class="num">30분당 500원</p>
                  <p class="desc">(1일당 최대 5,000원)</p>
                </round-box>
              </div>
              <div class="ticket_notice">
                <p class="title">
                  <uu-ic size="16" name="exclamation_gray090" />
                  유의사항
                </p>
                <ul>
                  <li>
                    기본 대여 시간 내에 반납 후 제대여 시 반복이 용이 가능합니다. (이경우 별도의 사용료는 부과하지
                    않습니다.)
                  </li>
                  <li>추가 사용료의 신청에 있어 30분 미만은 30분으로 간주합니다.</li>
                  <li>
                    이용자의 추가 사용료 결제는 해당일로 한정하며, 해당일 대여 후 24시를 초과하여 반납 시 다음날의
                    요금이 부과됩니다.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </uu-tab>
      </uu-tabs>
    </div>
  </main>
</template>
<script setup lang="ts">
// 탭 선택
const onSelectedTap = () => {
  window.scrollTo(0, 0);
};
</script>
