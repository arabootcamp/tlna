import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueSweetalert2 from 'vue-sweetalert2';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
import { priceFormat, firstUpperCase } from './funtions/filters';

Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.use(VueSweetalert2);
// Make BootstrapVue available throughout your project
Vue.filter('filterPriceFormat', priceFormat);
Vue.filter('filterFirstUpperCase', firstUpperCase);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
