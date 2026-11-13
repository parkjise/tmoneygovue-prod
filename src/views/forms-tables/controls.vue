<script setup>
import { reactive } from 'vue';
const form = reactive({
  name: 'Jise',
  email: 'jise@example.com',
  role: 'Developer',
  newsletter: true,
  theme: 'light',
  level: 70,
  bio: ''
});
</script>
<template>
  <section class="demo">
    <form class="demo" @submit.prevent>
      <div class="demo__grid">
        <label class="demo__field">
          이름
          <input v-model.trim="form.name" />
        </label>
        <label class="demo__field">
          이메일
          <input v-model="form.email" type="email" />
        </label>
        <label class="demo__field">
          역할
          <select v-model="form.role">
            <option>Developer</option>
            <option>Designer</option>
          </select>
        </label>
      </div>
      <label class="demo__field">
        자기소개
        <textarea v-model="form.bio" rows="3" />
      </label>
      <fieldset>
        <legend>테마</legend>
        <label>
          <input v-model="form.theme" type="radio" value="light" />
          Light
        </label>
        <label>
          <input v-model="form.theme" type="radio" value="dark" />
          Dark
        </label>
      </fieldset>
      <label>
        <input v-model="form.newsletter" type="checkbox" />
        뉴스레터 수신
      </label>
      <label>
        숙련도 {{ form.level }}%
        <input v-model.number="form.level" type="range" min="0" max="100" />
      </label>
    </form>
    <pre class="demo__output">{{ JSON.stringify(form, null, 2) }}</pre>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
