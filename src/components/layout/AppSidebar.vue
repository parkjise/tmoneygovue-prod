<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import {
  Search,
  Palette,
  ChevronDown,
  X,
  Layers,
  CodeXml,
  Workflow,
  LayoutDashboard,
  Component,
  Table2,
  ExternalLink,
  ArrowUpRight
} from 'lucide-vue-next';
import { menuGroups, sidebarLinks } from '@/data/menuData';
const props = defineProps({ open: { type: Boolean, default: false } });
const emit = defineEmits({ close: () => true });
const route = useRoute();
const query = ref('');
const collapsed = ref(
  new Set(['Applications', 'UI Kits & Bonus UI', 'Forms & Tables', 'SCSS 실무 가이드'])
);
watch(
  () => route.path,
  (path) => {
    const group = menuGroups.find((g) => g.children.some((i) => i.path === path));
    if (group) {
      const next = new Set(collapsed.value);
      next.delete(group.title);
      collapsed.value = next;
    }
  },
  { immediate: true }
);
const icons = { Layers, CodeXml, Workflow, LayoutDashboard, Component, Table2, Palette };
const externalLinks = computed(() =>
  sidebarLinks.filter((item) => item.title.toLowerCase().includes(query.value.toLowerCase()))
);
const groups = computed(() =>
  menuGroups
    .map((g) => ({
      ...g,
      children: g.children.filter((i) =>
        (g.title + ' ' + i.title + ' ' + i.description)
          .toLowerCase()
          .includes(query.value.toLowerCase())
      )
    }))
    .filter((g) => g.children.length)
);
function toggle(title) {
  const set = new Set(collapsed.value);
  set.has(title) ? set.delete(title) : set.add(title);
  collapsed.value = set;
}
</script>
<template>
  <aside class="app-sidebar" :class="{ 'app-sidebar--open': props.open }">
    <RouterLink to="/" class="app-sidebar__brand" @click="emit('close')">
      <span class="app-sidebar__logo">
        v
        <span>✳</span>
      </span>
      vue
      <span class="app-sidebar__word">atelier</span>
      <small>3</small>
    </RouterLink>
    <button class="app-sidebar__close" aria-label="메뉴 닫기" @click="emit('close')">
      <X :size="18" />
    </button>
    <p class="app-sidebar__caption">YOUR VUE WORKSPACE</p>
    <label class="app-sidebar__search">
      <Search :size="15" />
      <input v-model="query" aria-label="메뉴 검색" placeholder="메뉴 검색..." />
      <kbd>/</kbd>
    </label>
    <nav class="app-sidebar__nav" aria-label="전체 메뉴">
      <a
        v-for="item in externalLinks"
        :key="item.href"
        :href="item.href"
        class="app-sidebar__category app-sidebar__category--direct"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="item.title + ' (새 창)'"
        @click="emit('close')"
      >
        <ExternalLink :size="17" />
        <span>{{ item.title }}</span>
        <ArrowUpRight :size="13" />
      </a>
      <section v-for="group in groups" :key="group.title" class="app-sidebar__group">
        <RouterLink
          v-if="group.direct"
          :to="group.children[0].path"
          class="app-sidebar__category app-sidebar__category--direct"
          @click="emit('close')"
        >
          <component :is="icons[group.icon]" :size="17" />
          <span>{{ group.title }}</span>
        </RouterLink>
        <button
          v-else
          class="app-sidebar__category"
          :aria-expanded="!!query || !collapsed.has(group.title)"
          @click="toggle(group.title)"
        >
          <component :is="icons[group.icon]" :size="17" />
          <span>{{ group.title }}</span>
          <ChevronDown :size="13" />
        </button>
        <ul v-if="!group.direct" v-show="query || !collapsed.has(group.title)">
          <li v-for="item in group.children" :key="item.path">
            <RouterLink :to="item.path" class="app-sidebar__link" @click="emit('close')">
              <span class="app-sidebar__dot" />
              {{ item.title }}
              <small v-if="item.slug === 'default'">NEW</small>
            </RouterLink>
          </li>
        </ul>
      </section>
      <p v-if="!groups.length && !externalLinks.length" class="app-sidebar__empty">
        검색 결과가 없습니다.
      </p>
    </nav>
    <footer class="app-sidebar__footer">
      <span class="app-sidebar__version">✦</span>
      <section>
        <strong>Build something great.</strong>
        <p>Vue 3 실무 레퍼런스</p>
      </section>
      <RouterLink to="/vue-syntax/conditional" aria-label="가이드 시작">
        <ArrowUpRight :size="16" />
      </RouterLink>
    </footer>
  </aside>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.app-sidebar {
  width: 254px;
  position: fixed;
  inset: 0 auto 0 0;
  background: var(--surface);
  border-right: 1px solid var(--border);
  z-index: 50;
  display: flex;
  flex-direction: column;
  &__brand {
    display: flex;
    align-items: center;
    padding: 27px 26px 25px;
    gap: 3px;
    font-size: 26px;
    font-weight: 750;
    letter-spacing: -1px;
    small {
      background: var(--soft);
      color: var(--primary);
      font-size: 10px;
      padding: 1px 5px;
      border-radius: 5px;
      align-self: flex-start;
      letter-spacing: 0;
      margin: 4px;
    }
  }
  &__word {
    font-weight: 400;
  }
  &__logo {
    font-size: 28px;
    background: var(--primary);
    color: #fff;
    border-radius: 10px;
    width: 35px;
    height: 35px;
    line-height: 33px;
    text-align: center;
    position: relative;
    margin-right: 7px;
    span {
      font-size: 15px;
      position: absolute;
      right: 1px;
      top: -6px;
      color: #c4b5fd;
    }
  }
  &__caption {
    font-size: 9px;
    font-weight: 650;
    letter-spacing: 1.8px;
    color: var(--caption);
    padding: 0 25px 13px;
  }
  &__search {
    display: flex;
    margin: 0 18px 18px;
    border: 1px solid var(--border);
    padding: 8px 10px;
    border-radius: 8px;
    color: var(--caption);
    input {
      width: 100%;
      border: 0 !important;
      background: none !important;
      padding: 0 !important;
      font-size: 12px;
      outline: none;
    }
    kbd {
      font-size: 11px;
      border: 1px solid var(--border);
      padding: 0 4px;
      border-radius: 3px;
    }
  }
  &__nav {
    @include custom-scrollbar;
    overflow: auto;
    flex: 1;
    padding: 0 13px;
  }
  &__group {
    margin-bottom: 13px;
  }
  &__category {
    display: flex;
    align-items: center;
    gap: 10px;
    border: 0;
    width: 100%;
    font-size: 11px;
    font-weight: 650;
    padding: 9px 10px;
    background: none;
    color: var(--muted);
    text-align: left;
    span {
      flex: 1;
    }
  }
  &__category--direct {
    border-radius: 8px;
    @include focus-ring;
    &:hover {
      background: var(--canvas);
    }
    &.router-link-exact-active {
      color: var(--primary);
      background: var(--soft);
    }
  }
  ul {
    list-style: none;
    padding: 4px 0;
    margin: 0;
  }
  &__link {
    display: flex;
    align-items: center;
    gap: 11px;
    margin: 2px 0;
    padding: 9px 14px 9px 19px;
    font-size: 12px;
    color: var(--muted);
    border-radius: 8px;
    &:hover {
      background: var(--canvas);
    }
    &.router-link-exact-active {
      color: var(--primary);
      background: var(--soft);
      font-weight: 600;
    }
    small {
      font-size: 8px;
      color: var(--primary);
      margin-left: auto;
    }
  }
  &__dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: currentColor;
    opacity: 0.6;
  }
  &__footer {
    @include flex-between;
    padding: 18px 16px;
    border-top: 1px solid var(--border);
    strong {
      font-size: 10px;
    }
    p {
      font-size: 9px;
      color: var(--caption);
    }
  }
  &__version {
    @include flex-center;
    background: var(--soft);
    width: 30px;
    height: 32px;
    color: var(--primary);
    border-radius: 8px;
  }
  &__close {
    display: none;
  }
  &__empty {
    padding: 16px;
    color: var(--muted);
  }
  @include responsive(mobile) {
    transform: translateX(-100%);
    transition: transform 0.2s;
    &--open {
      transform: translateX(0);
    }
    &__close {
      display: block;
      position: absolute;
      right: 10px;
      top: 30px;
      padding: 3px;
    }
  }
}
</style>
