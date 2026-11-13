<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
const items = ref([]);
const sentinel = ref(null);
const loading = ref(false);
const finished = ref(false);
let observer, timer;
function load() {
  if (loading.value || finished.value) return;
  loading.value = true;
  timer = setTimeout(() => {
    const start = items.value.length;
    items.value.push(
      ...Array.from({ length: 8 }, (_, i) => ({
        id: start + i + 1,
        title: `Reference article ${start + i + 1}`
      }))
    );
    finished.value = items.value.length >= 40;
    loading.value = false;
  }, 400);
}
onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) load();
    },
    { root: sentinel.value.parentElement, rootMargin: '100px' }
  );
  observer.observe(sentinel.value);
});
onUnmounted(() => {
  observer?.disconnect();
  clearTimeout(timer);
});
</script>
<template>
  <section class="demo">
    <p class="demo__muted">
      아래 목록 내부를 스크롤하면 8개씩 추가됩니다. 최대 40개 · observer와 타이머는 해제됩니다.
    </p>
    <section class="infinite-feed" aria-label="무한 스크롤 목록" tabindex="0">
      <article v-for="item in items" :key="item.id" class="demo__item">
        <span>✦ {{ item.title }}</span>
        <small>Vue 3</small>
      </article>
      <footer ref="sentinel" class="infinite-feed__sentinel" role="status">
        {{
          finished ? '모든 항목을 불러왔습니다.' : loading ? '불러오는 중…' : '아래로 스크롤하세요.'
        }}
      </footer>
    </section>
    <button :disabled="loading || finished" @click="load">더 보기 (키보드 지원)</button>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.infinite-feed {
  height: 350px;
  overflow: auto;
  @include custom-scrollbar;
  display: grid;
  gap: 8px;
  &__sentinel {
    text-align: center;
    padding: 20px;
    color: var(--caption);
  }
}
</style>
