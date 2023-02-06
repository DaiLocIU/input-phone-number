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
      @focus="(handleFocus)"
      @blur="(handleBlur)"
      @keydown="(handleKeydown)"
      @keypress="(handleKeyPress)"
      @mouseleave="(handleMouseLeave)"
      @mouseenter="(handleMouseEnter)"
      @paste="(handlePaste)"
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
  useFocusedAndHovering,
} from '@/hooks';
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

    const focus = () => __ref.value?.focus();
    const blur = () => __ref.value?.blur();

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

    const {
      // focused,
      // hovering,
      handleFocus,
      handleBlur,
      handleMouseLeave,
      handleMouseEnter,
      handleKeydown,
      handleKeyPress,
      handlePaste,
    } = useFocusedAndHovering({
      emitFocus: (event: FocusEvent) => emit('focus', event),
      emitBlur: (event: FocusEvent) => emit('blur', event),
      emitMouseLeave: (event: MouseEvent) => emit('mouseleave', event),
      emitMouseEnter: (event: MouseEvent) => emit('mouseenter', event),
      emitKeydown: (event: KeyboardEvent) => emit('keydown', event),
      emitKeyPress: (event: KeyboardEvent) => emit('keypress', event),
      emitPaste: (event: ClipboardEvent) => emit('paste', event),
    });

    return {
      refInput,
      labelText,
      fullClassName,
      focus,
      blur,
      handleInput,
      handleChange,
      handleCompositionStart,
      handleCompositionUpdate,
      handleCompositionEnd,
      handleFocus,
      handleBlur,
      handleMouseLeave,
      handleMouseEnter,
      handleKeydown,
      handleKeyPress,
      handlePaste,
    };
  },
});
</script>

<style scoped>

</style>
