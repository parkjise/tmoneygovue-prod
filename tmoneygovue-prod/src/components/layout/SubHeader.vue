<script setup lang="ts">
import uuIc from '@/components/uu-components/UuIc.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
// export type icsType = 'setting' | 'close'

const props = defineProps({
  /**
   * Header Title <br>
   * default h2 tag
   */
  title: {
    type: String,
    default: '서브 페이지',
    required: true
  },
  /**
   * Hidden Title
   */
  hideTitle: {
    type: Boolean,
    default: false
  },
  /**
   * Hidden Back Button
   */
  hideBack: {
    type: Boolean,
    default: false
  },
  /**
   * Hidden ic Buttons
   */
  hideics: {
    type: Boolean,
    default: false
  },
  /**
   * type icsType = 'profile' | 'setting'
   */
  // ics: {
  //   type: Array<icsType>,
  //   default: () => []
  // },
  bgColor: {
    type: String,
    default: ''
  },
  rightContent: {
    type: Boolean,
    default: false
  },
  whiteBack: {
    type: Boolean,
    default: false
  },
  clickCallback: {
    type: Function,
    required: false
  },
  isBackIcon: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits([
  /**
   * props.ics Button Event
   * @param icName
   */
  'click',
  /**
   * window.scrollY > 10 <br>
   * Scrolling Event
   */
  'scroll'
]);
const isScroll = ref(false);

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

const handleScroll = () => {
  window.scrollY > 10 ? (isScroll.value = true) : (isScroll.value = false);
  emit('scroll', isScroll.value);
};

const clickEvent = () => {
  // 운송중개 인트로에서 뒤로가기 시 네이티브 브릿지 호출이 필요하므로 콜백함수 추가
  if (props.clickCallback) {
    props.clickCallback();
    return;
  }
  router.back();
};

defineExpose({
  handleScroll
});
</script>
<template>
  <header class="header sub_header" :class="{ is_scroll: isScroll }" :style="{ backgroundColor: props.bgColor }">
    <div class="header_inner">
      <div v-if="!props.hideBack" class="header_left">
        <button type="button" aria-label="뒤로 가기" @click="clickEvent">
          <!-- <template v-if="whiteBack">
            <uu-ic name="back" size="24" color="white" />
          </template>
          <template v-else>
            <uu-ic name="back" size="24" />
          </template> -->
          <uu-ic v-if="isBackIcon" name="float_prev" size="40" />
          <uu-ic v-else-if="whiteBack" name="back" size="24" color="white" />
          <uu-ic v-else name="back" size="24" />
        </button>
      </div>
      <div class="header_center" :class="{ is_hide: hideTitle }">
        <slot name="header_center">
          <h2 class="header_title" :class="{ sr_only: hideTitle }" role="presentation">
            {{ props.title }}
          </h2>
        </slot>
      </div>
      <div v-if="rightContent" class="header_right">
        <slot name="header_right" />
        <!-- <slot name="header_right">
          <template
            v-for="(item, i) in props.ics"
            :key="i"
          >
            <uu-button
              btn-style="none"
              class="btn-ic"
              aria-label="페이지 이동"
              @click="emit('click', item)"
            >
              <uu-ic
                :name="item"
                size="24"
              />
            </uu-button>
          </template>
        </slot> -->
      </div>
    </div>
  </header>
</template>
<style scoped lang="scss"></style>
