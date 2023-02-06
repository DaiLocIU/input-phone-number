// @ts-nocheck
import { isFunction } from '@vue/shared';
import { ref } from 'vue';
// eslint-disable-next-line import/prefer-default-export
export function useInput(
  handleInput: (event: InputEvent) => void,
  cb: Record<string, unknown>,
): Record<string, unknown> {
  const isComposing = ref(false);

  const handleCompositionStart = (event: CompositionEvent) => {
    cb.emitCompositionStart(event);
    isComposing.value = true;
  };
  const handleCompositionUpdate = (event: CompositionEvent) => {
    cb.emitCompositionUpdate(event);
    isComposing.value = true;
  };
  const handleCompositionEnd = (event: CompositionEvent) => {
    cb.emitCompositionEnd(event);
    if (isComposing.value) {
      isComposing.value = false;
      if (isFunction(handleInput)) {
        handleInput(event);
      }
    }
  };

  return {
    handleCompositionStart,
    handleCompositionUpdate,
    handleCompositionEnd,
  };
}
