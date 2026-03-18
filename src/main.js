import './assets/scss/app.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// bootstrap CSS already imported via scss; bring in JS for interactive components (carousel, collapse, etc.)
import 'bootstrap/dist/js/bootstrap.bundle'

import PrimaryButton from '@/components/Common/PrimaryButton.vue'
import SecondaryButton from '@/components/Common/SecondaryButton.vue'
import SucccessButton from '@/components/Common/SuccessButton.vue'
import WarningButton from '@/components/Common/WarningButton.vue'
import DarkButton from '@/components/Common/DarkButton.vue'
import LightButton from '@/components/Common/LightButton.vue'
import DangerButton from '@/components/Common/DangerButton.vue'
import LinkButton from '@/components/Common/LinkButton.vue'
import InfoButton from '@/components/Common/InfoButton.vue'

const app = createApp(App)

/***************************************************
 * Global components Registration
 ***************************************************
 *
 * Example:
 * app.component('primary-button', PrimaryButton)
 *
 */
app.component('primary-button', PrimaryButton)
app.component('secondary-button', SecondaryButton)
app.component('success-button', SucccessButton)
app.component('warning-button', WarningButton)
app.component('dark-button', DarkButton)
app.component('light-button', LightButton)
app.component('danger-button', DangerButton)
app.component('link-button', LinkButton)
app.component('info-button', InfoButton)

app.use(router)

app.mount('#app')
