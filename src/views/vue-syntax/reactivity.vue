<script setup>
import { ref, reactive, computed, watch, watchEffect } from 'vue';
const quantity = ref(2);
const product = reactive({ price: 15000, options: { shipping: 3000 } });
const total = computed(() => quantity.value * product.price + product.options.shipping);
const history = ref([]);
const summary = ref('');
watch(
  quantity,
  (value, old) => {
    history.value.unshift(`수량 ${old ?? '초기'} → ${value}`);
  },
  { immediate: true }
);
watch(
  product,
  () => {
    history.value.unshift('상품 설정 변경 감지 (deep)');
  },
  { deep: true }
);
watchEffect(() => {
  summary.value = `현재 주문 금액: ${total.value.toLocaleString()}원`;
});
</script>
<template>
  <section class="demo">
    <div class="demo__grid">
      <label class="demo__field">
        수량 (ref)
        <input v-model.number="quantity" type="number" min="1" />
      </label>
      <label class="demo__field">
        가격 (reactive)
        <input v-model.number="product.price" type="number" min="0" />
      </label>
      <label class="demo__field">
        중첩 속성: 배송비
        <input v-model.number="product.options.shipping" type="number" min="0" />
      </label>
    </div>
    <output class="demo__output">{{ summary }}</output>
    <p class="demo__muted">
      computed는 의존성이 바뀔 때만 재계산합니다. watch는 특정 상태의 이전/새 값을 관찰하고,
      watchEffect는 읽은 의존성을 자동 추적합니다.
    </p>
    <ul>
      <li v-for="(entry, i) in history.slice(0, 5)" :key="i">{{ entry }}</li>
    </ul>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
