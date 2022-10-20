import { createApp } from 'vue';
import App from './App.vue';
import switchTheme from './util/switchTheme';

switchTheme('dark');
createApp(App).mount('#app');
