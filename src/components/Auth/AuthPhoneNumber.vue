<template>
  <TextInput
    ref="textInput"
    :value="'123'"
    inputMode="tel"
    :label="'input phone number'"
  >
  </TextInput>
</template>

<script lang="ts">
import TextInput from '@/components/TextInput.vue';
import { defineComponent, onMounted, shallowRef } from 'vue';

export default defineComponent({
  name: 'AuthPhoneNumber',
  components: {
    TextInput,
  },
  setup() {
    const textInput = shallowRef<any>(null);
    onMounted(() => {
      // eslint-disable-next-line no-underscore-dangle
      if (textInput.value) {
        textInput.value.focus();
      }
    });
    return {
      textInput,
    };
  },
});
</script>

<style scoped>

</style>
