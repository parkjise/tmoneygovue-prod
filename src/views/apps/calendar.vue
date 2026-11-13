<script setup>
import { ref, computed } from 'vue';
const today = new Date();
const month = ref(new Date(today.getFullYear(), today.getMonth(), 1));
const selected = ref('');
const title = ref('');
const events = ref([]);
const label = computed(() =>
  month.value.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })
);
const cells = computed(() => {
  const y = month.value.getFullYear(),
    m = month.value.getMonth(),
    offset = new Date(y, m, 1).getDay(),
    days = new Date(y, m + 1, 0).getDate();
  return Array.from({ length: Math.ceil((offset + days) / 7) * 7 }, (_, i) => {
    const day = i - offset + 1;
    return day > 0 && day <= days
      ? { day, key: `${y}-${String(m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` }
      : null;
  });
});
function move(step) {
  month.value = new Date(month.value.getFullYear(), month.value.getMonth() + step, 1);
}
function add() {
  if (!title.value.trim() || !selected.value) return;
  events.value.push({ id: Date.now(), date: selected.value, title: title.value.trim() });
  title.value = '';
}
</script>
<template>
  <section class="demo">
    <header class="demo__row">
      <button aria-label="이전 달" @click="move(-1)">←</button>
      <h3>{{ label }}</h3>
      <button aria-label="다음 달" @click="move(1)">→</button>
      <button @click="month = new Date(today.getFullYear(), today.getMonth(), 1)">오늘</button>
    </header>
    <section class="calendar" aria-label="월간 달력">
      <strong v-for="day in ['일', '월', '화', '수', '목', '금', '토']" :key="day">
        {{ day }}
      </strong>
      <template v-for="(cell, i) in cells" :key="cell?.key || 'blank' + i">
        <button
          v-if="cell"
          :aria-pressed="selected === cell.key"
          :aria-label="cell.key + ' 일정 선택'"
          @click="selected = cell.key"
        >
          <span>{{ cell.day }}</span>
          <small v-for="event in events.filter((e) => e.date === cell.key)" :key="event.id">
            {{ event.title }}
          </small>
        </button>
        <span v-else />
      </template>
    </section>
    <form class="demo__row" @submit.prevent="add">
      <label>
        일정 날짜
        <input v-model="selected" type="date" required />
      </label>
      <input v-model="title" aria-label="일정 제목" required placeholder="새 일정" />
      <button class="demo__primary" type="submit">일정 추가</button>
    </form>
    <ul class="demo__list">
      <li
        v-for="event in events.filter((e) => e.date === selected)"
        :key="event.id"
        class="demo__item"
      >
        {{ event.date }} · {{ event.title }}
        <button
          :aria-label="event.title + ' 삭제'"
          @click="events = events.filter((e) => e.id !== event.id)"
        >
          삭제
        </button>
      </li>
    </ul>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.calendar {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 5px;
  > strong {
    text-align: center;
    color: var(--caption);
    font-size: 12px;
  }
  button {
    min-height: 78px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding: 8px;
    &[aria-pressed='true'] {
      background: var(--soft);
      border-color: var(--primary);
    }
    small {
      @include text-ellipsis;
      max-width: 100%;
      font-size: 9px;
      color: var(--primary);
    }
  }
}
</style>
