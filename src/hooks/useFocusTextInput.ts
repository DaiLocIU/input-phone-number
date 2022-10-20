import { ref, onMounted } from 'vue';
import TextInput from '@/components/TextInput.vue';
import { IS_TOUCH_ENV } from '@/util/eviroment';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useFocusTextInput() {
  const textInput = ref<InstanceType<typeof TextInput> | null>(null);
  // TODO: useFocusTextInput;
  onMounted(() => {
    if (!IS_TOUCH_ENV) {
      const textInputValue = textInput?.value;
      const refInput: HTMLInputElement | null = textInputValue && textInputValue.refInput;
      if (refInput) {
        refInput.focus();
      }
    }
  });

  return textInput;
}
