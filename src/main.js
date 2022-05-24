import 'vuetify/styles'
import { createApp } from 'vue'
import vuetify from './plugins/vuetify'
import { router } from './router/router'
import { createPinia } from 'pinia'
import App from './App'
import NoData from './components/no-data/no-data'

const app = createApp(App)
const pinia = createPinia()
const plugins = [vuetify, router, pinia]
app.component('NoData', NoData)
plugins.forEach(plugin => app.use(plugin))
app.mount('#app')
