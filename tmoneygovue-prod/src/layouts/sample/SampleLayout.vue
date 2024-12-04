<template>
  <v-app>
    <sample-app-bar-layout />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import SampleAppBarLayout from './SampleAppBarLayout.vue';
import { VApp, VMain, VContainer } from 'vuetify/components';
</script>
