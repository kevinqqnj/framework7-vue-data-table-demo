// Import Vue
import Vue from 'vue'

// Import F7 (with all components)
import Framework7 from 'framework7/dist/framework7.esm.bundle.js';
import Framework7Vue from 'framework7-vue/dist/framework7-vue.esm.bundle.js';

// Import App Custom Styles
import AppStyles from './assets/css/app.css'
// Import App Component
import app from './app.vue'

// Import Routes
import routes from './routes.js'
// Import VUEX store. Vuex already imported in store.js
import store from './store'
// https://github.com/euvl/v-clipboard
import Clipboard from 'v-clipboard'
import axios from 'axios'

// Init F7 Vue Plugin
Vue.use(Framework7Vue, Framework7)
Vue.use(Clipboard)
Vue.prototype.$axios = axios
//axios.defaults.baseURL = 'https://api.example.com'

let theme = 'md';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}

// Init Vue App
export default new Vue({
  // Root Element
  el: '#app',
  render: c => c('app'),
  components: { app },
  framework7: {
    root: '#app',
    id: 'io.framework7.testapp',
    theme: theme, // md or ios
    // view: {
    // pushState: true  // pushState only for browser. in my routes.js "/" will not work, homepage link is http://localhost:8080/#!/index/
    // },
    notification: {
    title: 'OB管理系统',
    closeTimeout: 3000,
  },
    routes: routes,
  },
  store,

});
