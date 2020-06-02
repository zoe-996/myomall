import Vue from 'vue';
import App from './App.vue';
import router from './router.js';
import store from './store.js';
import './assets/js/rem';
import './assets/style/base.scss';
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import axios from 'axios';

Vue.prototype.$axios = axios;
Vue.use(Mint);

const baseurl = 'http://cuyqtc.natappfree.cc/';
const baseurl2 = 'http://cuyqtc.natappfree.cc/';
Vue.prototype.$baseurl = baseurl;
Vue.prototype.$baseurl2 = baseurl2;

const eventbus = new Vue();
Vue.prototype.$eventbus = eventbus;

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
