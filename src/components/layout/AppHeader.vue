<script setup>
import { ref, computed } from 'vue';
import {
  Search,
  Moon,
  Sun,
  Bell,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronDown
} from 'lucide-vue-next';
import { useTheme } from '@/composables/useTheme';
import { menuItems, tmoneyGuide } from '@/data/menuData';
const props = defineProps({
  mobile: { type: Boolean, default: false },
  sidebarOpen: { type: Boolean, default: true }
});
const emit = defineEmits({ menu: () => true });
const menuButton = ref(null);
const menuLabel = computed(() =>
  props.mobile
    ? props.sidebarOpen
      ? '전체 메뉴 닫기'
      : '전체 메뉴 열기'
    : props.sidebarOpen
      ? '사이드바 접기'
      : '사이드바 펼치기'
);
defineExpose({ focusMenu: () => menuButton.value?.focus() });
const { theme, toggle } = useTheme();
const query = ref('');
const notifications = ref(false);
const results = computed(() =>
  query.value
    ? menuItems.filter((i) => i.title.toLowerCase().includes(query.value.toLowerCase())).slice(0, 6)
    : []
);
</script>
<template>
  <header class="app-header">
    <button
      ref="menuButton"
      class="app-header__menu"
      :aria-label="menuLabel"
      :title="menuLabel"
      :aria-expanded="sidebarOpen"
      aria-controls="app-sidebar"
      @click="emit('menu')"
    >
      <Menu v-if="mobile" :size="20" />
      <PanelLeftClose v-else-if="sidebarOpen" :size="20" />
      <PanelLeftOpen v-else :size="20" />
    </button>
    <section class="app-header__workspace">
      <span class="app-header__workspace-icon">✦</span>
      <strong>Personal workspace</strong>
      <ChevronDown :size="13" />
      <span class="app-header__plan">PRO</span>
    </section>
    <section class="app-header__search">
      <label>
        <Search :size="16" />
        <input v-model="query" aria-label="페이지 빠른 검색" placeholder="무엇을 찾고 있나요?" />
      </label>
      <ul v-if="query">
        <li v-for="item in results" :key="item.path">
          <RouterLink :to="item.path" @click="query = ''">
            {{ item.title }}
            <small>{{ item.folder }}</small>
          </RouterLink>
        </li>
        <li v-if="!results.length">검색 결과 없음</li>
      </ul>
    </section>
    <a
      class="app-header__guide"
      :href="tmoneyGuide.href"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="tmoneyGuide.title + ' (새 창)'"
      :title="tmoneyGuide.title + ' (새 창)'"
    >
      T
    </a>
    <nav class="app-header__actions" aria-label="설정 및 바로가기">
      <button
        :aria-label="theme === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환'"
        @click="toggle"
      >
        <Moon v-if="theme === 'light'" :size="18" />
        <Sun v-else :size="18" />
      </button>
      <button
        aria-label="알림 보기"
        :aria-expanded="notifications"
        class="app-header__bell"
        @click="notifications = !notifications"
      >
        <Bell :size="18" />
        <i />
      </button>
    </nav>
    <section v-if="notifications" class="app-header__notification">
      <strong>모든 준비가 끝났어요 ✨</strong>
      <p>Vue 3 실무 예제와 UI 컴포넌트를 살펴보세요.</p>
      <RouterLink to="/vue-patterns/async" @click="notifications = false">
        실무 패턴 열기 →
      </RouterLink>
    </section>
  </header>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.app-header {
  @include flex-between;
  height: 79px;
  padding: 0 34px;
  position: sticky;
  top: 0;
  z-index: 30;
  background: color-mix(in srgb, var(--surface) 86%, transparent);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  &__workspace {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 11px;
    white-space: nowrap;
  }
  &__workspace-icon {
    background: var(--soft);
    color: var(--primary);
    padding: 4px 8px;
    border-radius: 8px;
    font-size: 18px;
  }
  &__plan {
    font-size: 8px;
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 1px 5px;
    color: var(--caption);
  }
  &__search {
    position: relative;
    margin-left: auto;
    label {
      display: flex;
      gap: 8px;
      color: var(--caption);
    }
    input {
      background: none !important;
      border: 0 !important;
      font-size: 11px;
      padding: 6px !important;
      width: 170px;
    }
    ul {
      @include card-surface;
      position: absolute;
      top: 34px;
      right: 0;
      width: 300px;
      list-style: none;
      margin: 0;
      padding: 8px;
      li {
        padding: 9px;
      }
      a {
        display: flex;
        justify-content: space-between;
        gap: 8px;
      }
      small {
        color: var(--caption);
      }
    }
  }
  &__guide {
    @include flex-center;
    @include focus-ring;
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    border: 1px solid var(--border);
    border-radius: 7px;
    background: var(--soft);
    color: var(--primary);
    font-size: 16px;
    font-weight: 800;
    text-decoration: none;
    &:hover {
      background: var(--primary);
      color: #fff;
    }
  }
  &__actions {
    display: flex;
    align-items: center;
    gap: 14px;
    button {
      border: 0;
      padding: 6px;
      background: none;
      color: var(--muted);
    }
  }
  &__bell {
    position: relative;
    i {
      position: absolute;
      right: 7px;
      top: 4px;
      width: 5px;
      height: 5px;
      background: var(--primary);
      border: 1px solid var(--surface);
      border-radius: 50%;
    }
  }
  &__menu {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-right: 14px;
    padding: 8px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--surface);
    color: var(--muted);
  }
  &__notification {
    @include card-surface;
    position: absolute;
    right: 24px;
    top: 68px;
    padding: 22px;
    font-size: 12px;
    p {
      color: var(--muted);
      margin: 8px 0;
    }
    a {
      color: var(--primary);
    }
  }
  @include responsive(tablet) {
    &__guide {
      margin-left: auto;
    }
    &__search {
      display: none;
    }
  }
  @include responsive(mobile) {
    padding: 0 18px;
    height: 66px;
    &__menu {
      display: flex;
      padding: 5px;
      margin-right: 0;
    }
    &__workspace {
      font-size: 10px;
    }
    &__plan {
      display: none;
    }
    &__actions {
      gap: 6px;
    }
  }
}
</style>
