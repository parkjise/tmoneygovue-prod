<script setup>
import { ref, computed } from 'vue';
const folder = ref('All files');
const query = ref('');
const dragging = ref(false);
const files = ref([
  { id: 1, name: 'Brand guidelines.pdf', folder: 'Documents', size: 2400000 },
  { id: 2, name: 'Dashboard.fig', folder: 'Design', size: 8600000 },
  { id: 3, name: 'Project notes.md', folder: 'Documents', size: 12000 },
  { id: 4, name: 'Workspace.png', folder: 'Images', size: 420000 }
]);
const filtered = computed(() =>
  files.value.filter(
    (f) =>
      (folder.value === 'All files' || f.folder === folder.value) &&
      f.name.toLowerCase().includes(query.value.toLowerCase())
  )
);
function upload(list) {
  Array.from(list || []).forEach((file, i) =>
    files.value.push({
      id: Date.now() + i,
      name: file.name,
      folder: folder.value === 'All files' ? 'Documents' : folder.value,
      size: file.size
    })
  );
  dragging.value = false;
}
</script>
<template>
  <section class="demo">
    <p class="demo__muted">
      로컬 데모: 파일 이름과 크기만 세션에 추가하며 서버에 업로드하지 않습니다.
    </p>
    <section class="files">
      <nav aria-label="폴더 트리">
        <button
          v-for="f in ['All files', 'Documents', 'Design', 'Images']"
          :key="f"
          :aria-pressed="folder === f"
          @click="folder = f"
        >
          ▱ {{ f }}
        </button>
      </nav>
      <section class="demo">
        <input v-model="query" aria-label="파일 검색" placeholder="파일 검색..." />
        <label
          class="files__drop"
          :class="{ 'files__drop--active': dragging }"
          @dragover.prevent="dragging = true"
          @dragleave="dragging = false"
          @drop.prevent="upload($event.dataTransfer.files)"
        >
          <span>↑ 파일을 드래그하거나 선택하세요</span>
          <input
            type="file"
            multiple
            aria-label="파일 추가"
            @change="
              upload($event.target.files);
              $event.target.value = '';
            "
          />
        </label>
        <ul class="demo__list">
          <li v-for="f in filtered" :key="f.id" class="demo__item">
            <span>
              ▤ {{ f.name }}
              <small>{{ (f.size / 1000000).toFixed(2) }} MB</small>
            </span>
            <button
              :aria-label="f.name + ' 삭제'"
              @click="files = files.filter((item) => item.id !== f.id)"
            >
              삭제
            </button>
          </li>
        </ul>
        <p v-if="!filtered.length">파일이 없습니다.</p>
      </section>
    </section>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.files {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 24px;
  nav {
    display: grid;
    align-content: start;
    gap: 6px;
    button {
      text-align: left;
      border: 0;
      &[aria-pressed='true'] {
        background: var(--soft);
        color: var(--primary);
      }
    }
  }
  &__drop {
    display: grid;
    text-align: center;
    padding: 30px;
    border: 2px dashed var(--border);
    border-radius: 12px;
    color: var(--caption);
    &--active {
      border-color: var(--primary);
      background: var(--soft);
    }
  }
  small {
    color: var(--caption);
    font-size: 10px;
  }
  @include responsive(mobile) {
    grid-template-columns: 1fr;
  }
}
</style>
