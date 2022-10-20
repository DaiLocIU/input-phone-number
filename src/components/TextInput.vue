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

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import EventSystem from '@/types/EventSystem';
import buildClassName from '@/util/buildClassName';

export default defineComponent({
  props: {
    id: String,
    className: String,
    value: String,
    label: String,
    error: String,
    success: String,
    disabled: Boolean,
    readOnly: Boolean,
    placeholder: String,
    autoComplete: String,
    maxLength: Number,
    inputMode: {
      type: String,
      validator: (val:string) => ['text', 'none', 'tel', 'url', 'email', 'numeric', 'decimal', 'search'].includes(val),
    },
    onChange: Function as PropType<(e: EventSystem.ChangeEvent<HTMLInputElement>) => void>,
    onInput: Function as PropType<(e: EventSystem.FormEvent<HTMLInputElement>) => void>,
    onKeyPress: Function as PropType<(e: EventSystem.KeyboardEvent<HTMLInputElement>) => void>,
    onKeyDown: Function as PropType<(e: EventSystem.KeyboardEvent<HTMLInputElement>) => void>,
    onBlur: Function as PropType<(e: EventSystem.FocusEvent<HTMLInputElement>) => void>,
    onPaste: Function as PropType<(e: EventSystem.ClipboardEvent<HTMLInputElement>) => void>,
  },
  setup(props, b) {
    console.log('props', props);
    console.log('b', b);
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
    // expose to template and other options API hooks
    return {
      labelText,
      fullClassName,
      refInput,
    };
  },
  mounted() {
    try {
      // if (this.refInput) {
      //   this.refInput.focus();
      // }
      console.log('this.labelText', this.labelText);
    } catch (e) {
      console.log('e', e);
    }
  },
});
</script>
s
<style scoped>

</style>
