<template>
  <common-modal v-model="showSortBottom" title="조회 기준 선택" type="bottom" hide-footer @close="close">
    <!-- <template #modal_header> 조회 기준 선택 </template> -->
    <template #modal_body>
      <form>
        <uu-radio
          v-for="(item, index) in mileageSortOptions"
          :key="index"
          v-model="selectedOption"
          :value="item.value"
          dropdown-radio
        >
          <template #label>
            <p class="option_txt">{{ item.title }}</p>
          </template>
        </uu-radio>
      </form>
    </template>
  </common-modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import CommonModal from '@/views/common/components/CommonModal.vue';

const props = defineProps({ isShow: { type: Boolean, default: false } });
const emit = defineEmits(['ok', 'close']);

const showSortBottom = ref(false);
const selectedOption = ref('00'); // 선택한 기준

const mileageSortOptions = ref([
  {
    title: '전체',
    value: '00'
  },
  {
    title: '적립',
    value: '01'
  },
  {
    title: '사용',
    value: '02'
  },
  {
    title: '취소',
    value: '03'
  }
]);

const close = () => {
  emit('close');
};

watch(
  () => selectedOption.value,
  () => {
    emit('ok', selectedOption.value);
  }
);

watch(
  () => props.isShow,
  () => {
    showSortBottom.value = props.isShow;
  }
);
</script>
