<template>
  <div :class="fullClassName">
    <input
      :id="id"
      ref="refInput"
      :autoComplete="autoComplete"
      :disabled="disabled"
      :inputMode="inputMode"
      :maxLength="maxLength"
      @change="handleChange"
      @input="handleInput"
      @compositionstart="(handleCompositionStart)"
      @compositionupdate="(handleCompositionUpdate)"
      @compositionend="(handleCompositionEnd)"
      :placeholder="placeholder"
      :readOnly="readOnly"
      :value="value"
      class="form-control"
      type="text"
      v-bind="$attrs"
    />

    <label v-if="labelText" :for="id">{{ labelText }}</label>

  </div>
</template>
<script lang="ts">

import {
  ref, defineComponent, computed, shallowRef,
} from 'vue';
import {
  useInput,
} from '@/hooks/useInput';
import buildClassName from '@/util/buildClassName';
import { UPDATE_MODEL_EVENT, INPUT_EVENT, CHANGE_EVENT } from '@/constant';

export default defineComponent({
  name: 'TextInput',
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
  },
  setup(props, { emit }) {
    const labelText = ref(props.error || props.success || props.label);

    const fullClassName = buildClassName(
      'input-group',
      props.value && 'touched',
      props.error ? 'error' : props.success && 'success',
      props.disabled && 'disabled',
      props.readOnly && 'disabled',
      labelText.value && 'with-label',
      props.className,
    );

    const refInput = shallowRef<HTMLInputElement>();
    // eslint-disable-next-line no-underscore-dangle
    const __ref = computed(() => refInput.value);
    const focus = async () => {
      // see: https://github.com/ElemeFE/element/issues/18573
      // eslint-disable-next-line no-unused-expressions
      __ref.value?.focus();
    };

    const handleInput = async (event: Event) => {
      const { value } = event.target as HTMLInputElement;
      emit(UPDATE_MODEL_EVENT, value);
      emit(INPUT_EVENT, value);
    };

    const handleChange = (event: Event) => {
      emit(CHANGE_EVENT, (event.target as HTMLInputElement).value);
    };

    // docs https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionstart_event
    const {
      handleCompositionStart,
      handleCompositionUpdate,
      handleCompositionEnd,
    } = useInput((e) => handleInput(e), {
      emitCompositionStart: (event: CompositionEvent) => emit('compositionstart', event),
      emitCompositionUpdate: (event: CompositionEvent) => emit('compositionupdate', event),
      emitCompositionEnd: (event: CompositionEvent) => emit('compositionend', event),
    });

    return {
      refInput,
      labelText,
      fullClassName,
      focus,
      handleInput,
      handleChange,
      handleCompositionStart,
      handleCompositionUpdate,
      handleCompositionEnd,
    };
  },
});
</script>

<style scoped>

</style>
