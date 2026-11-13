<script setup>
import { ref, computed } from 'vue';
import BaseModal from '@/components/common/BaseModal.vue';
const folder = ref('Inbox'),
  query = ref(''),
  active = ref(null),
  compose = ref(false);
const to = ref(''),
  subject = ref(''),
  body = ref('');
const emails = ref([
  {
    id: 1,
    from: 'Emma Wilson',
    subject: '디자인 리뷰가 준비됐어요',
    body: '새로운 디자인 시스템을 함께 검토해 주세요. 이번 주 금요일에 만나요!',
    folder: 'Inbox',
    read: false
  },
  {
    id: 2,
    from: 'Vue Atelier',
    subject: '워크스페이스에 오신 것을 환영합니다',
    body: '작은 아이디어를 시작할 모든 도구가 준비되었습니다.',
    folder: 'Inbox',
    read: true
  }
]);
const filtered = computed(() =>
  emails.value.filter(
    (e) =>
      e.folder === folder.value &&
      (e.subject + e.from).toLowerCase().includes(query.value.toLowerCase())
  )
);
function send() {
  if (!to.value || !subject.value.trim() || !body.value.trim()) return;
  emails.value.push({
    id: Date.now(),
    from: to.value,
    subject: subject.value,
    body: body.value,
    folder: 'Sent',
    read: true
  });
  compose.value = false;
  folder.value = 'Sent';
  to.value = '';
  subject.value = '';
  body.value = '';
}
</script>
<template>
  <section class="demo">
    <p class="demo__muted">
      이메일 클라이언트 데모입니다. 작성한 메일은 세션의 Sent 목록에만 추가됩니다.
    </p>
    <div class="demo__row">
      <button
        v-for="f in ['Inbox', 'Sent', 'Trash']"
        :key="f"
        :aria-pressed="folder === f"
        @click="
          folder = f;
          active = null;
        "
      >
        {{ f }}
      </button>
      <input v-model="query" aria-label="메일 검색" placeholder="메일 검색" />
      <button class="demo__primary" @click="compose = true">+ 메일 작성</button>
    </div>
    <ul class="demo__list">
      <li v-for="mail in filtered" :key="mail.id">
        <button
          class="email__item"
          @click="
            active = mail;
            mail.read = true;
          "
        >
          <span>{{ mail.read ? '○' : '●' }} {{ mail.from }}</span>
          <strong>{{ mail.subject }}</strong>
        </button>
      </li>
    </ul>
    <p v-if="!filtered.length">메일이 없습니다.</p>
    <article v-if="active" class="demo__panel">
      <h3>{{ active.subject }}</h3>
      <p class="demo__muted">{{ active.from }}</p>
      <p class="email__body">{{ active.body }}</p>
      <button
        v-if="active.folder !== 'Trash'"
        @click="
          active.folder = 'Trash';
          active = null;
        "
      >
        휴지통으로 이동
      </button>
    </article>
    <BaseModal v-model="compose" title="메일 작성">
      <form class="demo" @submit.prevent="send">
        <label class="demo__field">
          받는 사람
          <input v-model="to" type="email" required />
        </label>
        <label class="demo__field">
          제목
          <input v-model="subject" required />
        </label>
        <label class="demo__field">
          내용
          <textarea v-model="body" required rows="4" />
        </label>
        <button type="submit" class="demo__primary">데모 메일 저장</button>
      </form>
    </BaseModal>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.email__item {
  @include flex-between;
  width: 100%;
  text-align: left;
  padding: 20px;
  strong {
    font-size: 13px;
  }
}
.email__body {
  white-space: pre-wrap;
  padding: 24px 0;
}
</style>
