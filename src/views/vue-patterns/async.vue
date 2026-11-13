<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import peopleUrl from '@/data/apiPeople.json?url';
const loading = ref(false);
const error = ref('');
const data = ref([]);
const fail = ref(false);
let controller;
async function load() {
  controller?.abort();
  const current = new AbortController();
  controller = current;
  loading.value = true;
  error.value = '';
  try {
    const response = await fetch(fail.value ? '/api/demo-failure' : peopleUrl, {
      signal: current.signal
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const result = await response.json();
    if (!Array.isArray(result)) throw new Error('올바르지 않은 API 응답입니다.');
    data.value = result;
  } catch (e) {
    if (e.name !== 'AbortError') error.value = '데이터를 불러오지 못했습니다. 다시 시도하세요.';
  } finally {
    if (controller === current) loading.value = false;
  }
}
onMounted(load);
onUnmounted(() => controller?.abort());
</script>
<template>
  <section class="demo">
    <div class="demo__row">
      <button class="demo__primary" :disabled="loading" @click="load">
        {{ loading ? '불러오는 중...' : '새로고침 / 재시도' }}
      </button>
      <label>
        <input v-model="fail" type="checkbox" />
        실패 응답 테스트
      </label>
    </div>
    <p class="demo__muted">
      동일 출처 JSON API를 fetch합니다. 실패 테스트는 HTML 응답을 거부하고 오류 UI를 표시합니다.
    </p>
    <div v-if="loading" class="demo__grid" aria-busy="true" aria-label="데이터 로딩">
      <span v-for="n in 3" :key="n" class="api-skeleton" />
    </div>
    <p v-else-if="error" role="alert" class="demo__error">{{ error }}</p>
    <ul v-else class="demo__list">
      <li v-for="person in data" :key="person.id" class="demo__item">
        <strong>{{ person.name }}</strong>
        <span>{{ person.role }}</span>
      </li>
    </ul>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.api-skeleton {
  height: 72px;
  background: linear-gradient(90deg, var(--canvas), var(--border), var(--canvas));
  background-size: 200%;
  border-radius: 10px;
  animation: shimmer 1.3s infinite;
}
@keyframes shimmer {
  to {
    background-position: -200% 0;
  }
}
</style>
