import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import { defineAsyncComponent, markRaw } from 'vue';
import { menuGroups } from '@/data/menuData';
import ReferencePage from '@/views/ReferencePage.vue';
const views = import.meta.glob(['/src/views/**/*.vue', '!/src/views/ReferencePage.vue']);
const routes = menuGroups.flatMap((group) =>
  group.children.map((item) => ({
    path: item.path,
    name: item.folder + '-' + item.slug,
    component: ReferencePage,
    props: { example: markRaw(defineAsyncComponent(views['/src/views' + item.path + '.vue'])) },
    meta: { ...item, category: group.title }
  }))
);
const router = createRouter({
  history:
    import.meta.env.VITE_ROUTER_MODE === 'hash'
      ? createWebHashHistory(import.meta.env.BASE_URL)
      : createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/dashboard/default' },
    ...routes,
    { path: '/:pathMatch(.*)*', redirect: '/dashboard/default' }
  ],
  scrollBehavior: () => ({ top: 0 })
});
router.afterEach((to) => {
  document.title = `${to.meta.title || 'Workspace'} · Vue Atelier`;
});
export default router;
