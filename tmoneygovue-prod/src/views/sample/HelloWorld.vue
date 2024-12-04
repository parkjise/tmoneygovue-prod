<template>
  <div class="home">
    <!-- <v-btn color="primary" @click="haldleHelloText()"> call helloworld1 </v-btn>
    <br /><br />

    <p>응답값:{{ helloworldText1 }}</p> -->
    <br /><br />
    <div>
      <v-text-field v-model="travelApiUrl" label="request url" hide-details required></v-text-field>
      <v-btn color="primary" @click="onClickError1()"> call travel error api </v-btn>
      <br /><br />
      <!-- <p>응답값:{{ resError }}</p> -->
      <v-textarea rows="20" label="Description" placeholder="api response" v-model="resError"></v-textarea>
      <br /><br />
    </div>
  </div>
</template>

<script setup lang="ts">
// import { logger } from '@/utils/logger';
import { useHelloWorldStore } from '@/service/sample/helloWorldModule';
import { ref } from 'vue';
import { VBtn, VTextField, VTextarea } from 'vuetify/components';

const helloWorldStore = useHelloWorldStore();

// const helloworldText1 = ref('');
const resError = ref('');
const travelApiUrl = ref('common/sysError.do?errCd=P0002');

// async function haldleHelloText() {
//   logger.debug('log test debug');
//   logger.error('log test error');
//   logger.warn('log test warn');
//   logger.info('log test info');
//   console.warn('console test warn');
//   console.error('console test error');

//   const data = await helloWorldStore.reqHelloText();
//   console.log('haldleHelloText data' + helloWorldStore.getHelloText);
//   helloworldText1.value = data.helloText;
// }

const onClickError1 = async () => {
  const res = await helloWorldStore.reqError(travelApiUrl.value);
  resError.value = JSON.stringify(res, null, 2);
};
</script>
<script lang="ts">
export default {
  name: 'helloworld',
  inheritAttrs: false,
  customOptions: {}
};
</script>
