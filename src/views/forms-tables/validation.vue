<script setup>
import { reactive, ref, computed } from 'vue';
const form = reactive({ name: '', email: '', password: '', confirm: '', terms: false });
const touched = ref(false),
  submitted = ref(false);
const errors = computed(() => ({
  name: form.name.trim().length >= 2 ? '' : '이름을 2자 이상 입력하세요.',
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : '올바른 이메일을 입력하세요.',
  password: form.password.length >= 8 ? '' : '비밀번호는 8자 이상이어야 합니다.',
  confirm: form.confirm === form.password && form.confirm ? '' : '비밀번호가 일치하지 않습니다.',
  terms: form.terms ? '' : '이용 약관에 동의하세요.'
}));
const valid = computed(() => Object.values(errors.value).every((e) => !e));
function submit() {
  touched.value = true;
  submitted.value = valid.value;
}
const fields = [
  { key: 'name', label: '이름', type: 'text' },
  { key: 'email', label: '이메일', type: 'email' },
  { key: 'password', label: '비밀번호', type: 'password' },
  { key: 'confirm', label: '비밀번호 확인', type: 'password' }
];
</script>
<template>
  <section class="demo">
    <p class="demo__muted">입력 값은 외부로 전송되지 않습니다. 테스트용 비밀번호를 사용하세요.</p>
    <form class="demo" novalidate @submit.prevent="submit" @input="submitted = false">
      <div class="demo__grid">
        <label v-for="field in fields" :key="field.key" class="demo__field">
          {{ field.label }}
          <input
            v-model="form[field.key]"
            :type="field.type"
            :aria-invalid="touched && !!errors[field.key]"
            :aria-describedby="'error-' + field.key"
            @blur="touched = true"
          />
          <small v-if="touched" :id="'error-' + field.key" class="demo__error">
            {{ errors[field.key] }}
          </small>
        </label>
      </div>
      <label>
        <input v-model="form.terms" type="checkbox" :aria-invalid="touched && !!errors.terms" />
        이용 약관 동의
      </label>
      <small v-if="touched" class="demo__error">{{ errors.terms }}</small>
      <button type="submit" class="demo__primary">검증 후 등록</button>
      <p v-if="submitted" role="status" class="demo__output">✓ 모든 검증을 통과했습니다.</p>
    </form>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
