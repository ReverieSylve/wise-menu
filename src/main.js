import 'vuetify/styles'
// import './reset.scss';
import {createApp} from 'vue'
import vuetify from './plugins/vuetify'
import {router} from './router/router'
import App from './App'
import NoData from './components/no-data/no-data'

const app = createApp(App)
const plugins = [vuetify, router]
app.component('no-data', NoData)
plugins.forEach(plugin => app.use(plugin))
app.mount('#app')
