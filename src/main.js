import './assets/scss/app.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// bootstrap CSS already imported via scss; bring in JS for interactive components (carousel, collapse, etc.)
import 'bootstrap/dist/js/bootstrap.bundle'

const app = createApp(App)

app.use(router)

app.mount('#app')
