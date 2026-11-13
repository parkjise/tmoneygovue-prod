<script setup>
import { ref, computed } from 'vue';
import { useProjects } from '@/composables/useProjects';
const { projects } = useProjects();
const status = ref('All');
const filtered = computed(() =>
  projects.value.filter((p) => status.value === 'All' || p.status === status.value)
);
</script>
<template>
  <section class="demo">
    <header class="demo__row">
      <label>
        상태
        <select v-model="status">
          <option>All</option>
          <option>In progress</option>
          <option>Completed</option>
          <option>Planning</option>
        </select>
      </label>
      <RouterLink to="/apps/new-project" class="demo__primary project__new">
        + 새 프로젝트
      </RouterLink>
    </header>
    <section class="demo__grid">
      <article v-for="project in filtered" :key="project.id" class="demo__panel project__card">
        <small>{{ project.status }}</small>
        <h3>{{ project.name }}</h3>
        <p>{{ project.description }}</p>
        <label>
          진행률
          <input v-model.number="project.progress" type="range" min="0" max="100" />
        </label>
        <progress :value="project.progress" max="100" />
        <span>{{ project.progress }}%</span>
      </article>
    </section>
    <p v-if="!filtered.length">해당 상태의 프로젝트가 없습니다.</p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.project__new {
  padding: 9px 15px;
  border-radius: 10px;
  font-size: 13px;
}
.project__card {
  display: grid;
  gap: 12px;
  small {
    color: var(--primary);
  }
  p {
    color: var(--caption);
    font-size: 12px;
  }
}
</style>
