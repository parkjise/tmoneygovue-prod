<template>
  <!-- header -->
  <sub-header title="렌터카 이용안내" />
  <!-- // header -->
  <!-- main -->
  <main id="main" class="main mor">
    <div class="container no_padding bg_white">
      <uu-tabs
        class="guide_tab"
        :tabIndex="tabIndex"
        :tabLinkHide="guideTabHide"
        :tabHide="guideTabHide"
        @selected="onSelectedTap"
      >
        <uu-tab title="이용안내">
          <div class="use_money_area">
            <div class="use_money">
              <h3>제주도 렌터카 예약하기</h3>
              <h4>원하는 차종을 선택후, 제주도 여정을 즐기세요.</h4>
              <ol class="step_list">
                <li>
                  <p>1.</p>
                  <p>대여 기간과 운전자 나이를 설정한 후 원하는 차량을 예약합니다.</p>
                </li>
                <li>
                  <p>2.</p>
                  <p>
                    이용 당일 제주공항에서 업체 차고지까지 무료 셔틀을 타고 이동하여 차량을
                    인수받습니다.
                  </p>
                </li>
                <li>
                  <p>3.</p>
                  <p>
                    업체 차고지로 차량을 반납합니다. 공항까지 무료 셔틀을 타고 이동할 수 있습니다.
                  </p>
                </li>
              </ol>
            </div>
            <div class="use_money">
              <h3>렌터카 배달받기</h3>
              <h4>언제 어디서든 부르는 위치로 차량이 배달됩니다.</h4>
              <ol class="step_list">
                <li>
                  <p>1.</p>
                  <p>
                    원하는 장소를 검색하고, 대여 기간과 운전자 나이를 설정한 후 원하는 차량을
                    예약합니다.
                  </p>
                </li>
                <li>
                  <p>2.</p>
                  <p>
                    이용 당일 제휴사 기사님이 차량을 배달해 드립니다. 모바일 계약서 확인 또는 작성
                    후 차 키를 전달 받습니다. 면허증을 지참해 주세요!
                  </p>
                </li>
                <li>
                  <p>3.</p>
                  <p>반납 장소는 대여 장소와 동일합니다.</p>
                </li>
              </ol>
              <uu-accordion class="accordion_rentalcar">
                <uu-accordion-item>
                  <template #accordion_header> 더보기 </template>
                  <template #accordion_body>
                    <ul class="dot_list mb0">
                      <li>
                        차량 배달 준비 시간 확보를 위해 최소 2시간 이후부터 예약이 가능합니다. (최대
                        3개월 후까지 예약 가능)
                      </li>
                      <li>
                        각 업체 운영시간이 상이할 수 있습니다.<br />
                        내륙 : 09:00 ~ 21:00<br />
                        제주도 : 08:30 ~ 20:00<br />
                        울릉도 : 10:30 ~ 22:30 (고정)
                      </li>
                      <li>
                        만 21세 미만 및 면허 취득일 1년 미만 사용자는 렌터카 이용이 불가합니다.
                      </li>
                      <li>
                        실제 이용자가 예약 당시 입력한 운전자가 아니거나, 면허조건이 부합하지 않은
                        경우 차량 이용이 불가합니다.
                      </li>
                      <li>
                        예약 이후에는 취소 시점에 따라 취소 수수료가 발생할 수 있습니다. 지역에 따라
                        취소 수수료 발생 기준이 상이 하므로 FAQ의 상세 내용을 확인해주요.
                      </li>
                    </ul>
                  </template>
                </uu-accordion-item>
              </uu-accordion>
            </div>
            <div class="use_money">
              <h3>확인해주세요!</h3>
              <h4 class="mb8">주유 및 통행 요금</h4>
              <p>주유비, 통행 요금 등 이용 중 필요한 결제는 개인 카드를 이용해주세요.</p>
              <h4 class="mt12 mb8">대여 시간 조정</h4>
              <p>
                대여 시간 조정이 필요할 때는 업체와 협의 부탁드립니다. 조기 반납 시 업체와 협의 후
                이용료를 환급받을 수 있습니다.
              </p>
              <h4 class="mt12 mb8">사고</h4>
              <p>발생 즉시 렌터카 업체와 통화해주세요. 보험 처리 방법을 안내드립니다.</p>
            </div>
          </div>
        </uu-tab>
        <uu-tab title="보험/문의">
          <div class="use_money_area">
            <div class="use_money">
              <h3>사고시 보상 서비스</h3>
              <h5>항목별 보상 한도와 본인 부담금을 확인하세요.</h5>
              <div class="img_rentalcar" tabindex="0">
                <img
                  src="/assets/images/guide/ic_car insurance_graph.png"
                  alt="월정액 (지료비, 수리비 등) 본인 부담, 보상받는 돈 보상한도"
                />
              </div>
              <p>
                인명 치료, 차량 수리 등 사고로 발생한 금액에서 본인 부담금 제외 후 보상해 드립니다.
                아래와 같이 대상에 따라 적용 금액이 다릅니다.
              </p>
            </div>
            <div class="use_money">
              <uu-tabs class="rantalcar_tab" :tabHide="tabHide" :tabIndex="rntAreaIndex">
                <uu-tab title="내륙보험">
                  <uu-tabs
                    class="category_car_tab"
                    :tabLinkHide="tabHide"
                    :tabIndex="vhclKndIndex[0]"
                  >
                    <uu-tab title="승용">
                      <uu-tabs
                        class="segment_tab"
                        :tabLinkHide="tabHide"
                        :tabIndex="inInscIndex[0]"
                      >
                        <uu-tab title="컴팩트">
                          <div class="insurance_table">
                            <table>
                              <caption class="sr_only">
                                보험문의 내륙보험 승용
                              </caption>
                              <colgroup>
                                <col width="33.333%" />
                                <col width="33.333%" />
                                <col width="33.333%" />
                              </colgroup>
                              <thead>
                                <tr>
                                  <th>구분</th>
                                  <th>본인부담</th>
                                  <th>보상한도</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td class="category">
                                    <span>자차</span>
                                    <span class="car">본인차량</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">경소형</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>400만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">준중형, 중형</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>700만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">준대형, 대형</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>1,000만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>자손</span>
                                    <span class="car">운전자 본인</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>1,500만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>대물</span>
                                    <span class="car">상대 차량</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>3,000만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>대인</span>
                                    <span class="car">상대 운전자</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>무한</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </uu-tab>
                        <uu-tab title="베이직플러스">
                          <div class="insurance_table">
                            <table>
                              <caption class="sr_only">
                                보험문의 제주보험 승용 고급
                              </caption>
                              <colgroup>
                                <col width="33.333%" />
                                <col width="33.333%" />
                                <col width="33.333%" />
                              </colgroup>
                              <thead>
                                <tr>
                                  <th>구분</th>
                                  <th>본인부담</th>
                                  <th>보상한도</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td class="category">
                                    <span>자차</span>
                                    <span class="car">본인차량</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">경소형</span>
                                  </td>
                                  <td>0원</td>
                                  <td>400만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">준중형, 중형</span>
                                  </td>
                                  <td>0원</td>
                                  <td>700만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">준대형, 대형</span>
                                  </td>
                                  <td>0원</td>
                                  <td>1,000만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>자손</span>
                                    <span class="car">운전자 본인</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>1,500만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>대물</span>
                                    <span class="car">상대 차량</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>3,000만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>대인</span>
                                    <span class="car">상대 운전자</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>무한</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </uu-tab>
                      </uu-tabs>
                    </uu-tab>
                    <uu-tab title="SUV">
                      <uu-tabs
                        class="segment_tab"
                        :tabLinkHide="tabHide"
                        :tabIndex="inInscIndex[1]"
                      >
                        <uu-tab title="컴팩트">
                          <div class="insurance_table">
                            <table>
                              <caption class="sr_only">
                                보험문의 내륙보험 SUV
                              </caption>
                              <colgroup>
                                <col width="33.333%" />
                                <col width="33.333%" />
                                <col width="33.333%" />
                              </colgroup>
                              <thead>
                                <tr>
                                  <th>구분</th>
                                  <th>본인부담</th>
                                  <th>보상한도</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td class="category">
                                    <span>자차</span>
                                    <span class="car">본인차량</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">초호형, 소형</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>500만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">준중형, 중형</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>700만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">준대형, 대형</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>1,000만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>자손</span>
                                    <span class="car">운전자 본인</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>1,500만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>대물</span>
                                    <span class="car">상대 차량</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>3,000만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>대인</span>
                                    <span class="car">상대 운전자</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>무한</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </uu-tab>
                        <uu-tab title="베이직플러스">
                          <div class="insurance_table">
                            <table>
                              <caption class="sr_only">
                                보험문의 제주보험 SUV 고급
                              </caption>
                              <colgroup>
                                <col width="33.333%" />
                                <col width="33.333%" />
                                <col width="33.333%" />
                              </colgroup>
                              <thead>
                                <tr>
                                  <th>구분</th>
                                  <th>본인부담</th>
                                  <th>보상한도</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td class="category">
                                    <span>자차</span>
                                    <span class="car">본인차량</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">초호형, 소형</span>
                                  </td>
                                  <td>0원</td>
                                  <td>500만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">준중형, 중형</span>
                                  </td>
                                  <td>0원</td>
                                  <td>700만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">준대형, 대형</span>
                                  </td>
                                  <td>0원</td>
                                  <td>1,000만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>자손</span>
                                    <span class="car">운전자 본인</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>1,500만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>대물</span>
                                    <span class="car">상대 차량</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>3,000만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>대인</span>
                                    <span class="car">상대 운전자</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>무한</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </uu-tab>
                      </uu-tabs>
                    </uu-tab>
                    <uu-tab title="캠핑카">
                      <uu-tabs
                        class="segment_tab"
                        :tabLinkHide="tabHide"
                        :tabIndex="inInscIndex[2]"
                      >
                        <uu-tab title="컴팩트">
                          <div class="insurance_table">
                            <table>
                              <caption class="sr_only">
                                보험문의 내륙보험 캠핑카
                              </caption>
                              <colgroup>
                                <col width="33.333%" />
                                <col width="33.333%" />
                                <col width="33.333%" />
                              </colgroup>
                              <thead>
                                <tr>
                                  <th>구분</th>
                                  <th>본인부담</th>
                                  <th>보상한도</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td class="category">
                                    <span>자차</span>
                                    <span class="car">본인차량</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>2,500만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>자손</span>
                                    <span class="car">운전자 본인</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>1,500만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>대물</span>
                                    <span class="car">상대 차량</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>1억</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>대인</span>
                                    <span class="car">상대 운전자</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>무한</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </uu-tab>
                        <uu-tab title="베이직플러스">
                          <div class="insurance_table">
                            <table>
                              <caption class="sr_only">
                                보험문의 내륙보험 캠핑카
                              </caption>
                              <colgroup>
                                <col width="33.333%" />
                                <col width="33.333%" />
                                <col width="33.333%" />
                              </colgroup>
                              <thead>
                                <tr>
                                  <th>구분</th>
                                  <th>본인부담</th>
                                  <th>보상한도</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td class="category">
                                    <span>자차</span>
                                    <span class="car">본인차량</span>
                                  </td>
                                  <td>0원</td>
                                  <td>2,500만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>자손</span>
                                    <span class="car">운전자 본인</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>1,500만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>대물</span>
                                    <span class="car">상대 차량</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>1억</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>대인</span>
                                    <span class="car">상대 운전자</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>무한</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </uu-tab>
                      </uu-tabs>
                    </uu-tab>
                    <uu-tab title="기타(프리미엄, 승합, 수입)">
                      <uu-tabs
                        class="segment_tab"
                        :tabLinkHide="tabHide"
                        :tabIndex="inInscIndex[3]"
                      >
                        <uu-tab title="컴팩트">
                          <div class="insurance_table">
                            <table>
                              <caption class="sr_only">
                                보험문의 내륙보험 기타(프리미엄, 승합, 수입)
                              </caption>
                              <colgroup>
                                <col width="33.333%" />
                                <col width="33.333%" />
                                <col width="33.333%" />
                              </colgroup>
                              <thead>
                                <tr>
                                  <th>구분</th>
                                  <th>본인부담</th>
                                  <th>보상한도</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td class="category">
                                    <span>자차</span>
                                    <span class="car">본인차량</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">승합</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>1,000만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">프리미엄</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>2,000만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">수입, 슈퍼카</span>
                                  </td>
                                  <td>100만 원</td>
                                  <td>2,000만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>자손</span>
                                    <span class="car">운전자 본인</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>1,500만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>대물</span>
                                    <span class="car">상대 차량</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>3,000만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>대인</span>
                                    <span class="car">상대 운전자</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>무한</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </uu-tab>
                        <uu-tab title="베이직플러스">
                          <div class="insurance_table">
                            <table>
                              <caption class="sr_only">
                                보험문의 내륙보험 기타(프리미엄, 승합, 수입)
                              </caption>
                              <colgroup>
                                <col width="33.333%" />
                                <col width="33.333%" />
                                <col width="33.333%" />
                              </colgroup>
                              <thead>
                                <tr>
                                  <th>구분</th>
                                  <th>본인부담</th>
                                  <th>보상한도</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td class="category">
                                    <span>자차</span>
                                    <span class="car">본인차량</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">승합</span>
                                  </td>
                                  <td>0원</td>
                                  <td>1,000만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">프리미엄</span>
                                  </td>
                                  <td>0원</td>
                                  <td>2,000만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">수입, 슈퍼카</span>
                                  </td>
                                  <td>0원</td>
                                  <td>2,000만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>자손</span>
                                    <span class="car">운전자 본인</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>1,500만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>대물</span>
                                    <span class="car">상대 차량</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>3,000만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>대인</span>
                                    <span class="car">상대 운전자</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>무한</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </uu-tab>
                      </uu-tabs>
                    </uu-tab>
                  </uu-tabs>
                </uu-tab>

                <uu-tab title="제주보험">
                  <uu-tabs
                    class="category_car_tab"
                    :tabLinkHide="tabHide"
                    :tabIndex="vhclKndIndex[1]"
                  >
                    <uu-tab title="승용">
                      <uu-tabs
                        class="segment_tab"
                        :tabLinkHide="tabHide"
                        :tabIndex="jejuInscIndex[0]"
                      >
                        <uu-tab title="컴팩트">
                          <div class="insurance_table">
                            <table>
                              <caption class="sr_only">
                                보험문의 제주보험 승용 일반
                              </caption>
                              <colgroup>
                                <col width="33.333%" />
                                <col width="33.333%" />
                                <col width="33.333%" />
                              </colgroup>
                              <thead>
                                <tr>
                                  <th>구분</th>
                                  <th>본인부담</th>
                                  <th>보상한도</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td class="category">
                                    <span>자차</span>
                                    <span class="car">본인차량</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">경소형</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>200만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">준중형, 중형</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>300만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">준대형, 대형</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>400만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>자손</span>
                                    <span class="car">운전자 본인</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>1,500만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>대물</span>
                                    <span class="car">상대 차량</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>2,000만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>대인</span>
                                    <span class="car">상대 운전자</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>무한</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </uu-tab>
                        <uu-tab title="베이직플러스">
                          <div class="insurance_table">
                            <table>
                              <caption class="sr_only">
                                보험문의 제주보험 승용 고급
                              </caption>
                              <colgroup>
                                <col width="33.333%" />
                                <col width="33.333%" />
                                <col width="33.333%" />
                              </colgroup>
                              <thead>
                                <tr>
                                  <th>구분</th>
                                  <th>본인부담</th>
                                  <th>보상한도</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td class="category">
                                    <span>자차</span>
                                    <span class="car">본인차량</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">경소형</span>
                                  </td>
                                  <td>0원</td>
                                  <td>200만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">준중형, 중형</span>
                                  </td>
                                  <td>0원</td>
                                  <td>300만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">준대형, 대형</span>
                                  </td>
                                  <td>0원</td>
                                  <td>400만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>자손</span>
                                    <span class="car">운전자 본인</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>1,500만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>대물</span>
                                    <span class="car">상대 차량</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>2,000만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>대인</span>
                                    <span class="car">상대 운전자</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>무한</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </uu-tab>
                        <uu-tab title="프리미엄">
                          <div class="insurance_table">
                            <table>
                              <caption class="sr_only">
                                보험문의 제주보험 승용 프리미엄
                              </caption>
                              <colgroup>
                                <col width="33.333%" />
                                <col width="33.333%" />
                                <col width="33.333%" />
                              </colgroup>
                              <thead>
                                <tr>
                                  <th>구분</th>
                                  <th>본인부담</th>
                                  <th>보상한도</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td class="category">
                                    <span>자차</span>
                                    <span class="car">본인차량</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">경소형</span>
                                  </td>
                                  <td>0원</td>
                                  <td>무제한</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">준중형, 중형</span>
                                  </td>
                                  <td>0원</td>
                                  <td>무제한</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">준대형, 대형</span>
                                  </td>
                                  <td>0원</td>
                                  <td>무제한</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>자손</span>
                                    <span class="car">운전자 본인</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>1,500만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>대물</span>
                                    <span class="car">상대 차량</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>2,000만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>대인</span>
                                    <span class="car">상대 운전자</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>무한</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </uu-tab>
                      </uu-tabs>
                    </uu-tab>
                    <uu-tab title="SUV">
                      <uu-tabs
                        class="segment_tab"
                        :tabLinkHide="tabHide"
                        :tabIndex="jejuInscIndex[1]"
                      >
                        <uu-tab title="컴팩트">
                          <div class="insurance_table">
                            <table>
                              <caption class="sr_only">
                                보험문의 제주보험 SUV 일반
                              </caption>
                              <colgroup>
                                <col width="33.333%" />
                                <col width="33.333%" />
                                <col width="33.333%" />
                              </colgroup>
                              <thead>
                                <tr>
                                  <th>구분</th>
                                  <th>본인부담</th>
                                  <th>보상한도</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td class="category">
                                    <span>자차</span>
                                    <span class="car">본인차량</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">경소형</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>300만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">준중형, 중형</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>400만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">준대형, 대형</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>400만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>자손</span>
                                    <span class="car">운전자 본인</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>1,500만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>대물</span>
                                    <span class="car">상대 차량</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>2,000만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>대인</span>
                                    <span class="car">상대 운전자</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>무한</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </uu-tab>
                        <uu-tab title="베이직플러스">
                          <div class="insurance_table">
                            <table>
                              <caption class="sr_only">
                                보험문의 제주보험 SUV 고급
                              </caption>
                              <colgroup>
                                <col width="33.333%" />
                                <col width="33.333%" />
                                <col width="33.333%" />
                              </colgroup>
                              <thead>
                                <tr>
                                  <th>구분</th>
                                  <th>본인부담</th>
                                  <th>보상한도</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td class="category">
                                    <span>자차</span>
                                    <span class="car">본인차량</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">경소형</span>
                                  </td>
                                  <td>0원</td>
                                  <td>300만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">준중형, 중형</span>
                                  </td>
                                  <td>0원</td>
                                  <td>400만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">준대형, 대형</span>
                                  </td>
                                  <td>0원</td>
                                  <td>400만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>자손</span>
                                    <span class="car">운전자 본인</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>1,500만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>대물</span>
                                    <span class="car">상대 차량</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>2,000만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>대인</span>
                                    <span class="car">상대 운전자</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>무한</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </uu-tab>
                        <uu-tab title="프리미엄">
                          <div class="insurance_table">
                            <table>
                              <caption class="sr_only">
                                보험문의 제주보험 SUV 프리미엄
                              </caption>
                              <colgroup>
                                <col width="33.333%" />
                                <col width="33.333%" />
                                <col width="33.333%" />
                              </colgroup>
                              <thead>
                                <tr>
                                  <th>구분</th>
                                  <th>본인부담</th>
                                  <th>보상한도</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td class="category">
                                    <span>자차</span>
                                    <span class="car">본인차량</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">경소형</span>
                                  </td>
                                  <td>0원</td>
                                  <td>무제한</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">준중형, 중형</span>
                                  </td>
                                  <td>0원</td>
                                  <td>무제한</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">준대형, 대형</span>
                                  </td>
                                  <td>0원</td>
                                  <td>무제한</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>자손</span>
                                    <span class="car">운전자 본인</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>1,500만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>대물</span>
                                    <span class="car">상대 차량</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>2,000만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>대인</span>
                                    <span class="car">상대 운전자</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>무한</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </uu-tab>
                      </uu-tabs>
                    </uu-tab>
                    <uu-tab title="캠핑카">
                      <div class="insurance_table">
                        <table>
                          <caption class="sr_only">
                            보험문의 제주보험 캠핑카
                          </caption>
                          <colgroup>
                            <col width="33.333%" />
                            <col width="33.333%" />
                            <col width="33.333%" />
                          </colgroup>
                          <thead>
                            <tr>
                              <th>구분</th>
                              <th>본인부담</th>
                              <th>보상한도</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td class="category">
                                <span>자차</span>
                                <span class="car">본인차량</span>
                              </td>
                              <td>50만 원</td>
                              <td>2,500만 원</td>
                            </tr>
                            <tr>
                              <td class="category">
                                <span>자손</span>
                                <span class="car">운전자 본인</span>
                              </td>
                              <td>50만 원</td>
                              <td>1,500만 원</td>
                            </tr>
                            <tr>
                              <td class="category">
                                <span>대물</span>
                                <span class="car">상대 차량</span>
                              </td>
                              <td>50만 원</td>
                              <td>1억</td>
                            </tr>
                            <tr>
                              <td class="category">
                                <span>대인</span>
                                <span class="car">상대 운전자</span>
                              </td>
                              <td>50만 원</td>
                              <td>무한</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </uu-tab>
                    <uu-tab title="기타(프리미엄, 승합, 수입)">
                      <uu-tabs
                        class="segment_tab"
                        :tabLinkHide="tabHide"
                        :tabIndex="jejuInscIndex[3]"
                      >
                        <uu-tab title="컴팩트">
                          <div class="insurance_table">
                            <table>
                              <caption class="sr_only">
                                보험문의 제주보험 기타(프리미엄, 승합, 수입) 일반
                              </caption>
                              <colgroup>
                                <col width="33.333%" />
                                <col width="33.333%" />
                                <col width="33.333%" />
                              </colgroup>
                              <thead>
                                <tr>
                                  <th>구분</th>
                                  <th>본인부담</th>
                                  <th>보상한도</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td class="category">
                                    <span>자차</span>
                                    <span class="car">본인차량</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">경소형</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>400만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">준중형, 중형</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>400만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">준대형, 대형</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>400만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>자손</span>
                                    <span class="car">운전자 본인</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>1,500만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>대물</span>
                                    <span class="car">상대 차량</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>2,000만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>대인</span>
                                    <span class="car">상대 운전자</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>무한</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </uu-tab>
                        <uu-tab title="베이직플러스">
                          <div class="insurance_table">
                            <table>
                              <caption class="sr_only">
                                보험문의 제주보험 기타(프리미엄, 승합, 수입) 고급
                              </caption>
                              <colgroup>
                                <col width="33.333%" />
                                <col width="33.333%" />
                                <col width="33.333%" />
                              </colgroup>
                              <thead>
                                <tr>
                                  <th>구분</th>
                                  <th>본인부담</th>
                                  <th>보상한도</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td class="category">
                                    <span>자차</span>
                                    <span class="car">본인차량</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">경소형</span>
                                  </td>
                                  <td>0원</td>
                                  <td>400만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">준중형, 중형</span>
                                  </td>
                                  <td>0원</td>
                                  <td>400만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">준대형, 대형</span>
                                  </td>
                                  <td>0원</td>
                                  <td>400만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>자손</span>
                                    <span class="car">운전자 본인</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>1,500만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>대물</span>
                                    <span class="car">상대 차량</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>2,000만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>대인</span>
                                    <span class="car">상대 운전자</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>무한</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </uu-tab>
                        <uu-tab title="프리미엄">
                          <div class="insurance_table">
                            <table>
                              <caption class="sr_only">
                                보험문의 제주보험 기타(프리미엄, 승합, 수입) 프리미엄
                              </caption>
                              <colgroup>
                                <col width="33.333%" />
                                <col width="33.333%" />
                                <col width="33.333%" />
                              </colgroup>
                              <thead>
                                <tr>
                                  <th>구분</th>
                                  <th>본인부담</th>
                                  <th>보상한도</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td class="category">
                                    <span>자차</span>
                                    <span class="car">본인차량</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">경소형</span>
                                  </td>
                                  <td>0원</td>
                                  <td>무제한</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">준중형, 중형</span>
                                  </td>
                                  <td>0원</td>
                                  <td>무제한</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span><span class="sr_only">자차</span></span>
                                    <span class="car">준대형, 대형</span>
                                  </td>
                                  <td>0원</td>
                                  <td>무제한</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>자손</span>
                                    <span class="car">운전자 본인</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>1,500만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>대물</span>
                                    <span class="car">상대 차량</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>2,000만 원</td>
                                </tr>
                                <tr>
                                  <td class="category">
                                    <span>대인</span>
                                    <span class="car">상대 운전자</span>
                                  </td>
                                  <td>50만 원</td>
                                  <td>무한</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </uu-tab>
                      </uu-tabs>
                    </uu-tab>
                  </uu-tabs>
                </uu-tab>
              </uu-tabs>
              <ul class="dot_list">
                <li>
                  프리미엄, 수입 차량은 차급 관계 없이 일괄 기준을 적용합니다. 기타 카테고리에서
                  확인해주세요.
                </li>
                <li>보험 및 차량손해 면책제도 내용 확인, 가입에 동의하는 것으로 간주합니다.</li>
              </ul>
            </div>
            <div class="use_money">
              <uu-accordion class="accordion_rentalcar">
                <uu-accordion-item :header="'자세히'">
                  <template #accordion_header> 자세히 </template>
                  <template #accordion_body>
                    <p>
                      보험의 정확한 보장 범위는 대여 시 작성하는 계약서를 기준으로 결정되며, 렌터카
                      업체에 따라 티머니GO에서 안내된 자기부담금/보상한도 기준보다 더 나은 보장이
                      적용될 수도 있습니다.
                    </p>
                    <ol class="step_list mb0">
                      <li>
                        <p>1.</p>
                        <p>대물 / 대인 / 자손 / 자차 보상은 다음을 의미합니다.</p>
                        <ul class="dot_list mt4">
                          <li>
                            대물보상 : 상대 차량이나 시설 등의 물적 재산 피래 보상
                            (상대휴차료/대차료 포함)
                          </li>
                          <li>자손 보장 : 본인과 본인 차량 동승자의 부상, 사망, 후유 장애 보상</li>
                          <li>대인 보상 : 상대 차량의 운전자 및 동승자의 인명 피해 보상</li>
                          <li>자차 보상 : 본인 차량 손상 보상</li>
                        </ul>
                        <div class="bg_gray">
                          <p>
                            [보상한도&자차 자기부담금 보험 적용 예시]<br />
                            보상 한도 1,000만원, 면책금 50만원인 보험인 경우
                          </p>
                          <ul class="dot_list mt4 mb0">
                            <li>
                              사고 발생금액이 30만원 : 본인 면책금(50만원)이내 이므로 30만원 전액
                              부담
                            </li>
                            <li>
                              사고 발생금액이 800만원 : 본인 면책금(50만원)부담 + 업체에서 750만원
                              부담
                            </li>
                            <li>
                              사고 발생금액이 1,500만원 : 본인 면책금(50만원) + 업체에서
                              1,000만원(보상한도) 부담 + 차액 450만원은 보장한도를 넘어서므로 본인
                              부담
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li>
                        <p>2.</p>
                        <p>
                          렌터카 서비스는 단독사고를 보장합니다, 단, 소모품(휠/타이어 둥)과 중과실
                          사고는 보험 보장이 불가할 수 도 있으며 업체에 따라 조건이 상이할 수
                          있습니다.
                        </p>
                      </li>
                      <li>
                        <p>3.</p>
                        <p>
                          휴차보상료는 보상 한도와 별도로 부과되는 금액으로, 기본 대여료의 50%
                          금액입니다.<br />
                          *휴차 보상료란 고객의 귀책사유(사고 및 기타 사유)에 의해 대여중인 차량에
                          손해 발생시, 수리기간 동안 발생하는 영업 손실금에 해당하는 금액을
                          의미합니다.
                        </p>
                      </li>
                      <li>
                        <p>4.</p>
                        <p>
                          제2운전자의 사고 시에도 동일하게 보상되며, 보상을 위해서는 차량대여 시
                          함께 있어야 하며, 면허증을 지참해야 합니다.
                        </p>
                      </li>
                      <li>
                        <p>5.</p>
                        <p>울릉도 지역의 보험은 제주도 지역과 동일합니다.</p>
                      </li>
                    </ol>
                  </template>
                </uu-accordion-item>
              </uu-accordion>
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

const tabHide = ref(false) // 보험지역 탭영역 숨김처리
const guideTabHide = ref(false)

const tabIndex = ref(0)
const rntAreaIndex = ref(0)
const vhclKndIndex = ref([0, 0])
const jejuInscIndex = ref([0, 0, 0, 0]) // 제주보험 - 보험탭 인덱스
const inInscIndex = ref([0, 0, 0, 0]) // 대륙보험 - 보험탭 인텍스

/**
 * @description 탭구분값
 */
const categoryMap = new Map([
  ['use', 0], // 이용안내
  ['insurance', 1] // 보험문의
])

/**
 * @description 지역구분값
 */
const rntAreaCdMap = new Map([
  ['D000', 0], // 내륙보험
  ['D001', 1] // 제주보험
])

/**
 * @description 차량구분값
 */
const vhclKndCdMap = new Map([
  ['sedan', 0], // 승용
  ['suv', 1], // SUV
  ['camp', 2], // 캠핑카
  ['etc', 3] // 기타(프리미엄, 승합, 수입)
])

/**
 * @description 보험구분값
 */
const inscCtgCdMap = new Map([
  ['general', 0], // 컴팩트
  ['premium', 1], // 베이직플러스
  ['super', 2] // 프리미엄
])

// 탭 선택
const onSelectedTap = () => {
  window.scrollTo(0, 0)
}

/**
 * @description 차량구분값
 */
const getVhclKndCd = (vhclKnd: string) => {
  if (!vhclKnd) {
    return ''
  }
  if (vhclKnd.includes('premium') || 'suv_g' === vhclKnd || 'etc_z' === vhclKnd) {
    // 기타(프리미엄, 승합, 수입)
    return 'etc'
  } else if ('suv_h' === vhclKnd) {
    // 캠핑카
    return 'camp'
  } else if (vhclKnd.includes('suv')) {
    // SUV
    return 'suv'
  } else if (vhclKnd.includes('sedan')) {
    // 승용
    return 'sedan'
  }
  return 'etc'
}

onMounted(async () => {
  const category = route.query.category as string //이용안내/보험문의 탭 구분
  tabIndex.value = categoryMap.get(category) ?? 0

  const vhclKndCd = getVhclKndCd(route.query.vhclKndCd as string) //차량구분값

  const areaIdx = rntAreaCdMap.get(route.query.rntAreaCd as string) //지역탭 구분 - 내륙보험(D000), 제주보험(D001)
  const vhclkndIdx = vhclKndCdMap.get(vhclKndCd) ?? 0 //차량탭 구분 - 승용(sedan), SUV(suv), 캠핑카(camp), 기타(프리미엄, 승합, 수입, etc)

  if (areaIdx !== undefined && tabIndex.value === 1) {
    //보험문의 탭에서 특정 지역구분 탭을 지정하여 이동하는 경우
    rntAreaIndex.value = areaIdx
    vhclKndIndex.value[areaIdx] = vhclkndIdx
    guideTabHide.value = true // 이용안내/보험문의 탭 숨기기
    if (areaIdx === 1) {
      jejuInscIndex.value[vhclkndIdx] = inscCtgCdMap.get(route.query.inscCtgCd as string) ?? 0
    } else {
      inInscIndex.value[vhclkndIdx] = inscCtgCdMap.get(route.query.inscCtgCd as string) ?? 0
    }
  }

  const tabYn = route.query.tabYn as string //탭 유무
  if (tabYn === 'N') {
    tabHide.value = true
  }
})
</script>

<style scoped>
.mor
  .container
  .use_money_area
  .use_money
  .rantalcar_tab
  > .tab_link:not(.tab_hide > *)
  .tab_link_btn {
  height: 6rem !important;
}
.mor .container .use_money_area .use_money .rantalcar_tab > .tab_content > .tab_content_panel {
  margin-top: -1rem;
}
</style>
