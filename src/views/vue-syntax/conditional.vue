<script setup>
import { ref } from 'vue';
const status = ref('active');
const visible = ref(true);
</script>
<template>
  <section class="demo">
    <p class="demo__muted">
      v-if는 DOM을 생성·제거합니다. v-show는 DOM을 유지하며 display를 전환합니다. 자주 토글하는
      요소는 v-show를 사용하세요.
    </p>
    <div class="demo__row">
      <label>
        회원 상태
        <select v-model="status">
          <option value="active">활성</option>
          <option value="pending">대기</option>
          <option value="guest">방문자</option>
        </select>
      </label>
      <button @click="visible = !visible">표시 전환</button>
    </div>
    <div class="demo__grid">
      <article class="demo__panel">
        <h3>v-if / v-else-if / v-else</h3>
        <p v-if="status === 'active'">✓ 활성 회원입니다.</p>
        <p v-else-if="status === 'pending'">승인 대기 중입니다.</p>
        <p v-else>로그인이 필요합니다.</p>
        <p v-if="visible" data-testid="if-content">이 요소는 DOM에서 제거됩니다.</p>
      </article>
      <article class="demo__panel">
        <h3>v-show</h3>
        <p v-show="visible" data-testid="show-content">이 요소는 DOM에 남아 있습니다.</p>
        <p class="demo__muted">개발자 도구에서 display: none을 확인해 보세요.</p>
      </article>
    </div>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
