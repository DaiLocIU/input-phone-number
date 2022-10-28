import TextInput from './TextInput.vue';

export default {
  title: 'UIComponent/Button',
  component: TextInput,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TextInput },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<my-button v-bind="args" />',
});
