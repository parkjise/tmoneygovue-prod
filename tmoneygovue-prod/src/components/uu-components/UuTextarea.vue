<script setup lang="ts">
import { ref, watch } from 'vue';
import { getRandomId } from '@/assets/script/randomString';

const props = defineProps({
  /**
   * Input Value
   */
  modelValue: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    default: ''
  },
  /**
   * Input Label
   */
  label: {
    type: String,
    default: 'Label',
    require: true
  },
  /**
   * Hidden Label
   */
  hideLabel: {
    type: Boolean,
    default: false
  },
  /**
   * Input Disabled
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * Input Readonly
   */
  readonly: {
    type: Boolean,
    default: false
  },
  /**
   * Input Placeholder
   */
  placeholder: {
    type: String,
    default: '텍스트를 입력해주세요.',
    require: true
  },
  /**
   * Input number type 에서의 min 값
   */
  min: {
    type: Number,
    default: 0
  },
  /**
   * Input number type 에서의 max 값
   */
  max: {
    type: Number,
    default: 10000
  },
  /**
   * Input의 최소 글자 수
   */
  minLength: {
    type: Number,
    default: 1
  },
  /**
   * Input의 최대 글자 수
   */
  maxLength: {
    type: Number,
    default: 10000
  },
  /**
   * Input의 최소 글자 수 유무
   */
  hasMinLength: {
    type: Boolean,
    default: false
  },
  /**
   * Input의 자동완성 유무
   */
  autocomplete: {
    type: Boolean,
    default: false
  },
  /**
   * Input Focus
   */
  autofocus: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },

  /**
   * Input Clear Button
   */
  btnClear: {
    type: Boolean,
    default: false
  },
  /**
   * Button의 유무
   */
  hasBtn: {
    type: Boolean,
    default: false
  },
  /**
   * countDown의 유무
   */
  countDown: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits([
  /**
   * v-model="modelValue"
   */
  'update:modelValue',
  /**
   * v-on:input="onInput(value)"
   */
  'input',
  /**
   * v-on:change="onChange(value)"
   */
  'change',
  /**
   * v-on:keyup="onKeyup($event)"
   */
  'keyup',
  /**
   * v-on:keydown="onKeyup($event)"
   */
  'keydown',
  /**
   *v-on:keypress="onKeydown($event)"
   */
  'keypress',
  /**
   * v-on:focus="onFocus($event)"
   */
  'focus',
  /**
   * v-on:blur="onBlur(value)"
   */
  'blur',
  /**
   * v-on:valid="onValid(boolean)"
   */
  'valid'
]);

const randomString = getRandomId();
const isInput = ref<string>(props.modelValue);
const clear = ref(false);
const inputEl = ref<HTMLInputElement>();

watch(props, () => {
  isInput.value = props.modelValue;
});

const onInput = () => {
  emit('update:modelValue', isInput.value);
  emit('input', isInput.value);

  // maxLength
  props.maxLength !== undefined && maxLengthCheck(props.maxLength);

  // clear
  props.btnClear && isInput.value !== '' ? (clear.value = true) : (clear.value = false);
};
const onChange = () => {
  emit('update:modelValue', isInput.value);
  emit('change', isInput.value);
};
const onBlur = () => {
  emit('update:modelValue', isInput.value);
  emit('blur', isInput.value);

  // clear
  clear.value = false;
};
const onClear = () => {
  isInput.value = '';
  clear.value = false;
  inputEl.value?.focus();
  emit('update:modelValue', isInput.value);
};
const maxLengthCheck = (langth: number) => {
  inputEl.value !== undefined &&
    inputEl.value.value?.length > langth &&
    ((isInput.value = inputEl.value.value.slice(0, langth)),
    emit('update:modelValue', isInput.value),
    emit('input', isInput.value));
};
const focus = () => {
  inputEl.value && inputEl.value.focus();
};

defineExpose({
  focus,
  onInput,
  onChange,
  onBlur,
  onClear
});
</script>
<template>
  <div class="form_textarea">
    <label :for="`${randomString}textarea`" class="form_label" :class="{ sr_only: props.hideLabel }">
      {{ props.label }}
    </label>
    <div class="form_group">
      <textarea
        :id="`${randomString}textarea`"
        ref="inputEl"
        v-model="isInput"
        class="form_control"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :min="props.min"
        :max="props.max"
        :minlength="props.minLength"
        :maxlength="props.maxLength"
        :autocomplete="props.autocomplete ? 'on' : 'off'"
        :autofocus="props.autofocus"
        :required="props.required"
        @input="onInput"
        @change="onChange"
        @keydown="$emit('keydown', $event)"
        @keyup="$emit('keyup', $event)"
        @keypress="$emit('keypress', $event)"
        @keyup.enter="onBlur"
        @focus="$emit('focus', $event)"
        @blur="onBlur"
      />
    </div>
    <div v-if="hasMinLength && isInput.length < minLength" class="form_length">
      ({{ isInput.length }}/최소{{ minLength }}자)
    </div>
  </div>
</template>
