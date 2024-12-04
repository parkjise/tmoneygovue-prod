<template>
  <v-layout class="sample-bottom-navi-layout overflow-visible" style="height: 56px">
    <v-bottom-navigation v-model="value" color="primary" active>
      <v-btn>
        <v-icon>mdi-train-bus</v-icon>
        <span>길찾기</span>
      </v-btn>

      <v-btn @click="onClickMovePage('/main/my-main')">
        <v-icon>mdi-account-circle</v-icon>
        <span>마이</span>
      </v-btn>

      <v-btn>
        <v-icon>mdi-bicycle</v-icon>
        <span>홈</span>
      </v-btn>
      <v-btn @click="onClickMovePage('/main/benefit-main')">
        <v-icon>mdi-gift</v-icon>
        <span>혜택</span>
      </v-btn>
      <v-btn @click="onClickMovePage('/main/more-main')">
        <v-icon>mdi-menu</v-icon>
        <span>더보기</span>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { VLayout, VBottomNavigation, VBtn, VIcon } from 'vuetify/components';
import 'vuetify/styles';

const router = useRouter();
const value = ref(4);

const onClickMovePage = (link: string) => {
  router.push(link);
};
</script>
