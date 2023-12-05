import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Maska from 'maska'
import './assets/tailwind.css'

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import moment from 'moment'

library.add(fas)

const app = createApp(App);

/**
* @params {date} date to be converted to timeago
* @returns returns timeAgo
*/
app.config.globalProperties.$filters = {
  timeAgo(date) {
    return moment(date).fromNow()
  },
  formatDate(date) {
    return moment(date).format('MMM Do YY')
  }
}
  app
    .use(router)
    .use(store)
    .component('fa', FontAwesomeIcon)
    .use(Maska)
    .mount('#app')
