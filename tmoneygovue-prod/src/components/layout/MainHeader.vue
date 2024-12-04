<script setup lang="ts">
import { ref, onMounted } from 'vue';
import uuButton from '@/components/uu-components/UuButton.vue';
import UuIc from '@/components/uu-components/UuIc.vue';

const props = defineProps({
  /**
   * member name
   */
  mbrNm: {
    type: String,
    default: '티머니'
  },
  hideIcon: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits([
  /**
   * Logo Click Event
   */
  'onClickMoveMbrInfo',
  'onClickMoveAppSetting',
  /**
   * window.scrollY > 10 <br>
   * Scrolling Event
   */
  'scroll'
]);
const isScroll = ref(false);
const headerMember = ref(null);

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  // 컴포넌트가 마운트된 후에 포커스 설정
  if (headerMember.value) {
    headerMember.value.focus(); // 포커스 주기
  }
});

const handleScroll = () => {
  window.scrollY > 10 ? (isScroll.value = true) : (isScroll.value = false);
  emit('scroll', isScroll.value);
};

defineExpose({
  handleScroll,
  headerMember
});
</script>
<template>
  <header class="header main_header" :class="{ is_scroll: isScroll }" role="presentation"  ref="headerMember">
    <div class="header_left">
      <uu-button
        btn-style="none"
        :aria-label="`${props.mbrNm} 회원정보 페이지로 이동`"
        class="header_member"
        @click="$emit('onClickMoveMbrInfo', $event)"
      >
        <h1>{{ props.mbrNm }}</h1>
        <template v-if="!hideIcon">
          <uu-ic size="24" name="navi_right" />
        </template>
      </uu-button>
    </div>
    <div class="header_right">
      <slot name="header_right">
        <uu-button btn-style="none" aria-label="설정" @click="$emit('onClickMoveAppSetting', $event)">
          <uu-ic name="setting" size="24" />
        </uu-button>
      </slot>
    </div>
  </header>
</template>
<style scoped lang="scss"></style>
