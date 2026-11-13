<script setup>
import { ref, computed, watch } from 'vue';
import BasePagination from './BasePagination.vue';
const props = defineProps({ initialRows: { type: Array, required: true } });
const rows = ref(props.initialRows.map((r) => ({ ...r })));
const query = ref(''),
  sortKey = ref('name'),
  direction = ref(1),
  page = ref(1),
  pageSize = ref(5),
  selected = ref([]);
const filtered = computed(() =>
  rows.value
    .filter((r) => Object.values(r).join(' ').toLowerCase().includes(query.value.toLowerCase()))
    .sort(
      (a, b) =>
        String(a[sortKey.value]).localeCompare(String(b[sortKey.value]), 'ko', { numeric: true }) *
        direction.value
    )
);
const visible = computed(() =>
  filtered.value.slice((page.value - 1) * pageSize.value, page.value * pageSize.value)
);
const all = computed({
  get: () => visible.value.length > 0 && visible.value.every((r) => selected.value.includes(r.id)),
  set: (value) => {
    const ids = visible.value.map((r) => r.id);
    selected.value = value
      ? [...new Set([...selected.value, ...ids])]
      : selected.value.filter((id) => !ids.includes(id));
  }
});
const partial = computed(
  () => !all.value && visible.value.some((r) => selected.value.includes(r.id))
);
watch([query, pageSize], () => {
  page.value = 1;
});
function sort(key) {
  if (sortKey.value === key) direction.value *= -1;
  else {
    sortKey.value = key;
    direction.value = 1;
  }
}
function remove() {
  rows.value = rows.value.filter((r) => !selected.value.includes(r.id));
  selected.value = [];
}
function csvCell(value) {
  let text = String(value ?? '');
  if (/^[=+@\-\t\r]/.test(text)) text = "'" + text;
  return '"' + text.replaceAll('"', '""') + '"';
}
function download() {
  const fields = ['name', 'email', 'role', 'status'];
  const csv =
    '\ufeff' +
    [fields, ...filtered.value.map((row) => fields.map((k) => row[k]))]
      .map((line) => line.map(csvCell).join(','))
      .join('\r\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'vue-atelier-users.csv';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
const columns = [
  { key: 'name', label: '이름' },
  { key: 'email', label: '이메일' },
  { key: 'role', label: '역할' },
  { key: 'status', label: '상태' }
];
</script>
<template>
  <section class="data-table">
    <header>
      <label>
        검색
        <input v-model="query" placeholder="이름, 이메일, 역할..." />
      </label>
      <label>
        페이지 크기
        <select v-model.number="pageSize">
          <option :value="5">5개</option>
          <option :value="10">10개</option>
          <option :value="20">20개</option>
        </select>
      </label>
      <button :disabled="!selected.length" @click="remove">
        선택 {{ selected.length }}개 삭제
      </button>
      <button @click="download">↓ CSV 다운로드</button>
    </header>
    <section class="data-table__scroll">
      <table>
        <caption>
          팀 멤버 ·
          {{ filtered.length }}개 검색 결과
        </caption>
        <thead>
          <tr>
            <th>
              <input
                v-model="all"
                type="checkbox"
                :indeterminate="partial"
                aria-label="현재 페이지 전체 선택"
              />
            </th>
            <th
              v-for="col in columns"
              :key="col.key"
              :aria-sort="
                sortKey === col.key ? (direction === 1 ? 'ascending' : 'descending') : 'none'
              "
            >
              <button @click="sort(col.key)">
                {{ col.label }} {{ sortKey === col.key ? (direction === 1 ? '↑' : '↓') : '↕' }}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in visible" :key="row.id">
            <td>
              <input
                v-model="selected"
                type="checkbox"
                :value="row.id"
                :aria-label="row.name + ' 선택'"
              />
            </td>
            <td>{{ row.name }}</td>
            <td>{{ row.email }}</td>
            <td>{{ row.role }}</td>
            <td>
              <span
                class="data-table__status"
                :class="{ 'data-table__status--inactive': row.status !== 'Active' }"
              >
                {{ row.status }}
              </span>
            </td>
          </tr>
          <tr v-if="!visible.length">
            <td colspan="5">검색 결과가 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </section>
    <footer>
      <span>총 {{ filtered.length }}개 · {{ selected.length }}개 선택</span>
      <BasePagination v-model="page" :total="filtered.length" :page-size="pageSize" />
    </footer>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.data-table {
  display: grid;
  gap: 20px;
  header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    font-size: 12px;
    label:first-child {
      margin-right: auto;
    }
  }
  &__scroll {
    overflow: auto;
    @include custom-scrollbar;
  }
  caption {
    text-align: left;
    font-size: 12px;
    color: var(--muted);
    padding-bottom: 14px;
  }
  th {
    white-space: nowrap;
    button {
      border: 0;
      padding: 0;
      background: none;
      border-radius: 0;
      font-size: 12px;
      color: inherit;
    }
  }
  td {
    font-size: 12px;
  }
  footer {
    @include flex-between;
    flex-wrap: wrap;
    font-size: 11px;
    color: var(--caption);
  }
  &__status {
    color: #059669;
    background: #10b98112;
    border-radius: 9999px;
    font-size: 10px;
    padding: 3px 10px;
    &--inactive {
      color: #b7790b;
      background: #f59e0b12;
    }
  }
}
</style>
