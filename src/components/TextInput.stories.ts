// @ts-ignore
import TextInput from '@/components/TextInput.vue';
import EventSystem from '@/types/EventSystem';
import { InputModeEnum } from '@/types/interface';

interface TextInputProps {
  id?: string,
  className?: string,
  value?: string,
  label?: string,
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
export default {
  title: 'UIComponent/TextInput',
  component: TextInput,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
};

const Template = (args: TextInputProps) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TextInput },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<text-input v-bind="args" />',
});

export const Normal = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
// @ts-ignore
Normal.args = {
  label: 'Primary',
  value: '',
};
