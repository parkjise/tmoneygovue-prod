<script setup>
import { ref, computed } from 'vue';
import { products, useCart } from '@/composables/useCart';
import { useToast } from '@/composables/useToast';
const { add } = useCart();
const { toast } = useToast();
const query = ref('');
const category = ref('All');
const filtered = computed(() =>
  products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.value.toLowerCase()) &&
      (category.value === 'All' || p.category === category.value)
  )
);
</script>
<template>
  <section class="demo">
    <div class="demo__row">
      <input v-model="query" aria-label="상품 검색" placeholder="Search products..." />
      <label>
        카테고리
        <select v-model="category">
          <option>All</option>
          <option>Audio</option>
          <option>Workspace</option>
          <option>Lifestyle</option>
        </select>
      </label>
      <RouterLink to="/apps/cart">장바구니 →</RouterLink>
    </div>
    <section class="demo__grid">
      <article v-for="product in filtered" :key="product.id" class="demo__panel product">
        <RouterLink :to="{ path: '/apps/product-detail', query: { id: product.id } }">
          <figure :style="{ background: product.color }">{{ product.icon }}</figure>
          <small>{{ product.category }}</small>
          <h3>{{ product.name }}</h3>
        </RouterLink>
        <footer>
          <strong>₩{{ product.price.toLocaleString() }}</strong>
          <button
            @click="
              add(product.id);
              toast('장바구니에 추가했습니다.');
            "
          >
            + 담기
          </button>
        </footer>
      </article>
    </section>
    <p v-if="!filtered.length">상품이 없습니다.</p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.product {
  figure {
    @include flex-center;
    height: 150px;
    border-radius: 12px;
    font-size: 65px;
    margin: 0 0 20px;
    color: #65617a;
  }
  small {
    color: var(--caption);
    font-size: 10px;
  }
  h3 {
    font-size: 14px;
    margin: 8px 0 18px;
  }
  footer {
    @include flex-between;
    font-size: 12px;
  }
}
</style>
