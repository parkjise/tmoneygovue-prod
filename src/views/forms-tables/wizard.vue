<script setup>
import { ref, reactive, computed } from 'vue';
const step = ref(0),
  done = ref(false);
const form = reactive({ name: '', email: '', team: '', role: 'Developer' });
const steps = ['기본 정보', '워크스페이스', '확인'];
const valid = computed(() =>
  step.value === 0
    ? form.name.trim().length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    : step.value === 1
      ? form.team.trim().length >= 2
      : true
);
function next() {
  if (valid.value) {
    if (step.value < 2) step.value++;
    else done.value = true;
  }
}
</script>
<template>
  <section class="demo">
    <ol class="wizard__steps">
      <li v-for="(title, i) in steps" :key="title" :aria-current="step === i ? 'step' : undefined">
        <span>{{ i < step ? '✓' : i + 1 }}</span>
        {{ title }}
      </li>
    </ol>
    <form v-if="!done" class="demo" @submit.prevent="next">
      <fieldset v-if="step === 0">
        <legend>기본 정보</legend>
        <div class="demo__grid">
          <label class="demo__field">
            이름 (2자 이상)
            <input v-model.trim="form.name" required minlength="2" />
          </label>
          <label class="demo__field">
            이메일
            <input v-model="form.email" type="email" required />
          </label>
        </div>
      </fieldset>
      <fieldset v-else-if="step === 1">
        <legend>워크스페이스</legend>
        <div class="demo__grid">
          <label class="demo__field">
            팀 이름 (2자 이상)
            <input v-model.trim="form.team" minlength="2" required />
          </label>
          <label class="demo__field">
            역할
            <select v-model="form.role">
              <option>Developer</option>
              <option>Designer</option>
              <option>Manager</option>
            </select>
          </label>
        </div>
      </fieldset>
      <article v-else class="demo__output">
        <h3>설정 확인</h3>
        <dl>
          <dt>이름 / 이메일</dt>
          <dd>{{ form.name }} / {{ form.email }}</dd>
          <dt>팀 / 역할</dt>
          <dd>{{ form.team }} / {{ form.role }}</dd>
        </dl>
      </article>
      <footer class="demo__row">
        <button type="button" :disabled="step === 0" @click="step--">이전</button>
        <button type="submit" class="demo__primary" :disabled="!valid">
          {{ step === 2 ? '완료' : '다음' }}
        </button>
      </footer>
    </form>
    <article v-else class="demo__output">
      <h3>✓ 워크스페이스 설정이 완료되었습니다.</h3>
      <button
        @click="
          done = false;
          step = 0;
        "
      >
        다시 편집
      </button>
    </article>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.wizard__steps {
  display: flex;
  gap: 20px;
  list-style: none;
  padding: 0;
  flex-wrap: wrap;
  li {
    display: flex;
    gap: 8px;
    align-items: center;
    color: var(--caption);
    font-size: 12px;
    &[aria-current='step'] {
      color: var(--primary);
    }
    span {
      @include flex-center;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: var(--soft);
    }
  }
}
</style>
