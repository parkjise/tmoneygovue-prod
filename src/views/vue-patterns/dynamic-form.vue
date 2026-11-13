<script setup>
import { ref, computed } from 'vue';
let nextId = 2;
const rows = ref([{ id: 1, name: '', email: '' }]);
const submitted = ref(false);
const errors = computed(() =>
  rows.value.map((r) => ({
    name: r.name.trim() ? '' : '이름을 입력하세요.',
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.email) ? '' : '올바른 이메일을 입력하세요.'
  }))
);
const valid = computed(
  () => rows.value.length > 0 && errors.value.every((e) => !e.name && !e.email)
);
function submit() {
  submitted.value = true;
}
</script>
<template>
  <section class="demo">
    <form class="demo" @submit.prevent="submit">
      <fieldset v-for="(row, i) in rows" :key="row.id">
        <legend>팀원 {{ i + 1 }}</legend>
        <div class="demo__row">
          <label class="demo__field">
            이름
            <input v-model="row.name" :aria-invalid="!!errors[i].name" required />
            <small class="demo__error">{{ errors[i].name }}</small>
          </label>
          <label class="demo__field">
            이메일
            <input v-model="row.email" type="email" :aria-invalid="!!errors[i].email" required />
            <small class="demo__error">{{ errors[i].email }}</small>
          </label>
          <button
            type="button"
            :disabled="rows.length === 1"
            @click="rows = rows.filter((r) => r.id !== row.id)"
          >
            행 삭제
          </button>
        </div>
      </fieldset>
      <div class="demo__row">
        <button
          type="button"
          @click="
            rows.push({ id: nextId++, name: '', email: '' });
            submitted = false;
          "
        >
          + 팀원 추가
        </button>
        <button class="demo__primary" :disabled="!valid" type="submit">팀 저장</button>
      </div>
    </form>
    <output v-if="submitted && valid" class="demo__output">
      {{ rows.length }}명의 팀원을 저장했습니다.
    </output>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
