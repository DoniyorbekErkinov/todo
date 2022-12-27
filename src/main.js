import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
//icons
import "mdi-icons/css/materialdesignicons.min.css";
//notification
import Notifications from '@kyvg/vue3-notification'

const app = createApp(App)
app.use(Notifications)
app.mount('#app')