<script setup>
import { ref, computed } from 'vue';
const rows = ref([
  { id: 1, name: '컴포넌트 설계' },
  { id: 2, name: '접근성 검사' },
  { id: 3, name: '프로덕션 빌드' },
  { id: 4, name: '코드 리뷰' }
]);
const selected = ref([]);
const all = computed({
  get: () => rows.value.length > 0 && rows.value.every((r) => selected.value.includes(r.id)),
  set: (value) => {
    selected.value = value ? rows.value.map((r) => r.id) : [];
  }
});
const partial = computed(() => selected.value.length > 0 && !all.value);
function remove() {
  rows.value = rows.value.filter((r) => !selected.value.includes(r.id));
  selected.value = [];
}
</script>
<template>
  <section class="demo">
    <div class="demo__row">
      <label>
        <input v-model="all" type="checkbox" :indeterminate="partial" />
        전체 선택
      </label>
      <span>{{ selected.length }}개 선택</span>
      <button :disabled="!selected.length" class="demo__danger" @click="remove">선택 삭제</button>
    </div>
    <ul class="demo__list">
      <li v-for="row in rows" :key="row.id" class="demo__item">
        <label>
          <input v-model="selected" type="checkbox" :value="row.id" />
          {{ row.name }}
        </label>
        <code>#{{ row.id }}</code>
      </li>
    </ul>
    <p v-if="!rows.length">모든 항목이 삭제되었습니다. 페이지를 다시 열면 초기화됩니다.</p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
