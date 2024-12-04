<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { getRandomId } from '@/assets/script/randomString';

const { min, max, step, minValue, maxValue } = defineProps({
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 1000
  },
  step: {
    type: Number,
    default: 1
  },
  minValue: {
    type: Number,
    default: 50
  },
  maxValue: {
    type: Number,
    default: 80
  },
  label: {
    type: String,
    default: 'Label',
    require: true
  },
  hideLabel: {
    type: Boolean,
    default: false
  },
  hideResult: {
    type: Boolean,
    defualt: false
  },
  unit: {
    type: String,
    default: 'inch'
  }
});

const emit = defineEmits(['update:minValue', 'update:maxValue']);

const randomString = getRandomId();
const slider = ref<HTMLElement | null>(null);
const inputMin = ref<HTMLInputElement | null>(null);
const inputMax = ref<HTMLInputElement | null>(null);
const sliderMinValue = ref<number>(minValue);
const sliderMaxValue = ref<number>(maxValue);

// 백분율 구하는 함수
const getPercent = (value: number, min: number, max: number) => {
  return ((value - min) / (max - min)) * 100;
};

const setCSSProps = (left: number, right: number) => {
  if (!slider.value) return;
  slider.value.style.setProperty('--progressLeft', `${left}%`);
  slider.value.style.setProperty('--progressRight', `${right}%`);
};

watchEffect(() => {
  if (slider.value) {
    emit('update:minValue', sliderMinValue.value);
    emit('update:maxValue', sliderMaxValue.value);

    const leftPercent = getPercent(sliderMinValue.value, min, max);
    const rightPercent = 100 - getPercent(sliderMaxValue.value, min, max);

    setCSSProps(leftPercent, rightPercent);
  }
});

// SlideMinValue < SlideMaxValue
const onInput = ({ target }) => {
  if (target.name === 'min') {
    target.value > sliderMaxValue.value
      ? (target.value = sliderMaxValue.value)
      : (sliderMinValue.value = parseFloat(target.value));
  }

  if (target.name === 'max') {
    target.value < sliderMinValue.value
      ? (target.value = sliderMinValue.value)
      : (sliderMaxValue.value = parseFloat(target.value));
  }
};
</script>
<template>
  <div>
    <div ref="slider" class="form_range_wrap">
      <div class="form_result">
        <label :for="`${randomString}InputMin`" class="form_label" :class="{ sr_only: hideLabel }">
          {{ label }}
        </label>
        <div v-if="!hideResult" class="result">{{ sliderMinValue }}{{ unit }} ~ {{ sliderMaxValue }}{{ unit }}</div>
      </div>
      <div class="form_range">
        <div class="form_indicator" />
        <input
          :id="`${randomString}InputMin`"
          ref="inputMin"
          type="range"
          name="min"
          :min="min"
          :max="max"
          :value="minValue"
          :step="step"
          :aria-valuemin="min"
          :aria-valuemax="sliderMinValue"
          :aria-valuenow="minValue"
          aria-labelledby="minLabel"
          @input="onInput"
        />
        <input
          :id="`${randomString}InputMax`"
          ref="inputMax"
          type="range"
          name="max"
          :min="min"
          :max="max"
          :value="maxValue"
          :step="step"
          :aria-valuemin="max"
          :aria-valuemax="sliderMaxValue"
          :aria-valuenow="maxValue"
          aria-labelledby="maxLabel"
          @input="onInput"
        />
      </div>
    </div>
  </div>
</template>
