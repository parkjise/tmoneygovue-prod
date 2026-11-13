<script setup>
import { people } from '@/data/people';
import BaseBadge from '@/components/common/BaseBadge.vue';
</script>
<template>
  <section class="demo">
    <section class="demo__scroll">
      <table>
        <caption>팀 멤버 기본 테이블</caption>
        <thead>
          <tr>
            <th scope="col">이름</th>
            <th scope="col">이메일</th>
            <th scope="col">역할</th>
            <th scope="col">상태</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="person in people.slice(0, 6)" :key="person.id">
            <th scope="row">{{ person.name }}</th>
            <td>{{ person.email }}</td>
            <td>{{ person.role }}</td>
            <td>
              <BaseBadge :tone="person.status === 'Active' ? 'success' : 'warning'">
                {{ person.status }}
              </BaseBadge>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
