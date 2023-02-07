<template>
  <div :class="fullClassName">
    <input
      :id="id"
      ref="refInput"
      :autoComplete="autoComplete"
      :disabled="disabled"
      :inputMode="inputMode"
      :maxLength="maxLength"
      v-on="eventInput"
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
import {
  UPDATE_MODEL_EVENT,
  INPUT_EVENT,
  CHANGE_EVENT,
  FOCUS_EVENT,
  BLUR_EVEMT,
  KEYPRESS_EVENT,
  PASTE_EVENT,
  KEYDOWN_EVENT,
  MOUSEENTER_EVENT,
  MOUSELEAVE_EVENT,
  COMPOSITIONSTART_EVENT,
  COMPOSITIONUPDATE_EVENT,
  COMPOSITIONEND_EVENT,
} from '@/constant';

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
      emitCompositionStart: (event: CompositionEvent) => emit(COMPOSITIONSTART_EVENT, event),
      emitCompositionUpdate: (event: CompositionEvent) => emit(COMPOSITIONUPDATE_EVENT, event),
      emitCompositionEnd: (event: CompositionEvent) => emit(COMPOSITIONEND_EVENT, event),
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
      emitFocus: (event: FocusEvent) => emit(FOCUS_EVENT, event),
      emitBlur: (event: FocusEvent) => emit(BLUR_EVEMT, event),
      emitMouseLeave: (event: MouseEvent) => emit(MOUSELEAVE_EVENT, event),
      emitMouseEnter: (event: MouseEvent) => emit(MOUSEENTER_EVENT, event),
      emitKeydown: (event: KeyboardEvent) => emit(KEYDOWN_EVENT, event),
      emitKeyPress: (event: KeyboardEvent) => emit(KEYPRESS_EVENT, event),
      emitPaste: (event: ClipboardEvent) => emit(PASTE_EVENT, event),
    });

    const eventInput = computed(() => ({
      change: handleChange,
      input: handleInput,
      compositionstart: handleCompositionStart,
      compositionupdate: handleCompositionUpdate,
      compositionend: handleCompositionEnd,
      focus: handleFocus,
      blur: handleBlur,
      keydown: handleKeydown,
      keypress: handleKeyPress,
      mouseleave: handleMouseLeave,
      mouseenter: handleMouseEnter,
      paste: handlePaste,
    }));

    return {
      refInput,
      labelText,
      fullClassName,
      focus,
      blur,
      eventInput,
    };
  },
});
</script>

<style scoped>

</style>
