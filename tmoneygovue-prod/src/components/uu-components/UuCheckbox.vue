<script setup lang="ts">
import { computed, ref } from 'vue';
import { getRandomId } from '@/assets/script/randomString';
import { santizedHtml } from '@/utils';

const props = defineProps({
  /**
   * v-model: Boolean or Value
   */
  modelValue: {
    type: [Boolean, String, Number, Array as () => Array<string | number | boolean>],
    default: false
  },
  /**
   * Checkbox String Value
   */
  value: {
    type: [String, Number],
    default: ''
  },
  fValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: 'Label',
    required: false
  },
  name: {
    type: String,
    default: 'Name'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * Hidden Label
   */
  hideLabel: {
    type: Boolean,
    default: false
  },
  /**
   * inline Style
   */
  inline: {
    type: Boolean,
    default: false
  },
  /**
   * Checkbox Style
   */
  checkline: {
    type: Boolean,
    default: false
  },
  /**
   * Checkbox Style
   */
  toggleSwitch: {
    type: Boolean,
    default: false
  },
  /**
   * Checkbox Style
   */
  checkBtn: {
    type: Boolean,
    default: false
  },
  /**
   * Checkbox Style
   */
  rightBtn: {
    type: Boolean,
    default: false
  },
  /**
   * Label Style
   */
  isHtmlLabel: {
    type: Boolean,
    default: false
  },
  ariaLabel: {
    type: String,
    default: '',
    required: false
  },
  ariaLabelHidden: {
    type: Boolean,
    default: false,
    required: false
  }
});
const emit = defineEmits([
  /**
   * Update v-model
   */
  'update:modelValue',
  /**
   * Change Event
   * @return modelValue
   */
  'change'
]);
const randomString = getRandomId();
const trueValue = ref(true);
const falseValue = ref(false);

const isChecked = computed({
  get() {
    return props.modelValue instanceof Array
      ? props.modelValue.includes(props.value)
      : typeof props.modelValue === 'string' || typeof props.modelValue === 'number'
        ? props.modelValue === props.value
        : props.modelValue === trueValue.value;
  },
  set(newValue) {
    return newValue;
  }
});

const updateInput = (e: Event) => {
  const isChecked = (e.target as HTMLInputElement).checked;
  const newValue = ref();
  props.modelValue instanceof Array
    ? ((newValue.value = [...props.modelValue]),
      isChecked ? newValue.value.push(props.value) : newValue.value.splice(newValue.value.indexOf(props.value), 1),
      emit('update:modelValue', newValue.value),
      emit('change', isChecked))
    : typeof props.modelValue === 'string' || typeof props.modelValue === 'number'
      ? (emit('update:modelValue', isChecked ? props.value : props.fValue), emit('change', isChecked))
      : (emit('update:modelValue', isChecked ? trueValue.value : falseValue.value), emit('change', isChecked));
};

defineExpose({ updateInput });
</script>

<template>
  <div
    class="form_checkbox"
    :class="{ form_inline: props.inline, form_check_btn: checkBtn, right_checkbox: rightBtn }"
  >
    <input
      type="checkbox"
      :id="`${randomString}chk`"
      class="form_checkbox_input"
      :class="{ checkline: checkline, toggle_switch: toggleSwitch }"
      :value="props.value"
      :name="props.name"
      :disabled="disabled"
      :aria-checked="isChecked"
      v-model="isChecked"
       :aria-labelledby="`${randomString}chk-label`"
      @change="($event) => updateInput($event)"
    />
    <label
      :aria-hidden="true"
      :for="`${randomString}chk`"
      class="form_checkbox_label"
      :class="{ checkline: checkline, toggle_switch: toggleSwitch }"
      :id="`${randomString}chk-label`"
    >
      <template v-if="isHtmlLabel">
        <div v-html="santizedHtml(props.label)"></div>
      </template>
      <template v-else>
        <slot>{{ props.label }}</slot>
      </template>
    </label>
  </div>
</template>

<style></style>
