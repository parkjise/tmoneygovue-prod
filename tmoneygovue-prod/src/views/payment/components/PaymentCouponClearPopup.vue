<template>
  <uu-modal ref="modal01Ref" v-model="modal01" type="confirm" hide-overlay>
    <template #modal_header> 쿠폰이 적용되지 않았습니다. </template>
    <template #modal_body>
      <p>
        화면 하단의 적용하기 버튼을 탭해야 선택하신 쿠폰이 적용됩니다.<br />
        그대로 진행하시겠습니까?
      </p>
    </template>
    <template #modal_footer="btnActions">
      <uu-button btn-color="primary" btn-style="line" label="아니요" @click="btnActions.close" />
      <uu-button btn-color="primary" label="네" @click="btnActions.ok" />
    </template>
  </uu-modal>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const modal01 = ref(false);
const open = () => (modal01.value = true);
defineExpose({ open });
</script>
