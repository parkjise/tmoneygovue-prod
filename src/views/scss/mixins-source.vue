<script setup>
const mixins = [
  { name: 'flex-center', usage: '@include flex-center;', description: '가로·세로 중앙 정렬' },
  { name: 'flex-between', usage: '@include flex-between;', description: '양 끝 정렬과 12px 간격' },
  {
    name: 'responsive',
    usage: '@include responsive(mobile) { … }',
    description: 'mobile: 최대 760px, tablet: 최대 1100px, 직접 너비도 지정 가능'
  },
  {
    name: 'card-surface',
    usage: '@include card-surface;',
    description: '공통 배경·테두리·반경·그림자'
  },
  {
    name: 'text-ellipsis',
    usage: '@include text-ellipsis;',
    description: '한 줄 말줄임. 적용 요소의 너비를 제한하세요.'
  },
  {
    name: 'custom-scrollbar',
    usage: '@include custom-scrollbar;',
    description: '스크롤바 두께와 색상 통일'
  },
  { name: 'focus-ring', usage: '@include focus-ring;', description: '키보드 focus-visible 테두리' }
];
const importCode = "@use '@/assets/styles/mixins' as *;";
</script>
<template>
  <section class="demo mixin-source">
    <header>
      <h3>@/assets/styles/mixins</h3>
      <p>실제 파일: src/assets/styles/_mixins.scss</p>
    </header>
    <code class="demo__output">{{ importCode }}</code>
    <p class="demo__muted">
      애플리케이션 전체에서 사용하는 공통 믹스인 7종입니다. 아래 원본은 실제 파일을 직접 읽어
      표시하며, 함께 제공되는 _variables.scss에 색상·반경 토큰이 정의되어 있습니다.
    </p>
    <section class="demo__scroll">
      <table>
        <caption>공통 Mixin 사용법</caption>
        <thead>
          <tr>
            <th scope="col">Mixin</th>
            <th scope="col">호출 예시</th>
            <th scope="col">용도</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in mixins" :key="item.name">
            <th scope="row">{{ item.name }}</th>
            <td>
              <code>{{ item.usage }}</code>
            </td>
            <td>{{ item.description }}</td>
          </tr>
        </tbody>
      </table>
    </section>
    <RouterLink to="/scss/mixins">인자·@content를 활용한 실무 예제 보기 →</RouterLink>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.mixin-source {
  @include custom-scrollbar;
  min-width: 0;
  h3,
  code {
    overflow-wrap: anywhere;
  }
  header p {
    color: var(--caption);
    font-size: 12px;
    margin-top: 6px;
  }
  td {
    min-width: 160px;
    font-size: 12px;
  }
  th {
    white-space: nowrap;
  }
  caption {
    text-align: left;
    color: var(--muted);
    font-size: 12px;
    padding-bottom: 12px;
  }
  a {
    color: var(--primary);
    font-size: 12px;
  }
}
</style>
