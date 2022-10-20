<template>
  <TextInput
    ref="textInput"
    :id="'input-phone-number'"
    :value="'123'"
    inputMode="tel"
    :label="'input phone number'"
  >
  </TextInput>
</template>

<script lang="ts">
import TextInput from '@/components/TextInput.vue';
import { defineComponent } from 'vue';
import useFocusTextInput from '@/hooks/useFocusTextInput';

export default defineComponent({
  name: 'AuthPhoneNumber',
  components: {
    TextInput,
  },
  setup() {
    const textInput = useFocusTextInput();
    return {
      textInput,
    };
  },
});
</script>

<style scoped>

</style>
