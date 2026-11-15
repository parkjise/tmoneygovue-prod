<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import AppSidebar from '@/components/layout/AppSidebar.vue';
import AppHeader from '@/components/layout/AppHeader.vue';
import AppBreadcrumb from '@/components/layout/AppBreadcrumb.vue';
const menu = ref(false);
const mobileQuery = window.matchMedia('(max-width: 760px)');
const mobile = ref(mobileQuery.matches);
const header = ref(null);
let storedCollapsed = false;
try {
  storedCollapsed = localStorage.getItem('atelier-sidebar-collapsed') === 'true';
} catch {
  /* Use the default when storage is unavailable. */
}
const sidebarCollapsed = ref(storedCollapsed);
const sidebarVisible = computed(() => (mobile.value ? menu.value : !sidebarCollapsed.value));
watch(sidebarCollapsed, (value) => {
  try {
    localStorage.setItem('atelier-sidebar-collapsed', String(value));
  } catch {
    /* Toggling still works without persistence. */
  }
});
function toggleSidebar() {
  if (mobile.value) menu.value = !menu.value;
  else sidebarCollapsed.value = !sidebarCollapsed.value;
}
function closeMobileMenu() {
  if (mobile.value && menu.value) {
    menu.value = false;
    header.value?.focusMenu();
  }
}
function updateViewport(event) {
  mobile.value = event.matches;
  menu.value = false;
}
function onEscape(event) {
  if (event.key === 'Escape') closeMobileMenu();
}
onMounted(() => {
  mobileQuery.addEventListener('change', updateViewport);
  window.addEventListener('keydown', onEscape);
});
onUnmounted(() => {
  mobileQuery.removeEventListener('change', updateViewport);
  window.removeEventListener('keydown', onEscape);
});
const route = useRoute();
function focusMain() {
  document.getElementById('main-content')?.focus();
}
watch(
  () => route.path,
  () => {
    menu.value = false;
  }
);
</script>
<template>
  <a
    href="#main-content"
    class="default-layout__skip"
    :style="{ left: sidebarVisible && !mobile ? '280px' : '16px' }"
    @click.prevent="focusMain"
  >
    본문으로 건너뛰기
  </a>
  <AppSidebar :open="menu" :visible="sidebarVisible" @close="closeMobileMenu" />
  <button
    v-if="menu && mobile"
    class="default-layout__backdrop"
    aria-label="메뉴 닫기"
    @click="closeMobileMenu"
  />
  <section class="default-layout__body" :class="{ 'default-layout__body--wide': sidebarCollapsed }">
    <AppHeader ref="header" :mobile="mobile" :sidebar-open="sidebarVisible" @menu="toggleSidebar" />
    <main id="main-content" class="default-layout__main" tabindex="-1">
      <AppBreadcrumb />
      <RouterView v-slot="{ Component }">
        <component :is="Component" :key="route.path" />
      </RouterView>
    </main>
    <footer class="default-layout__footer">
      <span>© {{ new Date().getFullYear() }} Vue Atelier</span>
      <a
        href="https://github.com/parkjise/tmoneygovue-prod"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub ↗
      </a>
      <span>
        Crafted with Vue 3
        <span class="default-layout__heart">♡</span>
        Made for developers.
      </span>
    </footer>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.default-layout {
  &__body {
    margin-left: 254px;
    transition: margin-left 0.2s ease;
    &--wide {
      margin-left: 0;
    }
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  &__main {
    padding: 24px 34px 34px;
    max-width: 1680px;
    width: 100%;
    margin: auto;
    flex: 1;
    outline: none;
  }
  &__footer {
    flex-wrap: wrap;
    @include flex-between;
    border-top: 1px solid var(--border);
    padding: 18px 34px;
    font-size: 10px;
    color: var(--caption);
  }
  &__heart {
    color: var(--primary);
  }
  &__skip {
    position: fixed;
    top: -100px;
    left: 280px;
    z-index: 300;
    padding: 12px;
    background: var(--surface);
    &:focus {
      top: 10px;
    }
  }
  &__backdrop {
    position: fixed;
    inset: 0;
    z-index: 45;
    background: #0f172a77;
    border: 0;
    border-radius: 0;
  }
  @media (prefers-reduced-motion: reduce) {
    &__body {
      transition: none;
    }
  }
  @include responsive(mobile) {
    &__body {
      margin-left: 0;
    }
    &__main {
      padding: 20px 16px;
    }
    &__footer {
      flex-wrap: wrap;
      padding: 18px 16px;
      font-size: 9px;
      gap: 10px;
    }
  }
}
</style>
