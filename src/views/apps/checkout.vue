<script setup>
import { ref } from 'vue';
import { useCart } from '@/composables/useCart';
const { lines, total } = useCart();
const name = ref(''),
  email = ref(''),
  address = ref(''),
  done = ref(false);
function submit() {
  if (lines.value.length && name.value.trim() && address.value.trim()) done.value = true;
}
</script>
<template>
  <section class="demo">
    <p class="demo__muted">테스트 주문 화면입니다. 결제나 개인정보 전송이 발생하지 않습니다.</p>
    <form v-if="!done" class="demo" @submit.prevent="submit">
      <div class="demo__grid">
        <label class="demo__field">
          받는 분
          <input v-model.trim="name" required />
        </label>
        <label class="demo__field">
          이메일
          <input v-model="email" type="email" required />
        </label>
      </div>
      <label class="demo__field">
        배송지
        <input v-model.trim="address" required />
      </label>
      <output class="demo__output">
        {{ lines.length }}개 상품 · ₩{{ total.toLocaleString() }}
      </output>
      <p v-if="!lines.length">장바구니에 상품을 먼저 담아주세요.</p>
      <button class="demo__primary" type="submit" :disabled="!lines.length">데모 주문 확인</button>
    </form>
    <article v-else class="demo__output">
      <h3>✓ 주문 확인이 완료되었습니다.</h3>
      <p>{{ name }}님, {{ address }} · ₩{{ total.toLocaleString() }}</p>
      <RouterLink to="/apps/invoice">인보이스 보기 →</RouterLink>
    </article>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
