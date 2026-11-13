<script setup>
import { ref, computed } from 'vue';
import { Plus, Star, Grid2X2, List, ExternalLink } from 'lucide-vue-next';
import BaseModal from '@/components/common/BaseModal.vue';
const items = ref([
  {
    id: 1,
    title: 'Vue.js',
    url: 'https://vuejs.org',
    category: 'Development',
    favorite: true,
    description: 'The progressive JavaScript framework',
    icon: 'V',
    color: '#42b883'
  },
  {
    id: 2,
    title: 'Figma',
    url: 'https://figma.com',
    category: 'Design',
    favorite: true,
    description: 'Ideas come to life, together.',
    icon: 'F',
    color: '#a78bfa'
  },
  {
    id: 3,
    title: 'MDN Web Docs',
    url: 'https://developer.mozilla.org',
    category: 'Development',
    favorite: false,
    description: 'Resources for developers, by developers',
    icon: 'M',
    color: '#475569'
  },
  {
    id: 4,
    title: 'Dribbble',
    url: 'https://dribbble.com',
    category: 'Design',
    favorite: false,
    description: 'Discover the world’s top designers',
    icon: 'D',
    color: '#e995ba'
  }
]);
const category = ref('All');
const query = ref('');
const layout = ref('grid');
const open = ref(false);
const title = ref('');
const url = ref('');
const newCategory = ref('Development');
const error = ref('');
const filtered = computed(() =>
  items.value.filter(
    (i) =>
      (category.value === 'All' ||
        (category.value === 'Favorites' ? i.favorite : i.category === category.value)) &&
      i.title.toLowerCase().includes(query.value.toLowerCase())
  )
);
function add() {
  try {
    const parsed = new URL(url.value);
    if (!['https:', 'http:'].includes(parsed.protocol)) throw new Error();
    if (!title.value.trim()) return;
    items.value.push({
      id: Date.now(),
      title: title.value.trim(),
      url: parsed.href,
      category: newCategory.value,
      favorite: false,
      description: parsed.hostname,
      icon: title.value[0].toUpperCase(),
      color: '#6366f1'
    });
    open.value = false;
    title.value = '';
    url.value = '';
    error.value = '';
  } catch {
    error.value = 'http 또는 https URL을 입력하세요.';
  }
}
</script>
<template>
  <section class="demo">
    <header class="bookmark__toolbar">
      <nav aria-label="북마크 카테고리">
        <button
          v-for="c in ['All', 'Favorites', 'Development', 'Design']"
          :key="c"
          :aria-pressed="category === c"
          @click="category = c"
        >
          {{ c }}
        </button>
      </nav>
      <div class="demo__row">
        <input v-model="query" aria-label="북마크 검색" placeholder="Search bookmarks..." />
        <button aria-label="그리드 보기" :aria-pressed="layout === 'grid'" @click="layout = 'grid'">
          <Grid2X2 :size="16" />
        </button>
        <button aria-label="리스트 보기" :aria-pressed="layout === 'list'" @click="layout = 'list'">
          <List :size="16" />
        </button>
        <button class="demo__primary" @click="open = true">
          <Plus :size="15" />
          Add bookmark
        </button>
      </div>
    </header>
    <section class="bookmark__items" :class="{ 'bookmark__items--list': layout === 'list' }">
      <article v-for="item in filtered" :key="item.id" class="bookmark__card">
        <header>
          <span
            class="bookmark__icon"
            :style="{ color: item.color, background: item.color + '18' }"
          >
            {{ item.icon }}
          </span>
          <button
            :aria-label="item.title + ' 즐겨찾기'"
            :aria-pressed="item.favorite"
            @click="item.favorite = !item.favorite"
          >
            <Star
              :size="17"
              :fill="item.favorite ? '#f5bb4b' : 'none'"
              :color="item.favorite ? '#f5bb4b' : '#94a3b8'"
            />
          </button>
        </header>
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
        <footer>
          <span>{{ item.category }}</span>
          <a
            :href="item.url"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="item.title + ' 새 탭에서 열기'"
          >
            <ExternalLink :size="15" />
          </a>
        </footer>
      </article>
    </section>
    <p v-if="!filtered.length">북마크가 없습니다.</p>
    <BaseModal v-model="open" title="새 북마크">
      <form class="demo" @submit.prevent="add">
        <label class="demo__field">
          이름
          <input v-model="title" required />
        </label>
        <label class="demo__field">
          URL
          <input v-model="url" type="url" required placeholder="https://" />
        </label>
        <label class="demo__field">
          카테고리
          <select v-model="newCategory">
            <option>Development</option>
            <option>Design</option>
          </select>
        </label>
        <p v-if="error" role="alert" class="demo__error">{{ error }}</p>
        <button type="submit" class="demo__primary">북마크 추가</button>
      </form>
    </BaseModal>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.bookmark {
  &__toolbar {
    display: grid;
    gap: 18px;
    nav {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      button {
        border: 0;
        background: none;
        &[aria-pressed='true'] {
          background: var(--soft);
          color: var(--primary);
        }
      }
    }
  }
  &__items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 18px;
    &--list {
      grid-template-columns: 1fr;
    }
  }
  &__card {
    @include card-surface;
    padding: 22px;
    transition: transform 0.2s;
    &:hover {
      transform: translateY(-3px);
    }
    header {
      @include flex-between;
      button {
        border: 0;
        padding: 5px;
      }
    }
    h3 {
      font-size: 15px;
      margin-top: 18px;
    }
    p {
      font-size: 12px;
      color: var(--caption);
      margin: 8px 0 22px;
    }
    footer {
      @include flex-between;
      font-size: 10px;
      color: var(--caption);
      border-top: 1px solid var(--border);
      padding-top: 14px;
    }
  }
  &__icon {
    @include flex-center;
    width: 42px;
    height: 42px;
    border-radius: 12px;
    font-size: 22px;
    font-weight: 700;
  }
}
</style>
