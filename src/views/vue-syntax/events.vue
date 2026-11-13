<script setup>
import { ref } from 'vue';
const logs = ref([]);
const input = ref('');
function log(message) {
  logs.value = [message, ...logs.value].slice(0, 6);
}
function submit() {
  if (input.value.trim()) {
    log('제출: ' + input.value);
    input.value = '';
  }
}
</script>
<template>
  <section class="demo">
    <div class="demo__row">
      <a href="#prevented" @click.prevent="log('기본 링크 이동을 차단했습니다.')">
        @click.prevent 링크
      </a>
      <article class="demo__panel" @click="log('부모 클릭')">
        <button @click.stop="log('자식 클릭: 버블링 차단')">@click.stop</button>
      </article>
      <button @click="log('파라미터: Vue 3')">파라미터 전달</button>
    </div>
    <label>
      Enter로 기록
      <input v-model="input" @keyup.enter="submit" placeholder="메시지 입력 후 Enter" />
    </label>
    <form @submit.prevent="log('폼 새로고침 차단')">
      <button type="submit">@submit.prevent</button>
    </form>
    <ol class="demo__output">
      <li v-for="(message, i) in logs" :key="i">{{ message }}</li>
      <li v-if="!logs.length">이벤트를 실행해 보세요.</li>
    </ol>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
