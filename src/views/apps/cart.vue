<script setup>
import { useCart } from '@/composables/useCart';
const { lines, total, update, remove } = useCart();
</script>
<template>
  <section class="demo">
    <p class="demo__muted">
      수량과 총액은 computed로 계산되며 장바구니는 로컬 저장소에 보관됩니다.
    </p>
    <div class="demo__scroll">
      <table>
        <thead>
          <tr>
            <th>상품</th>
            <th>단가</th>
            <th>수량</th>
            <th>소계</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in lines" :key="row.id">
            <td>{{ row.icon }} {{ row.name }}</td>
            <td>₩{{ row.price.toLocaleString() }}</td>
            <td>
              <input
                type="number"
                :value="row.quantity"
                min="1"
                max="99"
                :aria-label="row.name + ' 수량'"
                class="cart__quantity"
                @input="update(row.id, $event.target.value)"
              />
            </td>
            <td>₩{{ (row.price * row.quantity).toLocaleString() }}</td>
            <td><button :aria-label="row.name + ' 삭제'" @click="remove(row.id)">×</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-if="!lines.length">
      장바구니가 비었습니다.
      <RouterLink to="/apps/products">상품 둘러보기</RouterLink>
    </p>
    <footer class="cart__total">
      <strong>총액 ₩{{ total.toLocaleString() }}</strong>
      <RouterLink v-if="lines.length" to="/apps/checkout">주문하기 →</RouterLink>
    </footer>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.cart__quantity {
  width: 80px;
}
.cart__total {
  @include flex-between;
  padding: 20px;
  background: var(--soft);
  border-radius: 12px;
  a {
    color: var(--primary);
  }
}
</style>
