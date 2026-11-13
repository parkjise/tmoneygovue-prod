<script setup>
import { ref } from 'vue';
import ProfileEditor from '@/components/examples/ProfileEditor.vue';
const name = ref('Jise Park');
const saved = ref('아직 저장하지 않았습니다.');
</script>
<template>
  <section class="demo">
    <p class="demo__muted">
      Props는 단방향, Emits는 부모 알림, defineModel은 양방향 바인딩에 사용합니다.
    </p>
    <ProfileEditor
      v-model="name"
      label="사용자 이름"
      @save="(value) => (saved = value + ' 저장 완료')"
    >
      <template #header><h3>Named slot · 내 프로필</h3></template>
      <template #default="{ name: childName, length }">
        <p>Scoped slot: {{ childName }} ({{ length }}자)</p>
      </template>
    </ProfileEditor>
    <output class="demo__output">부모 상태: {{ name }} · {{ saved }}</output>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
