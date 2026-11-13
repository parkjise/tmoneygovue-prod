<script setup>
import { ref } from 'vue';
const columns = [
  { id: 'todo', title: 'To do', color: '#94a3b8' },
  { id: 'progress', title: 'In progress', color: '#6366f1' },
  { id: 'done', title: 'Done', color: '#10b981' }
];
const tasks = ref([
  { id: 1, title: '디자인 시스템 토큰 설계', status: 'todo', label: 'Design', assignee: 'EW' },
  {
    id: 2,
    title: '컴포넌트 라이브러리 구현',
    status: 'progress',
    label: 'Development',
    assignee: 'JP'
  },
  { id: 3, title: '사용자 인터뷰 정리', status: 'done', label: 'Research', assignee: 'AK' },
  { id: 4, title: '접근성 체크리스트 작성', status: 'todo', label: 'Planning', assignee: 'OC' }
]);
const title = ref('');
const dragged = ref(null);
function drop(status, e) {
  const id = Number(e.dataTransfer.getData('text/plain'));
  const task = tasks.value.find((t) => t.id === id);
  if (task) task.status = status;
  dragged.value = null;
}
function add() {
  if (!title.value.trim()) return;
  tasks.value.push({
    id: Date.now(),
    title: title.value.trim(),
    status: 'todo',
    label: 'New task',
    assignee: 'JP'
  });
  title.value = '';
}
</script>
<template>
  <section class="demo">
    <form class="demo__row" @submit.prevent="add">
      <input v-model="title" aria-label="새 태스크 제목" placeholder="새 태스크..." required />
      <button class="demo__primary" type="submit">+ 태스크 추가</button>
    </form>
    <p class="demo__muted">카드를 드래그해서 이동하거나 각 카드의 상태 선택을 사용하세요.</p>
    <section class="kanban">
      <article
        v-for="column in columns"
        :key="column.id"
        class="kanban__column"
        @dragover.prevent
        @drop.prevent="drop(column.id, $event)"
      >
        <header>
          <h3>
            <i :style="{ background: column.color }" />
            {{ column.title }}
          </h3>
          <span>{{ tasks.filter((t) => t.status === column.id).length }}</span>
        </header>
        <article
          v-for="task in tasks.filter((t) => t.status === column.id)"
          :key="task.id"
          draggable="true"
          class="kanban__task"
          :class="{ 'kanban__task--dragging': dragged === task.id }"
          @dragstart="
            dragged = task.id;
            $event.dataTransfer.setData('text/plain', String(task.id));
          "
          @dragend="dragged = null"
        >
          <small>{{ task.label }}</small>
          <h4>{{ task.title }}</h4>
          <footer>
            <span>{{ task.assignee }}</span>
            <select v-model="task.status" :aria-label="task.title + ' 상태'">
              <option v-for="c in columns" :key="c.id" :value="c.id">{{ c.title }}</option>
            </select>
          </footer>
        </article>
      </article>
    </section>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.kanban {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  &__column {
    background: var(--canvas);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 16px;
    min-height: 330px;
    > header {
      @include flex-between;
      margin-bottom: 20px;
      h3 {
        font-size: 13px;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      i {
        width: 7px;
        height: 7px;
        border-radius: 50%;
      }
      span {
        font-size: 11px;
        color: var(--caption);
      }
    }
  }
  &__task {
    @include card-surface;
    padding: 18px;
    margin-bottom: 12px;
    cursor: grab;
    small {
      font-size: 10px;
      background: var(--soft);
      color: var(--primary);
      padding: 3px 8px;
      border-radius: 5px;
    }
    h4 {
      margin: 14px 0;
      font-size: 13px;
    }
    footer {
      @include flex-between;
      span {
        font-size: 9px;
        background: #f0d7c5;
        border-radius: 50%;
        color: #845e4b;
        padding: 6px;
      }
      select {
        font-size: 10px;
        padding: 5px;
      }
    }
    &--dragging {
      opacity: 0.4;
    }
  }
  @include responsive(mobile) {
    grid-template-columns: 1fr;
  }
}
</style>
