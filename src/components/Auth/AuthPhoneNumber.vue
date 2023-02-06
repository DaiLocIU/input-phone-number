<template>
  <TextInput
    ref="textInput"
    :value="'123'"
    inputMode="tel"
    :label="'input phone number'"
    v-on="eventTextInput"
  >
  </TextInput>
</template>

<script lang="ts">
import TextInput from '@/components/TextInput.vue';
import {
  BLUR_EVEMT, CHANGE_EVENT, FOCUS_EVENT, INPUT_EVENT, KEYPRESS_EVENT,
} from '@/constant';
import {
  defineComponent, onMounted, shallowRef, computed,
} from 'vue';

export default defineComponent({
  name: 'AuthPhoneNumber',
  components: {
    TextInput,
  },
  setup() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const textInput = shallowRef<any>(null);
    onMounted(() => {
      if (textInput.value) {
        textInput.value.focus();
      }
    });
    const handleKeyPress = (event: KeyboardEvent) => {
      console.log('eventttttt', event);
    };
    const handleFocus = (event: FocusEvent) => {
      console.log('focussssss event', event);
    };
    const handleBlur = (event: FocusEvent) => {
      console.log('handleeeeee blur', event);
    };
    const handleChange = (event: Event) => {
      console.log('handleChangeeeeee', event);
    };
    const handleInput = (event: Event) => {
      console.log('handleInput', event);
    };
    const eventTextInput = computed(() => ({
      [KEYPRESS_EVENT]: handleKeyPress,
      [FOCUS_EVENT]: handleFocus,
      [BLUR_EVEMT]: handleBlur,
      [CHANGE_EVENT]: handleChange,
      [INPUT_EVENT]: handleInput,
    }));

    return {
      textInput,
      eventTextInput,
      handleChange,
    };
  },
});
</script>

<style scoped>

</style>
