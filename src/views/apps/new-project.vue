<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useProjects } from '@/composables/useProjects';
import { useToast } from '@/composables/useToast';
const router = useRouter();
const { projects } = useProjects();
const { toast } = useToast();
const name = ref('');
const description = ref('');
const status = ref('Planning');
const error = ref('');
function create() {
  if (name.value.trim().length < 3) {
    error.value = '프로젝트 이름을 3자 이상 입력하세요.';
    return;
  }
  projects.value.push({
    id: Date.now(),
    name: name.value.trim(),
    description: description.value,
    status: status.value,
    progress: 0
  });
  toast('프로젝트를 생성했습니다.');
  router.push('/apps/projects');
}
</script>
<template>
  <section class="demo">
    <form class="demo" @submit.prevent="create">
      <label class="demo__field">
        프로젝트 이름
        <input
          v-model="name"
          required
          minlength="3"
          maxlength="80"
          placeholder="새로운 아이디어의 이름"
        />
      </label>
      <label class="demo__field">
        프로젝트 설명
        <textarea v-model="description" rows="4" />
      </label>
      <label class="demo__field">
        상태
        <select v-model="status">
          <option>Planning</option>
          <option>In progress</option>
          <option>Completed</option>
        </select>
      </label>
      <p v-if="error" role="alert" class="demo__error">{{ error }}</p>
      <button type="submit" class="demo__primary">프로젝트 생성</button>
    </form>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
