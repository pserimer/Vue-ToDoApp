import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

const store = new Vuex.Store({
    state: {
        accessToken: null
    },
    mutations :{
        setToken(state,token){
            state.accessToken = token;
            axios.defaults.headers.Authorization  = token;
        },
        setAuthHeader(state){
            if(state.accessToken){
                axios.defaults.headers.Authorization = state.accessToken;
            }
        },
        logout(state){
            state.accessToken = null;
            axios.defaults.headers.Authorization = null;
        }
    },
    plugins: [vuexLocal.plugin]
});

export default store