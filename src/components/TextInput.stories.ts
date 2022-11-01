// @ts-ignore
import TextInput, { TextInputProps } from '@/components/TextInput.vue';

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
