<template>
  <sub-header title="킥보드/전기자전거 보험 안내" />
  <main id="main" class="main mor">
    <div class="container no_padding bg_white">
      <uu-tabs class="guide_tab" @selected="onSelectedTap">
        <uu-tab title="씽씽">
          <div class="use_money_area">
            <div class="use_money">
              <ul class="dot_list">
                <li>
                  씽씽 라이딩 보험은 이용자가 전동킥보드를 대여하여 사용하는 중 발생하는 사고에 대비하여 씽씽에서 무료로
                  제공하는 보험입니다.
                </li>
                <li>씽씽 라이딩 보험은 전동킥보드 대여 시 자동으로 가입됩니다.</li>
              </ul>
            </div>
            <div class="use_money">
              <table class="table_area">
                <caption class="sr_only">
                  보험 보장내용
                </caption>
                <colgroup>
                  <col width="33.3333%" />
                  <col width="33.3333%" />
                  <col width="33.3333%" />
                </colgroup>
                <thead class="font14">
                  <tr>
                    <th>담보명</th>
                    <th>지급사유</th>
                    <th>지급금액</th>
                  </tr>
                </thead>
                <tbody class="font_noto">
                  <tr>
                    <td>
                      전동킥보드 결함사고 <br />
                      배상
                    </td>
                    <td>
                      보험기간 (대여 운행 중) 내 차체 결함(관리 상 하자포함)으로 인하여 대여 이용자 및 제 3자의 신체에
                      상해를 입히거나 재물을 망가뜨려 손해를 입힌 경우 그 손해를 가입 한도내에서 보상합니다.
                    </td>
                    <td>1인당 최대 3,000만원한도 (자기 부담금 50만원)</td>
                  </tr>
                  <tr>
                    <td>전동킥보드 사고의료비</td>
                    <td>
                      보험기간 (대여 운행 중) 내 발생한 사고로 인하여 대여 이용자의 신체에 손해가 발생한 경우 그
                      치료비를 가입한 도내에서 실비로 보상합니다.
                    </td>
                    <td>50만원한도 (실비)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="use_money">
              <h3>가입대상</h3>
              <ul class="dot_list">
                <li>
                  보험의 보상대상은 ㈜피유엠피(씽씽)의 소유로 유지, 보수, 관리되며 사전에 보험사에 등록되어 일정 조건에
                  맞는 회원에게 대여되는 해당 전동킥보드를 말합니다.
                </li>
              </ul>
            </div>
            <div class="use_money">
              <h3>보험기간</h3>
              <ul class="dot_list">
                <li>
                  대여절차가 끝난 시점부터 반납하는 절차가 시작되는 시점까지 전동킥보드를 이용하는 동안 보장 받을 수
                  있습니다.
                </li>
              </ul>
              <p>
                ※ ‘이용’이란 운행 및 주·정차하는 행위 등을 말하며, 운행하는 행위 및 주·정차하는 행위 등을 제외한 그 외의
                기타 관련이 없는 행위는 ‘이용’으로 보지 않습니다.
              </p>
            </div>
            <div class="use_money">
              <h3>보험금 청구안내</h3>
              <ul class="dot_list">
                <li>보험 일반 및 청구문의 : KP보험서비스 1644-9381</li>
                <li>
                  고객센터 운영 시간 : 평일 09:00 ~ 18:00<br />
                  (점심 12:00 ~ 13:00 / 휴무 토, 일, 공휴일)
                </li>
              </ul>
            </div>
            <div class="use_money">
              <h3>청구서류</h3>
              <ul class="dot_list">
                <li>보험금 청구시(보험사 양식)</li>
                <li>사고증명서(진료비계산서, 사망진단서, 징해진단서, 입원치료 확인서, 의사처방전(처방조제비)등)</li>
                <li>
                  사고증명서는 외국법 제3조(의료기관)에서 규정한 국내의 병원이나 의원 또는 국외의 의료관련법에서 정한
                  의료기관에서 발급한 것이어야 합니다.
                </li>
                <li>
                  신분증(주민등록증이나 운전면허증 등 사진이 붙은 정부기관 발행 신분증, 본인이 아닌 경우에는 본인의
                  인감증명서 또는 본인서명사실확인서 포함)
                </li>
                <li>
                  기타 보험금 등의 수령에 필요하여 제출하는 서류(사망보험금 지급시 피보험자의 법정상속인이 아닌자가
                  청구하는 경우 법 정상속인의 확인서)
                </li>
              </ul>
              <p>※ 필요 시 추가서류 요청이 있을 수 있습니다.</p>
            </div>
          </div>
        </uu-tab>
        <!--240801 현업에서 미노출 요청. 해당서비스 오픈이 지연되어 임시 미노출 처리. -->
        <uu-tab title="빔">
          <div class="use_money_area">
            <div class="use_money">
              <h3>BEAM 보상 및 한도</h3>
              <table class="table_area">
                <caption class="sr_only">
                  BEAM 보상 및 한도
                </caption>
                <colgroup>
                  <col width="25%" />
                  <col width="25%" />
                  <col width="25%" />
                  <col width="25%" />
                </colgroup>
                <thead class="font14">
                  <tr>
                    <th>보상담보</th>
                    <th>보상한도</th>
                    <th>자기부담금</th>
                    <th>자기부담금 <br />주체</th>
                  </tr>
                </thead>
                <tbody class="small_padding">
                  <tr>
                    <td>라이더치료비</td>
                    <td>인당 2백만원</td>
                    <td>20만원</td>
                    <td rowspan="3">라이더(이용자)</td>
                  </tr>
                  <tr>
                    <td>라디어 <br />배상책임(대인)</td>
                    <td>4천만원 <br />(인당, 사고당)</td>
                    <td>50만원</td>
                  </tr>
                  <tr>
                    <td>라이더 <br />배상책임(대물)</td>
                    <td>1천만원 <br />(사고당)</td>
                    <td>50만원</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="use_money">
              <ul class="dot_list mb0">
                <li>
                  자세한 사항 보상 내용, 청구 절차 및 서류는 아래 웹사이트에서 확인해 주시기 바랍니다.<br />
                  (하단 부분 대한민국 → 정책 보기 또는 청구하기)
                </li>
              </ul>
              <div class="beam_insurance">
                <round-box hide-title @click="onClickMoveURLPage(BEAM_WEB)">
                  <div class="info_beam">
                    <div class="img_area">
                      <object :data="imageBasePath + '/assets/images/ic/ic_beam.svg'" />
                    </div>
                    <p class="info_beam">BEAM 웹사이트 바로가기</p>
                  </div>
                </round-box>
              </div>
            </div>
            <div class="use_money">
              <ul class="dot_list mb0">
                <li>도움이 필요하실 경우, 카카오톡 고객센터로 문의 부탁드립니다.</li>
              </ul>
              <div class="beam_insurance">
                <round-box hide-title @click="onClickMoveURLPage(BEAN_CHAT)">
                  <div class="info_beam">
                    <div class="img_area">
                      <object :data="imageBasePath + '/assets/images/ic/ic_beam.svg'" />
                    </div>
                    <p>카카오톡 고객센터 바로가기</p>
                  </div>
                  <uu-ic name="chat" size="24" />
                </round-box>
              </div>
            </div>
          </div>
        </uu-tab>
        <uu-tab title="지쿠">
          <div class="use_money_area">
            <div class="use_money">
              <h3>지쿠케어 보상 및 한도</h3>
              <table class="table_area">
                <caption class="sr_only">
                  지쿠케어 보상 및 한도
                </caption>
                <colgroup>
                  <col width="25%" />
                  <col width="25%" />
                  <col width="25%" />
                  <col width="25%" />
                </colgroup>
                <thead class="font14">
                  <tr>
                    <th>적용 범위</th>
                    <th>보상한도 <br />기기결함</th>
                    <th>보상한도 <br />이용자 <br />과실</th>
                    <th>이용자 <br />부담금</th>
                  </tr>
                </thead>
                <tbody class="small_padding">
                  <tr>
                    <td>
                      대인 <br />사고<br />
                      상대방의 인명피해
                    </td>
                    <td>1.5 억원</td>
                    <td>5 천만원</td>
                    <td>최대 <br />50만원</td>
                  </tr>
                  <tr>
                    <td>
                      대인 <br />사고<br />
                      상대방의 물적피해
                    </td>
                    <td>1 천만원</td>
                    <td>5 백만원</td>
                    <td>최대 <br />50만원</td>
                  </tr>
                  <tr>
                    <td>
                      대인 <br />사고<br />
                      상대방의 인명피해
                    </td>
                    <td>1.5 억원</td>
                    <td>1 백만원</td>
                    <td>최대 <br />20만원</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="use_money">
              <h3>보험 신청 전 확인사항</h3>
              <ul class="dot_list mb0">
                <h4>공통 서류</h4>
                <li>자손 보상은 건강보험 적용 후의 ‘본인 부담 실비’를 한도로 합니다.</li>
                <li>
                  대인/ 대물/ 자손 보험은 ‘자기부담금 최대 20-100만원(선택한 지쿠케어 플랜에 따라 결정)’이 부과됩니다.
                </li>
                <li>
                  무면허운전, 음주운전, 2인 이상 탑승, 신호위반, 횡단보도 주행 등 도로교통법 위반 시 보험혜택이 적용되지
                  않습니다. (인도주행 금지만 위반한 경우, 탑승 중 인도 주행이 불가피 했다면 혜택 적용됨)
                </li>
                <li>보상 범위는 상단의 표를 확인해 주세요.</li>
                <li>비용을 지출한 경우 증빙을 위해 영수증을 챙겨주세요.</li>
                <li>
                  쓰러진 기기에 의한 대물 접수의 경우, 기기가 스스로 쓰러졌음을 확인할 수 있는 블랙박스 영상 등을 확보해
                  주세요.
                </li>
              </ul>
            </div>
          </div>
        </uu-tab>
        <uu-tab title="킥고잉">
          <div class="use_money_area">
            <div class="use_money">
              <h3>킥고잉 보상 및 한도</h3>
              <table class="table_area">
                <caption class="sr_only">
                  킥고잉 보상 및 한도
                </caption>
                <colgroup>
                  <col width="28%" />
                  <col width="28%" />
                  <col width="*" />
                </colgroup>
                <thead class="font14">
                  <tr>
                    <th>사고원인</th>
                    <th>보상범위</th>
                    <th>보상한도</th>
                  </tr>
                </thead>
                <tbody class="font_noto">
                  <tr>
                    <td rowspan="2" class="rowspan">기기결함 (킥보드, 자전거)</td>
                    <td>대인</td>
                    <td>최대 2.5억원</td>
                  </tr>
                  <tr>
                    <td>대물</td>
                    <td>최대 1,000만원</td>
                  </tr>
                  <tr>
                    <td rowspan="3" class="rowspan">라이더 부주의</td>
                    <td>본인 치료비</td>
                    <td>
                      최대 200만원<br />
                      (자기부담금 30만원)
                    </td>
                  </tr>
                  <tr>
                    <td>대인(제3자)</td>
                    <td>
                      최대 4,000만원<br />
                      (자기부담금 50만원)
                    </td>
                  </tr>
                  <tr>
                    <td>대물(제3자)</td>
                    <td>
                      최대 1,000만원<br />
                      (자기부담금 100만원)
                    </td>
                  </tr>
                </tbody>
              </table>
              <p>※ 단, 비정상 대여 시에는 보상을 받을 수 없습니다.</p>
            </div>
            <div class="use_money">
              <h4>※ 비정상 대여</h4>
              <ul class="dot_list mt4">
                <li>음주운전</li>
                <li>2인 이상 탑승</li>
                <li>타인 명의의 계정으로 이용</li>
                <li>면허가 없거나 유효하지 않는 상태</li>
              </ul>
            </div>
            <div class="use_money">
              <h4>적용시점</h4>
              <p>대여가 시작된 시점부터 반납이 완료되기 전 시점까지에서 발생한 피해에 대해서만 적용됩니다.</p>
            </div>
            <div class="use_money">
              <h4>보험 신청 절차</h4>
              <p>사고 발생 시 [메뉴] > 고객지원 > [카카오톡 문의하기]를 통해 사고 접수를 해주세요.</p>
            </div>
            <div class="use_money">
              <h4>킥고잉 고객센터 운영시간</h4>
              <p>
                평일 오전 9시 ~ 오후 6시<br />
                (점심시간 11시 30분 ~ 12시 30분)
              </p>
            </div>
          </div>
        </uu-tab>
        <uu-tab title="쏘카일레클">
          <div class="use_money_area">
            <div class="use_money">
              <h3>쏘카일레클 보험 안내</h3>
              <ul class="dot_list">
                <li>
                  이용자가 티머니GO 앱을 통해 제공받은 전기자전거를 이용하는 중 발생하는 사고에 대비하여 전기자전거 대여
                  시 자동으로 일레클 보험에 가입돼요.
                </li>
              </ul>
            </div>
            <div class="use_money">
              <h4>공공자전거 종합보험 접수 및 처리절차</h4>
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
                  <p>사고가 났다면 앱에서 먼저 이용을 종료해 주세요.</p>
                </li>
                <li>
                  <p>2.</p>
                  <p>보상 서비스 접수(http://elecle-accident.co.kr) 를 통해 접수해 주세요.</p>
                </li>
                <li>
                  <p>3.</p>
                  <p>보상 서비스 접수 센터에서 본인 확인이 완료되면 보상 청구가 진행됩니다.</p>
                </li>
                <li>
                  <p>4.</p>
                  <p>사고 유형별 자기부담금이 있으니 확인해 주세요.</p>
                </li>
              </ol>
            </div>
            <div class="use_money">
              <h3>사고 보상 서비스 보장 내용</h3>
              <h4>대인배상</h4>
              <p>
                이용자가 티머니GO 앱에서 대여한 전기 자전거를 이용하는 중에 발생한 사고로 인한 제3자 신체 부상에 대한
                배상
              </p>
              <ul class="dot_list mt4">
                <li>보상한도액: 1인당 1억 / 1사고당 3억 원</li>
                <li>자기부담금: 1사고당 20만 원 (음주운전 사고 시 300만 원)</li>
              </ul>
              <h4>대물배상</h4>
              <p>
                이용자가 티머니GO 앱에서 대여한 전기 자전거를 이용하는 중에 발생한 사고로 인한 제3자의 재산 피해에 대한
                배상
              </p>
              <ul class="dot_list mt4">
                <li>보상한도액: 1인당 200만 원</li>
                <li>자기부담금: 1사고당 20만 원 (음주운전 사고 시 100만 원)</li>
              </ul>
              <h4>구내 치료비</h4>
              <p>이용자가 티머니GO 앱에서 대여한 전기 자전거를 이용하는 중에 발생한 사고로 인한 이용자의 치료비 배상</p>
              <ul class="dot_list mt4">
                <li>보상한도액: 1인당 2백만 원 / 1사고당 3백만 원</li>
                <li>자기부담금: 1사고당 20만 원</li>
              </ul>
            </div>
            <div class="use_money">
              <div class="ticket_notice">
                <p class="title">
                  <uu-ic size="16" name="exclamation_gray090" />
                  유의사항
                </p>
                <ul>
                  <li>
                    티머니GO 앱을 통하여 정상적으로 이용을 인증받지 않은 사람이 이용하여 발생한 사고의 경우 보상이 되지
                    않습니다.
                  </li>
                  <li>
                    티머니GO 앱에서 이용을 인증받은 티머니GO 회원 명의와 실제 이용자의 명의가 다른 경우 보상이 되지
                    않습니다.
                  </li>
                  <li>
                    구내치료비 담보는 국민건강보험을 적용하는 경우에 해당됩니다. 단, 외국인 등 기타 미적용 대상은
                    포함합니다.
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
import { getAppBridge } from '@/utils';

const imageBasePath = import.meta.env.VITE_IMAGE_BASE_PATH;
const BEAM_WEB = 'https://www.ridebeam.com/rider-insurance';
const BEAN_CHAT = 'http://pf.kakao.com/_dLAxeK';
// 탭 선택
const onSelectedTap = () => {
  window.scrollTo(0, 0);
};
// 외부브라우저 이동
const onClickMoveURLPage = async (url: string) => {
  const appBridge = await getAppBridge();
  await appBridge.openView({
    url: url,
    viewType: 'ex'
  });
};
</script>
