const SampleLayout = () => import(/* webpackChunkName: "group-sample" */ '@/layouts/sample/SampleLayout.vue');
const Reactive = () => import(/* webpackChunkName: "group-sample" */ '@/views/sample/Reactive.vue');
const Computed = () => import(/* webpackChunkName: "group-sample" */ '@/views/sample/Computed.vue');
const PropsParent = () => import(/* webpackChunkName: "group-sample" */ '@/views/sample/PropsParent.vue');
const EmitsParent = () => import(/* webpackChunkName: "group-sample" */ '@/views/sample/EmitsParent.vue');
const PostsList = () => import(/* webpackChunkName: "group-sample" */ '@/views/sample/PostsList.vue');
const PostsDetail = () => import(/* webpackChunkName: "group-sample" */ '@/views/sample/PostsDetail.vue');
const BridgeTest = () => import(/* webpackChunkName: "group-sample" */ '@/views/sample/BridgeTest.vue');
const MultiLanguage = () => import(/* webpackChunkName: "group-sample" */ '@/views/sample/MultiLanguage.vue');
const HelloWorld = () => import(/* webpackChunkName: "group-sample" */ '@/views/sample/HelloWorld.vue');
const Skeleton = () => import(/* webpackChunkName: "group-sample" */ '@/views/sample/Skeleton.vue');

export default {
  path: '/sample',
  component: SampleLayout,
  redirect: '/sample/bridge-test',

  children: [
    {
      path: '/sample/reactive',
      component: Reactive,
      meta: {
        title: 'reactive',
        isIgnoreAuth: true
      }
    },
    {
      path: '/sample/computed',
      component: Computed,
      meta: {
        title: 'computed',
        isIgnoreAuth: true
      }
    },
    {
      path: '/sample/props-parent',
      component: PropsParent,
      meta: {
        title: 'propsParent',
        isIgnoreAuth: true
      }
    },
    {
      path: '/sample/emits-parent',
      component: EmitsParent,
      meta: {
        title: 'emitsParent',
        isIgnoreAuth: true
      }
    },
    {
      path: '/sample/posts-list',
      component: PostsList,
      meta: {
        title: 'postsList',
        isIgnoreAuth: true
      }
    },
    {
      path: '/sample/posts-detail',
      name: 'posts-detail',
      component: PostsDetail,
      meta: {
        title: 'postsDetail',
        isIgnoreAuth: true
      }
    },
    {
      path: '/sample/bridge-test',
      component: BridgeTest,
      meta: {
        title: 'bridgeTest',
        isIgnoreAuth: true
      }
    },
    {
      path: '/sample/multi-language',
      component: MultiLanguage,
      meta: {
        title: 'multiLanguage',
        isIgnoreAuth: true
      }
    },
    {
      path: '/sample/hello-world',
      component: HelloWorld,
      meta: {
        title: 'helloWorld',
        isIgnoreAuth: true
      }
    },
    {
      path: '/sample/skeleton',
      component: Skeleton,
      meta: {
        title: 'skeleton',
        isIgnoreAuth: true
      }
    }
  ]
};
