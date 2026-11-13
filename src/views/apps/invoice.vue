<script setup>
import { useCart } from '@/composables/useCart';
const { lines, total } = useCart();
const date = new Intl.DateTimeFormat('ko-KR').format(new Date());
function print() {
  window.print();
}
</script>
<template>
  <section class="demo">
    <header class="demo__row">
      <h2>
        INVOICE
        <small>#VA-DEMO-001</small>
      </h2>
      <button @click="print">인쇄 / PDF 저장</button>
    </header>
    <p class="demo__muted">발행일 {{ date }} · 현재 장바구니 기준 데모 인보이스</p>
    <div class="demo__scroll">
      <table>
        <thead>
          <tr>
            <th>상품</th>
            <th>수량</th>
            <th>금액</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in lines" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.quantity }}</td>
            <td>₩{{ (item.price * item.quantity).toLocaleString() }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colspan="2">합계 (배송비 포함)</th>
            <td>₩{{ total.toLocaleString() }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
