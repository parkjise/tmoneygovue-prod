<script setup>
import { ref, computed } from 'vue';
import { Search, Moon, Sun, Bell, Menu, ChevronDown, Command } from 'lucide-vue-next';
import { useTheme } from '@/composables/useTheme';
import { menuItems } from '@/data/menuData';
const emit = defineEmits({ menu: () => true });
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
    <button class="app-header__menu" aria-label="전체 메뉴 열기" @click="emit('menu')">
      <Menu :size="20" />
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
        <Command :size="12" />
        <kbd>K</kbd>
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
    <nav class="app-header__actions" aria-label="설정">
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
      <span class="app-header__divider" />
      <span class="app-header__avatar">JP</span>
      <section class="app-header__profile">
        <strong>Jise Park</strong>
        <small>Frontend developer</small>
      </section>
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
    kbd {
      font-size: 10px;
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
  &__divider {
    height: 24px;
    border-left: 1px solid var(--border);
    margin: 0 3px;
  }
  &__avatar {
    @include flex-center;
    width: 34px;
    height: 34px;
    background: #f1d8c7;
    color: #845e4b;
    font-size: 11px;
    font-weight: 700;
    border-radius: 50%;
    border: 3px solid var(--surface);
    outline: 1px solid var(--border);
  }
  &__profile {
    display: grid;
    strong {
      font-size: 11px;
    }
    small {
      font-size: 9px;
      color: var(--caption);
    }
  }
  &__menu {
    display: none;
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
    }
    &__workspace {
      font-size: 10px;
    }
    &__profile,
    &__plan,
    &__divider {
      display: none;
    }
    &__actions {
      gap: 6px;
    }
  }
}
</style>
