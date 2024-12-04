<template>
  <common-modal
    v-model="showBottomSheet"
    type="bottom"
    hideCloseBtn
    hide-footer
    @ok="okCallback"
    @close="emit('close')"
  >
    <template #modal_header> 이용약관동의가 필요합니다. </template>
    <template #modal_body>
      <form>
        <div class="modal_regitration toss_terms_popup">
          <div class="detail_agree">
            <div class="flex-between">
              <uu-checkbox
                :label="`개인정보 수집 및 이용동의 <span>(필수)</span>`"
                v-model="isAgreed"
                @change="!isAgreed"
                :isHtmlLabel="true"
              />
              <uu-button label="개인정보 수집 및 이용동의" @click="goHistoryPage">
                <uu-ic size="24" name="navi_right" />
              </uu-button>
            </div>
          </div>
          <div class="btn_area">
            <uu-button
              label="동의"
              btn-color="primary"
              @click="okCallback"
              :disabled="!isAgreed"
              size="xl"
            ></uu-button>
          </div>
        </div>
      </form>
    </template>
  </common-modal>
</template>
<script setup lang="ts">
import CommonModal from '@/views/common/components/CommonModal.vue'
import { ref, watch } from 'vue'
import uuIc from '@/components/uu-components/UuIc.vue'
import UuButton from '@/components/uu-components/UuButton.vue'
import UuCheckbox from '@/components/uu-components/UuCheckbox.vue'
import { getAppBridge } from '@/utils'

const emit = defineEmits(['accept', 'close'])

const showBottomSheet = ref(false)
const isAgreed = ref(false)

const props = defineProps({
  isShowBottomSheet: { type: Boolean, default: false }
})


const okCallback = () => {
  emit('accept')
}

// 약관 상세 이동시
const url = `${import.meta.env.VITE_TMONEY_URL}/webview/mbrs/stpl/v2/20241128000000001062.do`
const goHistoryPage = async () => {
  const appBridge = await getAppBridge()
  await appBridge.openView({
      url: url,
      viewType: 'in',
      headerTitle: '개인정보 수집 및 이용동의'
    })
}

watch(
  () => props.isShowBottomSheet,
  () => {
    showBottomSheet.value = props.isShowBottomSheet
  }
)
</script>

<style scoped>
.flex-between {
  margin-bottom: 2rem;
}
.modal_body .toss_terms_popup .form_checkbox {
  margin-bottom: 0;
}
.btn_area {
  padding: 0rem 2rem 2rem 2rem;
}
.modal_body .toss_terms_popup .form_checkbox + .btn {
  margin-bottom: 0;
  height: auto;
}
</style>
