<script setup lang="ts">
import { ref, watch, type PropType } from 'vue';
import { getRandomId } from '@/assets/script/randomString';
export type sizeType = 'xs' | 'sm' | 'md' | 'lg';
export type validType = 'id' | 'password' | 'email' | 'phoneNumber' | 'telNumber' | 'name';
export type inputType =
  | 'text'
  | 'number'
  | 'email'
  | 'password'
  | 'checkbox'
  | 'radio'
  | 'tel'
  | 'search'
  | 'file'
  | 'range'
  | 'hidden'
  | 'url'
  | 'submit'
  | 'reset';

export type inputModeType = 'numeric' | 'decimal' | 'none';
const props = defineProps({
  /**
   * Input Id
   */
  fixId: {
    type: [String],
    default: ''
  },
  /**
   * Input Value
   */
  modelValue: {
    type: [String, Number],
    default: ''
  },
  value: {
    type: String,
    default: ''
  },
  /**
   * Input Type
   */
  type: {
    type: String as PropType<inputType>,
    default: 'text'
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
   * Icon 유무
   */
  hasIc: {
    type: Boolean,
    default: false
  },
  /**
   * Valid command
   */
  command: {
    type: Boolean,
    default: false
  },
  /**
   * command Message
   */
  commandMessage: {
    type: String,
    default: '안내 문구 영역입니다.'
  },
  /**
   * Valid Error
   */
  error: {
    type: Boolean,
    default: false
  },
  /**
   * Error Message
   */
  errorMessage: {
    type: String,
    default: '필수 입력 항목입니다.'
  },
  /**
   * Inline 유무
   */
  inline: {
    type: Boolean,
    default: false
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
    type: Number
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
    default: 1000
  },
  /**
   * Input의 최대 글자 수 유무
   */
  hasMaxLength: {
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
   * 정규식 Input pattern
   */
  pattern: {
    type: String,
    default: ''
  },
  /**
   * size: 'sm' | 'md' | 'lg'
   */
  size: {
    type: String as PropType<sizeType>,
    default: 'md'
  },
  /**
   * Input Clear Button
   */
  btnClear: {
    type: Boolean,
    default: false
  },
  /**
   * validation: 'id' | 'password' | 'email' | 'phoneNumber' | 'telNumber'
   */
  validation: {
    type: String as PropType<validType>,
    default: ''
  },
  /**
   * inputmode
   */
  inputmode: {
    type: String as PropType<inputModeType>
  },
  ariaLabel: {
    type: String
  }
});
const emit = defineEmits([
  /**
   * v-model="modelValue"
   */
  'update:modelValue',
  /**
   * v-model:error="onError(boolean)"
   */
  'update:error',
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
  'valid',
  /**
   * v-on:focusin
   */
  'focusin'
]);
const randomString = getRandomId();
const isInput = ref<string | number | undefined>(props.modelValue);
const clear = ref(props.btnClear && isInput.value !== '');
const inputEl = ref<HTMLInputElement>();
const error = ref(props.error);

watch(props, () => {
  isInput.value = props.modelValue;
  error.value = props.error;
});

const onInput = (e: Event) => {
  /**
   * v-model 양방향 바인딩된 model은 한글의 경우 글자가 완성되야 model이 업데이트됨.
   한글의 경우 IME가 필요한 언어(입력된 문자가 계산되어서 글자를 만드는 언어).
   그래서 이벤트를 사용하여 model에 넣어줌
   */

  if (e) {
    isInput.value = (e.target as HTMLInputElement).value;
  }

  emit('update:modelValue', isInput.value);
  emit('input', isInput.value);

  props.validation !== undefined && validCheck(String(isInput.value));

  // maxLength
  props.maxLength !== undefined && maxLengthCheck(props.maxLength);
  // max
  props.max !== undefined && maxCheck(props.max);
  // clear
  props.btnClear && isInput.value !== '' ? (clear.value = true) : (clear.value = false);
};
const onChange = () => {
  emit('update:modelValue', isInput.value);
  emit('change', isInput.value);
  props.btnClear && isInput.value !== '' ? (clear.value = true) : (clear.value = false);
};
const onBlur = (e: Event) => {
  if (inputEl.value) inputEl.value?.blur();
  emit('update:modelValue', isInput.value);
  emit('blur', isInput.value);
  // valid
  props.validation !== undefined && validCheck(String(isInput.value));
  props.pattern !== undefined && patternCheck(e);
  // clear
  props.btnClear && isInput.value !== '' ? (clear.value = true) : (clear.value = false);
};
const onClear = () => {
  isInput.value = '';
  clear.value = false;
  inputEl.value?.blur();
  inputEl.value?.focus();
  emit('update:modelValue', isInput.value);
};
const onKeyup = (e: KeyboardEvent) => {
  emit('keyup', e);
  if (e.code.toLowerCase().includes('enter')) {
    onBlur(e as Event);
  }
};
const maxLengthCheck = (langth: number) => {
  inputEl.value !== undefined &&
    inputEl.value.value?.length > langth &&
    ((isInput.value = inputEl.value.value.slice(0, langth)),
    emit('update:modelValue', isInput.value),
    emit('input', isInput.value));
};
const maxCheck = (max: number) => {
  if (inputEl.value !== undefined && Number(inputEl.value.value ?? 0) > max) {
    isInput.value = inputEl.value.value.slice(0, max.toString().length);
    if (Number(isInput.value ?? 0) > max) {
      isInput.value = max;
    }
    emit('update:modelValue', isInput.value);
    emit('input', isInput.value);
  }
};
const focus = () => {
  inputEl.value && inputEl.value.focus();
};
const blur = () => {
  inputEl.value && inputEl.value.blur();
};
const validCheck = (value: string) => {
  // 아이디 체크 (영문 또는 영문+숫자 조합 여부)
  const checkUserId = (src: string) => {
    if (src !== undefined) {
      const reg = /^([a-z0-9_]){6,50}$/;
      if (src.match(reg)) {
        emit('valid', true);
        return true;
      }
    }
    emit('valid', false);
    return (error.value = true); // false
  };
  // 비밀번호 정규식 (특수문자/문자/숫자 포함 형태의 8~15자리 이내의 암호 정규식)
  const checkPassword = (value: string) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
    if (regex.test(value) === true) {
      emit('valid', true);
      return true;
    }
    emit('valid', false);
    return (error.value = true);
  };
  // 이메일주소 체크 정규식
  const checkEmail = (value: string) => {
    // 필수가 아닐 때 빈값은 체크하지 않음
    if (!props.required && value === '') {
      emit('valid', true);
      return true;
    }
    // const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+\.[a-zA-Z]{2,3}+$/;
    // const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z]{2,})+$/;
    const regex = /[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]/;

    if (regex.test(value) === true) {
      emit('valid', true);
      return true;
    }
    emit('valid', false);
    return (error.value = true); // false
    // return regex.test(value)
  };
  // 휴대전화 번호 체크 정규식
  const checkPhoneNumber = (value: string) => {
    // 필수가 아닐 때 빈값은 체크하지 않음
    if (!props.required && (value === '' || value === undefined)) {
      emit('valid', true);
      return true;
    }
    const regex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    if (regex.test(value) === true) {
      emit('valid', true);
      return true;
    }
    emit('valid', false);

    return (error.value = true); // false
  };
  // 일반전화 번호 체크 정규식
  const checkTelNumber = (value: string) => {
    const regex = /^0([0-9]{1,2})-?([0-9]{3,4})-?([0-9]{4})$/;
    if (regex.test(value) === true) {
      emit('valid', true);
      return true;
    }
    emit('valid', false);
    return (error.value = true); // false
  };
  // 이름 체크 정규식
  const checkName = (value: string) => {
    // 필수가 아닐 때 빈값은 체크하지 않음
    if (!props.required && (value === '' || value === undefined)) {
      emit('valid', true);
      return true;
    }

    const regex = /^[ㄱ-ㅎ가-힣a-zA-Z]+$/;
    const valid = regex.test(value);
    emit('valid', valid);
    return valid;
  };
  switch (props.validation) {
    case 'id':
      checkUserId(value);
      break;
    case 'password':
      checkPassword(value);
      // constStrNumPassword(value)
      break;
    case 'email':
      checkEmail(value);
      break;
    case 'phoneNumber':
      checkPhoneNumber(value);
      break;
    case 'telNumber':
      checkTelNumber(value);
      break;
    case 'name':
      checkName(value);
      break;
    default:
      break;
  }
};
const patternCheck = (e: Event) => {
  const pattern = new RegExp(`${props.pattern}`);
  const target = e.target as HTMLInputElement;
  props.pattern !== undefined &&
    (!pattern.test(target.value) && target.value !== '' ? emit('update:error', true) : emit('update:error', false));
};
defineExpose({
  focus,
  onInput,
  onChange,
  onBlur,
  onClear,
  blur
});
</script>
<template>
  <div class="form_input">
    <label
      :for="`${fixId !== '' ? fixId : randomString + 'Input'}`"
      class="form_label"
      :aria-hidden="props.hideLabel"
      :class="{ sr_only: props.hideLabel }"
      :aria-label="props.label"
    >
      {{ props.label }}
    </label>
    <div
      class="form_group"
      :class="{ is_error: props.error, is_clear: clear, disabled: props.disabled, readonly: props.readonly }"
    >
      <template v-if="$props.hasIc">
        <slot name="ic_name" />
      </template>
      <input
        :id="`${fixId !== '' ? fixId : randomString + 'Input'}`"
        ref="inputEl"
        v-model="isInput"
        :type="props.type"
        class="form_control"
        :class="[`size_${props.size}`]"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :aria-label="props.ariaLabel"
        :aria-describedby="props.error ? `${randomString}Input-error` : ''"
        :aria-invalid="error"
        :min="props.min"
        :max="props.max"
        :minlength="props.minLength"
        :maxlength="props.maxLength"
        :autocomplete="props.autocomplete ? 'on' : 'off'"
        :autofocus="props.autofocus"
        :required="props.required"
        :pattern="props.pattern"
        :inputmode="props.inputmode"
        @input="onInput"
        @change="onChange"
        @keydown="$emit('keydown', $event)"
        @keyup="onKeyup"
        @keypress="$emit('keypress', $event)"
        @focus="$emit('focus', $event)"
        @blur="onBlur"
        @focusin="$emit('focusin', $event)"
      />
      <template v-if="btnClear">
        <button
          v-show="clear"
          type="button"
          class="btn btn_clear"
          :class="{ is_show: clear }"
          aria-label="지우기"
          @mousedown="onClear"
          @touchstart="onClear"
        />
      </template>
    </div>
    <div
      v-if="command"
      :id="`${fixId !== '' ? fixId : randomString + 'Input'}_command`"
      class="form_valid"
      :class="{ is_show: command || props.command }"
      aria-live="assertive"
    >
      {{ props.commandMessage }}
    </div>
    <div
      v-if="error"
      :id="`${fixId !== '' ? fixId : randomString + 'Input'}_command`"
      class="form_valid error"
      :class="{ is_show: error || props.error }"
      aria-live="assertive"
    >
      {{ props.errorMessage }}
    </div>
  </div>
</template>
