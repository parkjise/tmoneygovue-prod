<script setup lang="ts">
import { ref, reactive, type PropType, onMounted } from 'vue'
import { Swiper } from 'swiper/vue'
import { type Swiper as SwiperType, type SwiperOptions } from 'swiper/types'
import {
  Navigation,
  Pagination,
  A11y,
  Autoplay,
  Scrollbar,
  Thumbs,
  Virtual,
  Zoom,
  FreeMode
} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/a11y'
import 'swiper/css/autoplay'
import { getAppBridge } from '@/utils'
// https://swiperjs.com/

export type swiperType = SwiperType
type swiperPropType = 'default' | 'navigation' | 'pagination' | 'paginationFraction' | 'custom'
const props = defineProps({
  /**
   * type= 'default' | 'navigation' | 'pagination' | 'custom'
   */
  type: {
    type: String as PropType<swiperPropType>,
    default: 'default'
  },
  /**
   * Swiperjs Docs 참고
   */
  options: {
    type: Object as PropType<SwiperOptions>,
    default: () => {}
  },
  numPagination: {
    type: Boolean,
    default: false
  },
  naviPagination: {
    type: Boolean,
    default: false
  },
  initialIndex: {
    type: Number
  },
  optionClass: {
    type: String,
    default: ''
  }
})
const emit = defineEmits([
  /**
   * Swiper on init event
   * @param swiper
   */
  'swiper',
  /**
   * Swiper slide change event
   * @param swiper
   */
  'slide-change',
  'slide-change-transition-end'
])

const navigation: SwiperOptions = reactive({
  navigation: true,
  a11y: {
    enabled: true,
    prevSlideMessage: 'Previous slide',
    nextSlideMessage: 'Next slide'
  }
})

const pagination: SwiperOptions = reactive({
  pagination: {
    clickable: false
  },
  a11y: {
    enabled: true,
    prevSlideMessage: 'Previous slide',
    nextSlideMessage: 'Next slide'
  }
})

const paginationFraction: SwiperOptions = reactive({
  pagination: {
    type: 'fraction',
    renderFraction: function (currentClass, totalClass) {
      return (
        '<span class="' +
        currentClass +
        '"></span>' +
        '<span class="swiper_pagination_separator">/</span>' +
        '<span class="' +
        totalClass +
        '"></span>'
      )
    }
  },
  a11y: {
    enabled: true,
    prevSlideMessage: 'Previous slide',
    nextSlideMessage: 'Next slide'
  }
})
const swiperOptions = ref()
props.type === 'navigation' ? (swiperOptions.value = navigation) : null
props.type === 'pagination' ? (swiperOptions.value = pagination) : null
props.type === 'paginationFraction' ? (swiperOptions.value = paginationFraction) : null
props.type === 'custom' ? (swiperOptions.value = props.options) : null

const modules =
  props.type === 'custom'
    ? [Navigation, Pagination, A11y, Autoplay, Scrollbar, Thumbs, Virtual, Zoom, FreeMode]
    : [Navigation, Pagination, A11y, Autoplay]

const accessState = ref(false)

onMounted(() => {
  accessibilityMode()
})

const accessibilityMode = async () => {
  const appBridge = await getAppBridge()
  try {
    let accessibility = await appBridge.getAccessibility()
    if (accessibility?.state) {
      accessState.value = accessibility?.state
      pauseAutoplay()
    }
  } catch (e) {
    accessState.value = false
    console.log(e)
  }
}

const swiperInstance = ref<swiperType | null>(null)

const onSwiper = (swiper: SwiperType) => {
  emit('swiper', swiper)
}
const onChange = (swiper: SwiperType) => {
  if (accessState.value && swiper.autoplay.running) {
    // 알림을 자동으로 활성화하도록 설정
    var notification = document.createElement('div')
    notification.className = 'swiper-notification'
    notification.setAttribute('aria-live', 'assertive')
    notification.textContent = `슬라이드 ${swiper.realIndex + 1}번으로 변경되었습니다.`
    document.body.appendChild(notification)

    // 알림을 3초 후에 삭제
    setTimeout(() => {
      notification.remove()
    }, 3000)
  }

  updateInertAttribute(swiper)

  emit('slide-change', swiper)
}

const onSlideChangeTransitionEnd = (swiper: SwiperType) => {
  const activeSlide = swiper.slides[swiper.activeIndex]
  const focusedElement = document.activeElement as HTMLElement

  const excludedClasses = [
    '.modal_header',
    '.swiper-button-pause',
    '.swiper-button-resume',
    '.swiper-button-prev',
    '.swiper-button-next'
  ]

  if (excludedClasses.some((className) => focusedElement.closest(className))) {
    return // 포커스 변경 없음
  }

  const firstFocusableElement = activeSlide.querySelector(
    'button, [href], input, [tabindex]:not([tabindex="-1"])'
  ) as HTMLElement

  if (firstFocusableElement && !swiper.autoplay.running) {
    firstFocusableElement?.focus() // 활성 슬라이드에 포커스 주기
  }

  emit('slide-change-transition-end', swiper)
}

const pauseAutoplay = () => {
  swiperInstance.value?.autoplay.stop()
  swiperInstance.value?.el.querySelector('.swiper-wrapper')?.setAttribute('aria-live', 'polite')
  autoplayRunning.value = false
}

const resumeAutoplay = () => {
  swiperInstance.value?.autoplay.start()
  if (accessState.value && swiperInstance.value?.autoplay.running) {
    swiperInstance.value.params.autoplay = {
      delay: 5000
    }
  }

  swiperInstance.value?.el.querySelector('.swiper-wrapper')?.setAttribute('aria-live', 'off')
  autoplayRunning.value = true
}

const onSwiperInit = (swiper: swiperType) => {
  swiperInstance.value = swiper
  autoplayRunning.value = swiper.autoplay.running

  onSwiper(swiper)
  if (props.initialIndex !== undefined) {
    swiper.slideTo(props.initialIndex, 0)
  }
}

const updateInertAttribute = (swiper: SwiperType) => {
  swiper.slides.forEach((slide, index) => {
    if (index === swiper.activeIndex) {
      slide.removeAttribute('inert')
    } else {
      slide.setAttribute('inert', '')
    }
  })
}

const autoplayRunning = ref(false)

const resetToSlide = () => {
  if (swiperInstance.value) {
    swiperInstance.value.slideTo(0, 500)
  }
}

defineExpose({
  onSwiper,
  onChange,
  pauseAutoplay,
  resumeAutoplay,
  resetToSlide,
  onSlideChangeTransitionEnd
})
</script>

<template>
  <div
    class="swiper_wrap"
    :class="[
      { swiper_nav: props.type === 'navigation' },
      { swiper_page: props.type === 'pagination' },
      { swiper_page_frac: props.type === 'paginationFraction' },
      { swiper_custom: props.type === 'custom' }
    ]"
  >
    <div v-if="props.type === 'custom' && naviPagination" class="navi_pagination_wrap" :class="props.optionClass">
      <div
        v-if="autoplayRunning"
        aria-label="슬라이드 정지"
        class="swiper-button-pause"
        tabIndex="0"
        @click="pauseAutoplay"
      />
      <div
        v-if="!autoplayRunning"
        aria-label="슬라이드 재생"
        class="swiper-button-resume"
        tabIndex="0"
        @click="resumeAutoplay"
      />
      <div class="swiper-button-prev" />
      <div class="swiper-pagination" />
      <div class="swiper-button-next" />
    </div>
    <swiper
      v-bind="swiperOptions"
      :modules="modules"
      @swiper="onSwiperInit"
      @slide-change="onChange"
      @slide-change-transition-end="onSlideChangeTransitionEnd"
    >
      <slot />
    </swiper>
  </div>
</template>

<style>
.swiper-pagination-current {
  color: red;
}

.event_slide .navi_pagination_wrap {
  bottom: 8.7rem;
  z-index: 2;
}
</style>
