// @ts-nocheck
import { ref } from 'vue';
// eslint-disable-next-line import/prefer-default-export
export function useFocusedAndHovering(
  cb: Record<string, unknown>,
): Record<string, unknown> {
  const focused = ref(false);
  const hovering = ref(false);

  const handleFocus = (event: FocusEvent) => {
    focused.value = true;
    cb.emitFocus(event);
  };
  const handleBlur = (event: FocusEvent) => {
    focused.value = false;
    cb.emitBlur(event);
  };
  const handleMouseLeave = (event: MouseEvent) => {
    hovering.value = false;
    cb.emitMouseLeave(event);
  };
  const handleMouseEnter = (event: MouseEvent) => {
    hovering.value = true;
    cb.emitMouseEnter(event);
  };
  const handleKeydown = (event: KeyboardEvent) => {
    cb.emitKeydown(event);
  };
  const handleKeyPress = (event: KeyboardEvent) => {
    cb.emitKeyPress(event);
  };
  const handlePaste = (event: ClipboardEvent) => {
    cb.handlePaste(event);
  };

  return {
    focused,
    hovering,
    handleFocus,
    handleBlur,
    handleMouseLeave,
    handleMouseEnter,
    handleKeydown,
    handleKeyPress,
    handlePaste,
  };
}
