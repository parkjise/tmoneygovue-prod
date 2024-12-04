<template>
  <common-modal ref="isShowRef" v-model="driverType" type="bottom" title="면허종류 선택" @close="close" hide-footer>
    <template #modal_body>
      <form class="driver_select">
        <div v-for="(driverLicenceType, index) in driverLicenceTypeList.codeList" :key="index">
          <uu-radio
            v-model="licenseStore.checkedLcnsKndCd"
            :value="driverLicenceType.code"
            dropdown-radio
            @change="select(driverLicenceType.name)"
          >
            <template #label>
              <p>{{ driverLicenceType.name }}</p>
            </template>
          </uu-radio>
        </div>
      </form>
    </template>
  </common-modal>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import CommonModal from '@/views/common/components/CommonModal.vue';
import { useDriverLicense } from '@/service/member/driverLicenseModule';

const licenseStore = useDriverLicense();
const driverType = ref(false);
/**
 * 운전면허종별코드
 */
const driverLicenceTypeList = computed(() => licenseStore.driverLicenceTypeList);

const emit = defineEmits(['close']);
const props = defineProps({ isShow: { type: Boolean, required: true } });

// 운전면허종별코드 조회
async function getDriverLicenceTypeList() {
  const param = {
    cmnCdId: 'M90'
  };
  await licenseStore.setDriverLicenceTypeList(param);
}

const select = (typeName: string) => {
  licenseStore.checkedLcnsKndNm = typeName;
  emit('close');
};

const close = () => {
  emit('close');
};

onMounted(() => {
  getDriverLicenceTypeList();
});

watch(
  () => props.isShow,
  () => (driverType.value = props.isShow)
);
</script>
