<script setup>
import { ref, computed } from 'vue';
import BaseModal from '@/components/common/BaseModal.vue';
const props = defineProps({ mode: { type: String, default: 'users' } });
const query = ref(''),
  open = ref(false),
  name = ref(''),
  email = ref(''),
  role = ref('Developer');
const people = ref([
  { id: 1, name: 'Jise Park', email: 'jise@example.com', role: 'Developer', active: true },
  { id: 2, name: 'Emma Wilson', email: 'emma@example.com', role: 'Designer', active: true },
  { id: 3, name: 'Alex Kim', email: 'alex@example.com', role: 'Manager', active: false }
]);
const filtered = computed(() =>
  people.value.filter((p) =>
    (p.name + p.email + p.role).toLowerCase().includes(query.value.toLowerCase())
  )
);
function add() {
  if (!name.value.trim()) return;
  people.value.push({
    id: Date.now(),
    name: name.value.trim(),
    email: email.value,
    role: role.value,
    active: true
  });
  open.value = false;
  name.value = '';
  email.value = '';
}
</script>
<template>
  <section class="people-directory">
    <header>
      <input
        v-model="query"
        aria-label="사용자 이름 또는 이메일 검색"
        placeholder="이름, 이메일, 역할 검색..."
      />
      <button @click="open = true">
        + {{ props.mode === 'contacts' ? '연락처' : '사용자' }} 추가
      </button>
    </header>
    <section class="people-directory__grid">
      <article v-for="person in filtered" :key="person.id">
        <span class="people-directory__avatar">
          {{
            person.name
              .split(' ')
              .map((n) => n[0])
              .join('')
          }}
        </span>
        <h3>{{ person.name }}</h3>
        <p>{{ person.role }}</p>
        <a :href="'mailto:' + person.email">{{ person.email }}</a>
        <button :aria-pressed="person.active" @click="person.active = !person.active">
          {{ person.active ? '● Active' : '○ Inactive' }}
        </button>
        <button
          :aria-label="person.name + ' 삭제'"
          @click="people = people.filter((p) => p.id !== person.id)"
        >
          삭제
        </button>
      </article>
    </section>
    <p v-if="!filtered.length">검색 결과가 없습니다.</p>
    <BaseModal v-model="open" title="새 연락처 / 사용자">
      <form @submit.prevent="add">
        <label>
          이름
          <input v-model="name" required />
        </label>
        <label>
          이메일
          <input v-model="email" type="email" required />
        </label>
        <label>
          역할
          <select v-model="role">
            <option>Developer</option>
            <option>Designer</option>
            <option>Manager</option>
          </select>
        </label>
        <button type="submit">추가</button>
      </form>
    </BaseModal>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.people-directory {
  display: grid;
  gap: 22px;
  header {
    @include flex-between;
    flex-wrap: wrap;
  }
  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 18px;
  }
  article {
    @include card-surface;
    display: grid;
    justify-items: center;
    gap: 12px;
    padding: 26px;
    h3 {
      font-size: 16px;
    }
    p,
    a {
      color: var(--muted);
      font-size: 12px;
    }
  }
  &__avatar {
    @include flex-center;
    width: 58px;
    height: 58px;
    border-radius: 50%;
    background: var(--soft);
    color: var(--primary);
    font-weight: 600;
  }
  form {
    display: grid;
    gap: 16px;
    label {
      display: grid;
    }
  }
}
</style>
