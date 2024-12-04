<template>
  <sub-header title="공공자전거 보험 안내" />
  <main id="main" class="main mor">
    <div class="container no_padding bg_white">
      <uu-tabs class="guide_tab" own-size-tab-center @selected="onSelectedTap">
        <uu-tab title="따릉이">
          <div class="use_money_area">
            <div class="use_money">
              <h3>공공자전거 종합보험 안내</h3>
              <ul class="dot_list">
                <li>
                  서울형 공공자전거의 이용자가 자전거를 대여하여 사용하는 중에 발생한 사고에 대비하여 2022년 01월 01일로
                  ㈜DB손해보험, 한화손해보험㈜, ㈜KB손해보험, ㈜삼성화재해상보험, 현대해상화재보험㈜ 공통 보험계약을
                  체결함으로 아래와 같이 보장내용 및 청구방법을 안내드립니다.
                </li>
              </ul>
              <table class="table_area type2">
                <caption class="sr_only">
                  공공자전거 종합보험 안내
                </caption>
                <colgroup>
                  <col width="36%" />
                  <col width="*" />
                </colgroup>
                <thead class="sr_only">
                  <tr>
                    <th>종류</th>
                    <th>내용</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>보험계약자</th>
                    <td>서울시설공단</td>
                  </tr>
                  <tr>
                    <th>피보험자</th>
                    <td>서울 공공자전거 ‘따릉이’ 이용자</td>
                  </tr>
                  <tr>
                    <th>수익자</th>
                    <td>피보험자 본인(사망시 법정상속인)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="use_money">
              <h3>보험 보장내용</h3>
              <table class="table_area">
                <caption class="sr_only">
                  보험 보장내용
                </caption>
                <colgroup>
                  <col width="28%" />
                  <col width="44%" />
                  <col width="28%" />
                </colgroup>
                <thead class="font14">
                  <tr>
                    <th>회원구분</th>
                    <th>보장내용</th>
                    <th>보장 한도액</th>
                  </tr>
                </thead>
                <tbody class="font_noto">
                  <tr>
                    <td>공공자전거 상해사망</td>
                    <td>
                      보험기간중 공공자전거 이용중에 발생한 자전거 교통사고로 사망시(만 15세 미만자 제외)<br />
                      ※타제도와 관계없이 중복보상
                    </td>
                    <td>2천만원</td>
                  </tr>
                  <tr>
                    <td>공공자전거<br />후유장애</td>
                    <td>
                      보험기간중 공공자전거 이용중에 발생한 자전거 교통사고로 후유장해시 (3%~100%)<br />
                      ※타제도와 관계없이 중복보상<br />
                      ※상해에 따른 치료비는 보상하지 않습니다.
                    </td>
                    <td>2천만원 한도</td>
                  </tr>
                  <tr>
                    <td colspan="3">
                      '후유장해'라 함은 상해에 대하여 치유된후 신체에 <br />
                      남아있는 영구적인 정신 또는 육체의 훼손상태를 말합니다.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      공공자전거<br />치료비<br />
                      ※ 2016.09.19 부터
                    </td>
                    <td>
                      보험기간중 공공자전거 이용중에 발생한 자전거 교통사고로 사망시(만 15세 미만자 제외) ※타제도와
                      관계없이 중복보상
                    </td>
                    <td>
                      3백만원 한도<br />
                      (본인부담금 10만원)
                    </td>
                  </tr>
                  <tr>
                    <td>공공자전거<br />사고배상책임</td>
                    <td>
                      보험기간중 공공자전거 이용중에 발생한 자전거 교통사고로 후유장해시 (3%~100%)<br />
                      ※타제도와 관계없이 중복보상<br />
                      ※상해에 따른 치료비는 보상하지 않습니다.
                    </td>
                    <td>
                      2백만원 한도<br />
                      (본인부담금 10만원)
                    </td>
                  </tr>
                </tbody>
              </table>
              <ul class="dot_list">
                <li>
                  공공자전거란?<br />
                  공공자전거라 함은 공공자전거 사업자의 소유로 일정 조건에 맞는 회원에게 대여되는 해당 자전거를 말하며,
                  여기에서 자전거란 핸들 또는 페달을 이용하여 인력에 의하여 운전하는 2륜 이상의 차(레일에 의해 운전하는
                  차, 신체장애자용 휠체어 및 유아용 3륜 이상의 차를 제외) 및 그 부속품(적재물 포함)을 말합니다.
                </li>
              </ul>
              <ul class="dot_list">
                <li>
                  공공자전거 이용중이란?<br />
                  공공자전거를 대여하는 절차가 끝난 시점부터 반납하는 절차가 시작되는 시점까지 공공자전거를 운행,
                  주·정차하는 행위등을 말합니다. 운행하는 행위, 주·정차하는 행위 등을 제외한 기타 공공자전거와 관련이
                  없는 행위는 “이용”으로 보지 않습니다. ※ 단, 사고 발생일자로부터 1년 이내에 발생한 치료비 보상 가능함.
                </li>
              </ul>
            </div>
            <div class="use_money line">
              <h4 class="mb8">공공자전거 종합보험 접수 및 처리절차</h4>
              <ul class="dot_list">
                <li>
                  접수 : DB손해보험(Tel : 02-1899-7751)<br />
                  ※ 서울시에서 사고 접수시 사고자 및 보험사에 안내
                </li>
                <li>처리 : 보험사에서 접수일로부터 7일이내 처리후 개별통보</li>
                <li>보험금 지급 사유별 첨부서류</li>
              </ul>
              <ol class="step_list">
                <li>
                  <p>1.</p>
                  <p>
                    공통서류 : 보험금청구서(사고장소 반드시 기재), 주민등록등(초)본, 신분증사본, 통장사본, 초진진료차트,
                    공공자전거 대여 사실 확인서 또는 이용대장※ 미성년자(만19세미만)는 부모님중 한분의 신분증, 통장사본
                    제출
                  </p>
                </li>
                <li>
                  <p>2.</p>
                  <p>
                    사망 - 사망진단서(또는 사체검안서), 가족관계등록부, 가족관계증명서, 대표자 위임장 및 법정상속인의
                    인감증명서(상속인이 다수인 경우 각각의 인감날인 및 인감증명서 필요),기타 가족관계에 따라 혼인/ 입양/
                    친양자 관계증명서, 교통사고사실확인원(차대자전거 사고시)
                  </p>
                </li>
                <li>
                  <p>3.</p>
                  <p>
                    후유장해 - 입원 또는 치료병원에서 발급한 후유장해진단서, 운동장해인 경우에는 AMA방식의
                    장해진단서(장애인복지법상의 장해진단서는 해당되지 않음), 최초 및 최종필름 (X-ray 혹은 MRI 혹은 CT),
                    교통사고사실확인원(차대자전거 사고시)
                  </p>
                </li>
                <li>
                  <p>4.</p>
                  <p>배상책임 - 손해배상금 및 그밖의 비용을 지급하였음을 증명하는 서류, 보험사가 요구하는 기타서류</p>
                </li>
              </ol>
              <ul class="dot_list mb0">
                <li>(DB손해보험(☏1899-7751, 콜센터)에 접수후 안내)</li>
              </ul>
            </div>
            <div class="use_money">
              <h3>영조물 배상공제 안내</h3>
              <ul class="dot_list">
                <li>이용 가능시간은 첫 회 대여시점을 기준으로 계산합니다.</li>
                <li>서울자전거 모든 대여소에서 사용이 가능합니다.</li>
                <li>취소, 환불은 서울자전거 환불규정에 따릅니다.</li>
                <li>
                  이용권을 다른 사람에게 양도할 수 없으며, 양도로 인해 발생하는 불이익은 구매자가 책임지셔야 합니다.
                </li>
              </ul>
              <table class="table_area">
                <caption class="sr_only">
                  영조물 배상공제 안내
                </caption>
                <colgroup>
                  <col width="28%" />
                  <col width="44%" />
                  <col width="28%" />
                </colgroup>
                <thead class="font14">
                  <tr>
                    <th>구분</th>
                    <th>보장내용</th>
                    <th>보장 한도액</th>
                  </tr>
                </thead>
                <tbody class="font_noto">
                  <tr>
                    <td>공공자전거 이용중 <br />대안 사고</td>
                    <td>
                      공공자전거 이용중 공공 자전거 결함, 관리상 하자로 인해 이용자 본인 및 제3자의 신체가 장해를 입은
                      경우<br />
                      ※신체장해란 신체의 상해, 질병 및 그로 인한 사망을 말합니다.
                    </td>
                    <td>1인당 <br />1억원</td>
                  </tr>
                  <tr>
                    <td>공공자전거 이용중 <br />대물 사고</td>
                    <td>
                      공공자전거 이용중 공공 자전거 결함 관리상 하자로 인해 이용자 본인 및 제3자의 재물이 망가진 경우
                    </td>
                    <td>1사고당 <br />3억원</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="use_money">
              <h4 class="mb8">영조물 손해배상 보험 접수 및 처리 안내</h4>
              <ul class="dot_list">
                <li>
                  접수 : 공공자전거 사고 당사자 →<br />
                  서울시설공단(Tel : 02-1599-0120) → 한국지방재정공제회<br />
                  ※ 붙임 : 영조물 사고접수 양식에 따라 접수
                </li>
                <li>처리 : 한국지방재정공제회의 위임을 받은 손해보험사에서 배상금 지급 개별통지</li>
              </ul>
            </div>
            <div class="use_money">
              <ul class="notice_list">
                <li>
                  <p>※</p>
                  <p>
                    공공자전거 결함, 관리상 하자의 입증책임은 이용자 본인에게 있으므로, 사고 발생 당시 반드시 증빙자료를
                    수집하여 영조물 손해배상 보험 접수 시 첨부하여 주시기 바랍니다.
                  </p>
                </li>
                <li>
                  <p>※</p>
                  <p>증빙자료 : 사고 직후 촬영한 자전거 사진 또는 동영상, 인적·물적 피해를 증명할 수 있는 사진 등</p>
                </li>
              </ul>
            </div>
          </div>
        </uu-tab>
        <uu-tab title="타슈">
          <div class="use_money_area">
            <div class="use_money">
              <h3>대전광역시 시민을 위한 자전거보험 안내</h3>
              <ul class="dot_list">
                <li>
                  대전광역시에 주소를 두고 거주하는 시민의 자전거로 인한 사고에 대비 및 자전거 활성화를 위하여 2021년
                  5월 28일로 DB손해보험과 보험계약을 체결함으로 아래와 같이 보장내용 및 정구방법을 안내드립니다.
                </li>
              </ul>
            </div>
            <div class="use_money">
              <h3>기본정보</h3>
              <h4 class="mb8">보험기간</h4>
              <ul class="dot_list">
                <li>2022년 5월 29일 00:00 부터 2023년 5월 27일 24:00 까지 (1년)</li>
              </ul>
              <h4 class="mb8">보험계약자</h4>
              <ul class="dot_list">
                <li>대전광역시청</li>
              </ul>
              <h4 class="mb8">피보험자</h4>
              <ul class="dot_list">
                <li>대전광역시에 주민등록을 두고 대전광역시에 거주하는 시민 전체 (외국인등록자포함)</li>
              </ul>
              <h4 class="mb8">수익자</h4>
              <ul class="dot_list">
                <li>피보험자 본인 (사망시 법정상속인)</li>
              </ul>
            </div>
            <div class="use_money">
              <h3>보장내용</h3>
              <table class="table_area">
                <caption class="sr_only">
                  보장내용
                </caption>
                <colgroup>
                  <col width="30%" />
                  <col width="70%" />
                </colgroup>
                <thead class="font14">
                  <tr>
                    <th>보장명</th>
                    <th>보험금 지급사유</th>
                  </tr>
                </thead>
                <tbody class="font_noto">
                  <tr>
                    <td>
                      자전거사망,후유장해<br />
                      <span>(15세 미만자 사망제외)</span>
                    </td>
                    <td>
                      보험기간 중 자전거 또는 PM사고로 그 직접적인 결과로 인해 사망 17,000,000원<br />
                      후유장해시(3%~100%) 타제도와 관계없이 후유장해시 13,000,000원 한도
                    </td>
                  </tr>
                  <tr>
                    <td>자전거상해 진단 위로금</td>
                    <td>
                      자전거 또는 PM 교통사고로 4주 이상의 치료를 요한다는 진단을 받은 경우 진단일에 따라 지급 (최초
                      진단기준, 1회에 한해 지급)<br />
                      - 진단 4주(28일)이상 : 10만원<br />
                      - 진단 5주(35일)이상 : 20만원<br />
                      - 진단 6주(42일)이상 : 30만원<br />
                      - 진단 7주(49일)이상 : 40만원<br />
                      - 진단 8주(56일)이상 : 50만원<br />
                      ※ 단, 6일 이상 입원시 추가로 20만원 지급
                    </td>
                  </tr>
                  <tr>
                    <td>
                      자전거사고 벌금<br />
                      <span>(만14세 미만자 제외)</span>
                    </td>
                    <td>
                      시민이 자전거 또는 PM 운전 중 타인을 사상케하여 확정판결로 벌금을 부담하는 경우<br />
                      1사고당 2,000만원 한도 내 실비보상
                    </td>
                  </tr>
                  <tr>
                    <td>
                      자전거사고 변호사 선임비용
                      <span>(만14세 <br />미만자 제외)</span>
                    </td>
                    <td>
                      시민이 자전거 또는 PM 운전 중 타인을 사상케하여 구속영장에 의해 구속되거나 검창게 의해 공소 제기된
                      경우<br />
                      1사고당 200만원 한도 내 실비보상
                    </td>
                  </tr>
                  <tr>
                    <td>
                      자전거 교통사고 처리지원금
                      <span>(만14세 <br />미만자 제외)</span>
                    </td>
                    <td>
                      시민이 자전거 또는 PM 운전 중 타인(가족제외, 동승자포함)을 사망케 하거나 중대법규위반 사고로
                      6주이상 진단에 해당하는 경우, 중상해를 입히는 등의 사유로 검찰에 공소제기되어 형사합의를 봐야할
                      경우 1사고당 30,000,000만원 한도 내 실비보상
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="use_money line">
              <h3>보험금 지급사유별 첨부서류</h3>
              <h4 class="mb8">공통서류</h4>
              <ul class="dot_list">
                <li>
                  보험금청구서, 신분증사본(미성년자일경우는 부모님 중 한 분의 신분증), 통장사본(미성년자일경우는 부모님
                  중 한 분의 통장사본), 주민등록초본(미성년자일경우는초본과 등본), 최초진단서(진단 주 기재),
                  초진진료차트(자전거상해내용기재), 입퇴원확인서(6일이상입원시)<br />
                  ※ 사고장소는 반드시 기재해주시기 바랍니다. 미 기재시 보험금 지급에 제한이 있을수 있습니다.
                </li>
              </ul>
              <h4 class="mb8">후유장애</h4>
              <ul class="dot_list">
                <li>
                  장해진단서(입원 또는 치료병원)<br />
                  다만, 운동장해의 경우 AMA식 장해진단서, 장애인복지법상의 장해 진단서는 해당되지 않음<br />
                  ※ 원본으로 우편 접수만 가능합니다.
                </li>
              </ul>
              <h4 class="mb8">사망</h4>
              <ul class="dot_list mb0">
                <li>
                  사망진단서, 기본증명서, 가족관계증명서, 혼인증명서, 위임장, 인감증명서(위임장에 기재된 모든 분들),
                  지급결의서, 교통사고확인서<br />
                  ※ 원본으로 우편 접수만 가능합니다.
                </li>
              </ul>
            </div>
            <div class="use_money">
              <ul class="dot_list mb0">
                <li>보험금 관련 서류 및 기타 문의는 아래 번호를 통하여 주시면 됩니다.</li>
              </ul>
            </div>
            <div class="use_money">
              <div class="footer_info">
                <p>
                  Tel : <span>1899-7751</span><br />
                  Fax : <span>0505-137-0051</span><br />
                  email : <span>a18997751@hanmail.net</span>
                </p>
                <div class="img_area">
                  <img src="/assets/images/guide/logo_db.png" alt="DB손해보험 로고" />
                </div>
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
