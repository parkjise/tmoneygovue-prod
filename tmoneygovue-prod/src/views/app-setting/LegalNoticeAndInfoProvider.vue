<template>
  <sub-header title="법적 공지/정보 제공처" />
  <main id="main" class="main mor">
    <div class="container no_padding bg_white">
      <div class="setting legal">
        <div class="info">
          <h4>법적 공지</h4>
          <p>
            티머니GO에서 제공하는 정보(경로안내, 교통정보 등)는 '참고용'으로, 이에 대한 정확성과 신뢰성을 보증하지
            않으며, 어떠한 법적 책임을 부담하지 않습니다.
          </p>
          <br/>
          <table class="data-table">
            <thead>
              <tr>
                <th>항목</th>
                <th>정보 제공처</th>
              </tr>
            </thead>
            <tbody>
              <!-- v-for를 사용하여 rows 배열을 반복 출력 -->
              <tr v-for="(row, index) in rows" :key="index">
                <td>{{ row[0] }}</td>
                <td>{{ row[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    // 2차원 배열로 17행 2열 데이터 준비
    const rows = ref([
      ['지도', 'NAVER CORP.'],
      ['실시간 버스/지하철 정보', '서울시 교통정보과, 아로정보기술, 국가대중교통정보센터'],
      ['공공자전거(따릉이, 타슈)', '서울시설공단, 대전교통공사'],
      ['전동킥보드 및 전기자전거 정보', '㈜PUMP, ㈜지바이크, 빔모빌리티코리아㈜, ㈜나인투원'],
      ['고속/시외 정보', '고속버스 운수사, 시외버스 운수사'],
      ['항공 정보', '㈜타이드스퀘어'],
      ['렌터카 정보', '아이엠에스모빌리티㈜'],
      ['철도 정보', '주식회사 에스알'],
      ['여행 상품 정보', '서울고속버스터미널㈜'],
      ['택시 정보', '㈜진모빌리티, ㈜VCNC'],
      ['퀵/택배 정보', '㈜굿스플로'],
      ['숙박 정보', '㈜온다'],
      ['해운 정보', '㈜한일고속']
    ]);

    return {
      rows
    };
  }
};
</script>

<style scoped>
.table-container {
  width: 100%;
  margin-top: 20px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
}

.data-table th, .data-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
  vertical-align: middle;
}

.data-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.data-table td {
  background-color: #fff;
}
</style>