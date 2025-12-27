import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';  

AOS.init({
  duration: 800,
  once: true,
});
const pinia = createPinia();
createApp(App).use(router).use(pinia).mount('#app');
