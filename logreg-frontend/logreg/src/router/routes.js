import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import List from '../views/List.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Items from '../views/Items.vue'
import store from '../store'

Vue.use(VueAxios, axios)
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/list',
    name: 'list',
    component: List
  },
  {
    path: '/list/:listid/items',
    name: 'items',
    component: Items
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

router.beforeEach((to, from, next) => {
  if (['register', "home", 'login'].includes(to.name)) {
    next()
  }
  else {
    if(store.state.accessToken !== null) {
      //store.commit('setAuthHeader');
      next()
    }
    else next({ name: 'login' })
  }
})
/*
router.beforeEach((to, from, next) => {
  if (['register', "home", 'login'].includes(to.name)) {
    if ((store.state.accessToken == null) && !['items', 'list'].includes(to.name)) {
      next()
    }
    else next({ name: 'home' })
  }
  else if (['items', 'list'].includes(to.name) && store.state.accessToken !== null) {
    next()
  }
  else next({ name: 'home' })
})*/