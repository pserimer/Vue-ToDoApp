import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router/routes.js'
import store from './store.js'

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router,
  created (){
    store.commit('setAuthHeader');
  },
  render: h => h(App)
}).$mount('#app')
