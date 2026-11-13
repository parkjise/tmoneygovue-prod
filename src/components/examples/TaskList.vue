<script setup>
import { ref, computed } from 'vue';
const props = defineProps({ title: { type: String, default: '나의 할 일' } });
const input = ref(''),
  filter = ref('All');
const tasks = ref([
  { id: 1, title: '프로젝트 기획서 검토', done: true },
  { id: 2, title: 'Vue 컴포넌트 리팩토링', done: false },
  { id: 3, title: '팀 주간 미팅 준비', done: false }
]);
const filtered = computed(() =>
  tasks.value.filter((t) => filter.value === 'All' || (filter.value === 'Done' ? t.done : !t.done))
);
const completed = computed(() => tasks.value.filter((t) => t.done).length);
function add() {
  if (!input.value.trim()) return;
  tasks.value.push({ id: Date.now(), title: input.value.trim(), done: false });
  input.value = '';
}
</script>
<template>
  <section class="task-list">
    <h3>{{ props.title }}</h3>
    <p>{{ completed }} / {{ tasks.length }} 완료</p>
    <progress :value="completed" :max="Math.max(tasks.length, 1)" />
    <form @submit.prevent="add">
      <input v-model="input" aria-label="새 할 일" required placeholder="무엇을 해야 하나요?" />
      <button type="submit">+ 추가</button>
    </form>
    <nav aria-label="할 일 필터">
      <button
        v-for="f in ['All', 'Active', 'Done']"
        :key="f"
        :aria-pressed="filter === f"
        @click="filter = f"
      >
        {{ f }}
      </button>
    </nav>
    <ul>
      <li v-for="task in filtered" :key="task.id">
        <label>
          <input v-model="task.done" type="checkbox" />
          <span :class="{ 'task-list__title--done': task.done }">{{ task.title }}</span>
        </label>
        <button
          :aria-label="task.title + ' 삭제'"
          @click="tasks = tasks.filter((t) => t.id !== task.id)"
        >
          ×
        </button>
      </li>
    </ul>
    <p v-if="!filtered.length">할 일이 없습니다. 여유로운 하루 보내세요!</p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.task-list {
  display: grid;
  gap: 16px;
  p {
    color: var(--caption);
    font-size: 12px;
  }
  form {
    display: flex;
    gap: 10px;
    input {
      flex: 1;
    }
  }
  nav {
    display: flex;
    gap: 8px;
    button[aria-pressed='true'] {
      background: var(--soft);
      color: var(--primary);
    }
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 10px;
  }
  li {
    @include flex-between;
    padding: 12px;
    border: 1px solid var(--border);
    border-radius: 10px;
  }
  &__title--done {
    text-decoration: line-through;
    color: var(--caption);
  }
}
</style>
