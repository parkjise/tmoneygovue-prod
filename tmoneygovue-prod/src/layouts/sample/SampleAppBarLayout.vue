<template>
  <v-app-bar color="primary">
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"> </v-app-bar-nav-icon>

    <v-app-bar-title>
      sample page <v-icon :icon="mdiArrowLeft" @click="handleBack">mdi-arrow-left</v-icon></v-app-bar-title
    >
  </v-app-bar>

  <v-navigation-drawer v-model="drawer">
    <v-list>
      <v-list-item v-for="(item, i) in items" :key="i" link @click="clickGotoLink(item.link)">
        <v-list-item-title>
          {{ item.text }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import '@mdi/font/css/materialdesignicons.css';
import { logger } from '@/utils/logger';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import 'vuetify/styles';
import {
  VAppBar,
  VAppBarNavIcon,
  VAppBarTitle,
  VNavigationDrawer,
  VList,
  VListItem,
  VListItemTitle,
  VIcon
} from 'vuetify/components';
import { mdiArrowLeft } from '@mdi/js';
// import { aliases, mdi } from 'vuetify/iconsets/mdi';

const router = useRouter();

// const mdiArrowLeft = mdi['mdi-arrow-left'];
const clickGotoLink = (link: string) => {
  router.push({
    path: link
  });
};

const handleBack = () => {
  if ('/sample/reactive' == router.currentRoute.value.path) {
    logger.debug('is last page');
  } else {
    router.back();
  }
};

const drawer = ref(false);
const items = reactive([
  {
    icon: 'mdi-history',
    text: 'bridge-test',
    link: '/sample/bridge-test'
  },
  {
    icon: 'mdi-contacts',
    text: 'reactive',
    link: '/sample/reactive'
  },
  {
    icon: 'mdi-history',
    text: 'computed',
    link: '/sample/computed'
  },
  {
    icon: 'mdi-history',
    text: 'props-parent',
    link: '/sample/props-parent'
  },
  {
    icon: 'mdi-history',
    text: 'emits-parent',
    link: '/sample/emits-parent'
  },
  {
    icon: 'mdi-history',
    text: 'posts-list',
    link: '/sample/posts-list'
  },
  {
    icon: 'mdi-history',
    text: 'multi-language',
    link: '/sample/multi-language'
  },
  {
    icon: 'mdi-history',
    text: 'hello-world',
    link: '/sample/hello-world'
  }
]);
</script>
