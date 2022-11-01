<template>
  <div :class="fullClassName">
    <input
      :id="id"
      ref="refInput"
      :autoComplete="autoComplete"
      :disabled="disabled"
      :inputMode="inputMode"
      :maxLength="maxLength"
      :onBlur="onBlur"
      :onChange="onChange"
      :onInput="onInput"
      :onKeyDown="onKeyDown"
      :onKeyPress="onKeyPress"
      :onPaste="onPaste"
      :placeholder="placeholder"
      :readOnly="readOnly"
      :value="value"
      class="form-control"
      type="text"
    />

    <label v-if="labelText" :for="id">{{ labelText }}</label>

  </div>
</template>
<script setup lang="ts">

import { onMounted, ref, defineProps } from 'vue';
// eslint-disable-next-line import/named
import { InputModeEnum } from '@/types/interface';
import buildClassName from '@/util/buildClassName';
import EventSystem from '@/types/EventSystem';

export interface TextInputProps {
  id?: string,
  className?: string,
  value: string,
  label: string,
  error?: string,
  success?: string,
  disabled?: boolean,
  readOnly?: boolean,
  placeholder?: string,
  autoComplete?: string,
  maxLength?: number,
  inputMode?: InputModeEnum,
  onChange?: (e: EventSystem.ChangeEvent<HTMLInputElement>) => void,
  onInput?: (e: EventSystem.FormEvent<HTMLInputElement>) => void,
  onKeyPress?: (e: EventSystem.KeyboardEvent<HTMLInputElement>) => void,
  onKeyDown?: (e: EventSystem.KeyboardEvent<HTMLInputElement>) => void,
  onBlur?: (e: EventSystem.FocusEvent<HTMLInputElement>) => void,
  onPaste?: (e: EventSystem.ClipboardEvent<HTMLInputElement>) => void,
}
// eslint-disable-next-line no-shadow
const props = defineProps<TextInputProps>();
const labelText = ref(props.error || props.success || props.label);
const refInput = ref<HTMLInputElement | null>(null);
const fullClassName = buildClassName(
  'input-group',
  props.value && 'touched',
  props.error ? 'error' : props.success && 'success',
  props.disabled && 'disabled',
  props.readOnly && 'disabled',
  labelText.value && 'with-label',
  props.className,
);

onMounted(() => {
  try {
    // if (this.refInput) {
    //   this.refInput.focus();
    // }
    console.log('this.labelText', labelText);
  } catch (e) {
    console.log('e', e);
  }
});

</script>

<style scoped>

</style>
