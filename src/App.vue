<template>
 <auth-phone-number></auth-phone-number>
</template>

<script lang="ts">
import '@/styles/index.scss';
import { Options, Vue } from 'vue-class-component';
import AuthPhoneNumber from '@/components/Auth/AuthPhoneNumber.vue';

@Options({
  components: {
    AuthPhoneNumber,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
