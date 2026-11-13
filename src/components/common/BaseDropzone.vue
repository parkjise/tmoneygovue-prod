<script setup>
import { ref } from 'vue';
const files = defineModel({ type: Array, default: () => [] });
defineProps({ accept: { type: String, default: '' } });
const dragging = ref(false);
function add(list) {
  files.value = [
    ...files.value,
    ...Array.from(list || []).map((f) => ({ name: f.name, size: f.size, id: crypto.randomUUID() }))
  ];
  dragging.value = false;
}
</script>
<template>
  <section class="base-dropzone">
    <label
      class="base-dropzone__area"
      :class="{ 'base-dropzone__area--active': dragging }"
      @dragover.prevent="dragging = true"
      @dragleave.prevent="dragging = false"
      @drop.prevent="add($event.dataTransfer.files)"
    >
      <strong>↑</strong>
      <span>파일을 끌어오거나 선택하세요</span>
      <small>데모: 메타데이터만 보관합니다. 서버로 전송하지 않습니다.</small>
      <input
        type="file"
        multiple
        :accept="accept"
        aria-label="파일 선택"
        @change="
          add($event.target.files);
          $event.target.value = '';
        "
      />
    </label>
    <ul>
      <li v-for="file in files" :key="file.id">
        <span>{{ file.name }} · {{ (file.size / 1024).toFixed(1) }} KB</span>
        <button
          :aria-label="file.name + ' 제거'"
          @click="files = files.filter((f) => f.id !== file.id)"
        >
          ×
        </button>
      </li>
    </ul>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.base-dropzone {
  &__area {
    @include flex-center;
    flex-direction: column;
    padding: 30px;
    border: 2px dashed var(--border);
    border-radius: 14px;
    gap: 12px;
    strong {
      font-size: 32px;
      color: var(--primary);
    }
    small {
      font-size: 11px;
      color: var(--caption);
    }
    input {
      max-width: 100%;
    }
    &--active {
      border-color: var(--primary);
      background: var(--soft);
    }
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    @include flex-between;
    padding: 10px;
    border-bottom: 1px solid var(--border);
    font-size: 12px;
  }
}
</style>
