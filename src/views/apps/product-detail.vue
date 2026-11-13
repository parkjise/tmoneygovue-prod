<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { products, useCart } from '@/composables/useCart';
import { useToast } from '@/composables/useToast';
const route = useRoute();
const product = computed(
  () => products.find((p) => p.id === Number(route.query.id)) || products[0]
);
const tab = ref('설명');
const { add } = useCart();
const { toast } = useToast();
</script>
<template>
  <section class="demo">
    <article class="product-detail">
      <figure :style="{ background: product.color }">{{ product.icon }}</figure>
      <section class="demo">
        <small>{{ product.category }} / IN STOCK</small>
        <h2>{{ product.name }}</h2>
        <p>
          매일의 워크스페이스를 위한 신중한 선택. 간결한 디자인과 편안한 사용 경험을 만나보세요.
        </p>
        <strong>₩{{ product.price.toLocaleString() }}</strong>
        <div class="demo__row">
          <button
            class="demo__primary"
            @click="
              add(product.id);
              toast('장바구니에 추가했습니다.');
            "
          >
            장바구니에 담기
          </button>
          <RouterLink to="/apps/cart">장바구니 보기 →</RouterLink>
        </div>
        <nav aria-label="상품 정보">
          <button
            v-for="t in ['설명', '배송 안내']"
            :key="t"
            :aria-pressed="tab === t"
            @click="tab = t"
          >
            {{ t }}
          </button>
        </nav>
        <p>
          {{
            tab === '설명'
              ? '품질을 우선으로 설계한 워크스페이스 컬렉션입니다.'
              : '무료 배송 · 결제 후 영업일 기준 2~3일 (데모 상품)'
          }}
        </p>
      </section>
    </article>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.product-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  figure {
    @include flex-center;
    margin: 0;
    border-radius: 16px;
    font-size: 120px;
    min-height: 320px;
    color: #65617a;
  }
  p {
    color: var(--muted);
  }
  @include responsive(mobile) {
    grid-template-columns: 1fr;
  }
}
</style>
